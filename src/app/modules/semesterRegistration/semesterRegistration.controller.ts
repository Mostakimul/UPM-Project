import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SemesterRegistrationServices } from './semesterRegistration.service'

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.createSemesterRegistrationService(
      req.body,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration is created succesfully',
    data: result,
  })
})

const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result =
    await SemesterRegistrationServices.getAllSemesterRegistrationsService(
      req.query,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Registration are retrieved successfully',
    data: result,
  })
})

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await SemesterRegistrationServices.getSingleSemesterRegistrationService(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration is retrieved succesfully',
    data: result,
  })
})

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await SemesterRegistrationServices.updateSemesterRegistrationService(
      id,
      req.body,
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SemesterRegistration is updated successfully',
    data: result,
  })
})

// const deleteSemesterRegistration = catchAsync(async (req, res) => {
//   const { id } = req.params
//   const result = await SemesterRegistrationServices.deleteSemesterRegistrationService(id)

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'SemesterRegistration is deleted succesfully',
//     data: result,
//   })
// })

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistrations,
  updateSemesterRegistration,
  // deleteSemesterRegistration,
}
