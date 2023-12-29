import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { FacultyControllers } from './faculty.controller'
import { updateFacultyValidationSchema } from './faculty.validation'

const router = express.Router()

router.get('/:id', FacultyControllers.getSingleFaculty)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
)

router.delete('/:id', auth(USER_ROLE.admin), FacultyControllers.deleteFaculty)

router.get('/', FacultyControllers.getAllFaculties)

export const FacultyRoutes = router
