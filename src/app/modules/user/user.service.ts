/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { Admin } from '../admin/admin.model'
import { TFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentID,
} from './user.utils'

const createStudentService = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // set student role
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_password as string)
  userData.role = 'student'
  userData.email = payload.email

  // Academix semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found!')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    userData.id = await generateStudentID(admissionSemester)
    // Send Image to cloudinary
    const imageName = `${userData.id}${payload.name.firstName}`
    const imagePath = file?.path
    const { secure_url } = await sendImageToCloudinary(imageName, imagePath)

    const newUser = await User.create([userData], { session })

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user!')
    }
    payload.id = newUser[0].id
    payload.user = newUser[0]._id
    payload.profileImg = secure_url
    const newStudent = await Student.create([payload], { session })

    if (!newStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create new student!',
      )
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student!')
  }
}

const createFacultyService = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'faculty'
  userData.email = payload.email

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  )
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateFacultyId()

    const imageName = `${userData.id}${payload?.name?.firstName}`
    const path = file?.path
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path)

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createAdminService = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'admin'
  userData.email = payload.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()

    const imageName = `${userData.id}${payload?.name?.firstName}`
    const path = file?.path
    //send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path)

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getMeService = async (userId: string, role: string) => {
  let result = null
  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user')
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user')
  }

  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user')
  }

  return result
}

const changeStatusService = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const UserServices = {
  createStudentService,
  createAdminService,
  createFacultyService,
  getMeService,
  changeStatusService,
}
