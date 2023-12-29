import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { StudentController } from './student.controller'
import { StudentValidations } from './student.validation'

const router = express.Router()

router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  StudentController.getSingleStudent,
)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.student),
  validateRequest(StudentValidations.UpdateStudentValidationSchema),
  StudentController.updateStudent,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  StudentController.deleteSingleStudent,
)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  StudentController.getAllStudents,
)

export const StudentRoutes = router
