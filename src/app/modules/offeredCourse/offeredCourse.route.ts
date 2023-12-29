import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { OfferedCourseControllers } from './offeredCourse.controller'
import { OfferedCourseValidations } from './offeredCourse.validation'

const router = express.Router()

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  OfferedCourseControllers.getSingleOfferedCourses,
)

router.post(
  '/create-offered-course',
  auth(USER_ROLE.admin),
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
)

router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  OfferedCourseControllers.deleteOfferedCourse,
)
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  OfferedCourseControllers.getAllOfferedCourses,
)

export const offeredCourseRoutes = router
