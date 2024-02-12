/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyService(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully',
    data: result,
  })
})

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesService(
    req.query,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic faculty retrived successfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyService(
      academicFacultyId,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty retrived successfully',
    data: result,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params
  const updatedData = req.body

  const result = await AcademicFacultyServices.updateAcademicFacultyService(
    academicFacultyId,
    updatedData,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty updated successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
}
