import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { StudentValidations } from '../student/student.validation'
import { USER_ROLE } from './user.constant'
import { UserController } from './user.controller'

const router = express.Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(StudentValidations.StudentValidationSchema),
  UserController.createStudent,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
)

router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
)

export const UserRoutes = router
