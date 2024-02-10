import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicSemesterValidations } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(AcademicSemesterValidations.academicSemesterValidation),
  AcademicSemesterController.createAcademicSemester,
)

router.patch(
  '/:semesterId',
  auth(USER_ROLE.admin),
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidation),
  AcademicSemesterController.updateAcademicSemester,
)

router.get(
  '/:semesterId',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  AcademicSemesterController.getSingleStudent,
)

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
    USER_ROLE.superAdmin,
  ),
  AcademicSemesterController.getAllAcademicSemesters,
)

export const AcademicSemesterRoutes = router
