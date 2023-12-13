/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { StudentServices } from './student.service'

const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsService(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrived successfully',
    data: result,
  })
})

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await StudentServices.getSingleStudentService(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrived successfully',
    data: result,
  })
})

const updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { student } = req.body
  const result = await StudentServices.updateStudentService(id, student)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: 'result',
  })
})

const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const result = await StudentServices.deleteSingleStudentService(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  })
})

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
}
