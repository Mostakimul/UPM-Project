import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { StudentValidations } from '../student/student.validation'
import { UserController } from './user.controller'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(StudentValidations.StudentValidationSchema),
  UserController.createStudent,
)

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserController.createFaculty,
)

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
)

export const UserRoutes = router
