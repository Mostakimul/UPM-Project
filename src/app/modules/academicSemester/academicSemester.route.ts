import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicSemesterValidations } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-semster',
  auth(USER_ROLE.admin),
  validateRequest(AcademicSemesterValidations.academicSemesterValidation),
  AcademicSemesterController.createAcademicSemester,
)

router.patch(
  '/:semesterId',
  auth(USER_ROLE.admin),
  validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidation),
  AcademicSemesterController.updateAcademicSemester,
)
router.get('/:semesterId', AcademicSemesterController.getSingleStudent)
router.get('/', AcademicSemesterController.getAllAcademicSemesters)

export const AcademicSemesterRoutes = router
