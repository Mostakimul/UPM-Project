import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(
    AcademicDepartmentValidation.academicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
)

router.patch(
  '/:academicDepartmentId',
  validateRequest(
    AcademicDepartmentValidation.updateacAdemicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
)
router.get(
  '/:academicDepartmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
)
router.get('/', AcademicDepartmentController.getAllAcademicDepartments)

export const AcademicDepartmentRoutes = router
