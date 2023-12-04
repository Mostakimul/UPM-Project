import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterController } from './academicSemester.controller'
import { AcademicSemesterValidations } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-academic-semster',
  validateRequest(AcademicSemesterValidations.academicSemesterValidation),
  AcademicSemesterController.createAcademicSemester,
)

router.get('/', AcademicSemesterController.getAllAcademicSemesters)

export const AcademicSemesterRoutes = router
