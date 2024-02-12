import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EnrolledCourseServices } from './enrolledCourse.service'

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId
  const result = await EnrolledCourseServices.createEnrolledCourseService(
    userId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  })
})

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksService(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated succesfully',
    data: result,
  })
})

const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const userId = req.user.userId

  const result = await EnrolledCourseServices.getMyEnrolledCoursesService(
    userId,
    req.query,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses retrieved successfully!',
    meta: result.meta,
    data: result.result,
  })
})

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getMyEnrolledCourses,
}
