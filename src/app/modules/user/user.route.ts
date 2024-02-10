import express, { NextFunction, Request, Response } from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { upload } from '../../utils/sendImageToCloudinary'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { createFacultyValidationSchema } from '../faculty/faculty.validation'
import { StudentValidations } from '../student/student.validation'
import { USER_ROLE } from './user.constant'
import { UserController } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()

router.post(
  '/create-student',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
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
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(createAdminValidationSchema),
  UserController.createAdmin,
)

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserController.getMe,
)

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserController.changeStatus,
)

export const UserRoutes = router
