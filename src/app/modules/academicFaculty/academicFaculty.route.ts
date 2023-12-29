import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { AcademicFacultyController } from './academicFaculty.controller'
import { AcademicFacultyValidation } from './academicFaculty.validation'

const router = express.Router()

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.admin),
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty,
)

router.patch(
  '/:academicFacultyId',
  auth(USER_ROLE.admin),
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
)
router.get(
  '/:academicFacultyId',
  AcademicFacultyController.getSingleAcademicFaculty,
)
router.get('/', AcademicFacultyController.getAllAcademicFaculties)

export const AcademicFacultyRoutes = router
