import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { User } from '../user/user.model'
import { studentSearchableFields } from './student.constant'
import { TStudent } from './student.interface'
import { Student } from './student.model'

const getAllStudentsService = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await studentQuery.modelQuery

  return result
}

const getSingleStudentService = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return result
}

const updateStudentService = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...rest } = payload

  const updatedData: Record<string, unknown> = {
    ...rest,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      updatedData[`guardian.${key}`] = value
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      updatedData[`localGuardian.${key}`] = value
    }
  }

  const result = await Student.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteSingleStudentService = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    await session.startTransaction()

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student!')
    }

    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
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
    throw new Error('Failed to delete student!')
  }
}

export const StudentServices = {
  getAllStudentsService,
  getSingleStudentService,
  updateStudentService,
  deleteSingleStudentService,
}
