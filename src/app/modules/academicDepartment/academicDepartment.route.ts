import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { AcademicDepartmentController } from './academicDepartment.controller'
import { AcademicDepartmentValidation } from './academicDepartment.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(
    AcademicDepartmentValidation.academicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
)

router.patch(
  '/:academicDepartmentId',
  auth(USER_ROLE.admin),
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
