/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.createacAdemicDepartmentService(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  })
})

const getAllAcademicDepartments = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsService()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic departments retrived successfully',
    data: result,
  })
})

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const { academicDepartmentId } = req.params
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentService(
      academicDepartmentId,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrived successfully',
    data: result,
  })
})

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const { academicDepartmentId } = req.params
  const updatedData = req.body

  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentService(
      academicDepartmentId,
      updatedData,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department updated successfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
