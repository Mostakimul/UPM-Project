import httpStatus from 'http-status'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { Student } from './student.model'

const getAllStudentsService = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return result
}

const getSingleStudentService = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return result
}

const deleteSingleStudentService = async (id: string) => {
  const isStudentExist = Student.isUserExist(id)
  if (!isStudentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!')
  }

  const session = await mongoose.startSession()
  try {
    await session.startTransaction()

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student!')
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user!')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
}

export const StudentServices = {
  getAllStudentsService,
  getSingleStudentService,
  deleteSingleStudentService,
}
