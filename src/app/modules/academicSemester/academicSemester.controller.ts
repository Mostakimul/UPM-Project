/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterService(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  })
})

const getAllAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemestersService(
    req.query,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic semester retrived successfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleStudent = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterService(semesterId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester retrived successfully',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params
  const updatedData = req.body

  const result = await AcademicSemesterServices.updateAcademicSemesterService(
    semesterId,
    updatedData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester updated successfully',
    data: result,
  })
})

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleStudent,
  updateAcademicSemester,
}
