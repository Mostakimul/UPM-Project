import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentID } from './user.utils'

const createStudentService = async (password: string, payload: TStudent) => {
  // set student role
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_passwrod as string)
  userData.role = 'student'

  // Academix semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    userData.id = await generateStudentID(admissionSemester)

    // T-1
    const newUser = await User.create([userData], { session })

    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create new user!')
    }
    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    // T-2
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
  }
}

export const UserServices = {
  createStudentService,
}
