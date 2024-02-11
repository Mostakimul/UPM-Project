import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../user/user.constant'
import { SemesterRegistrationControllers } from './semesterRegistration.controller'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
)

router.get(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
    USER_ROLE.superAdmin,
  ),
  SemesterRegistrationControllers.getSingleSemesterRegistration,
)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
)

// router.delete('/:id', SemesterRegistrationControllers.deleteSemesterRegistration)

router.get(
  '/',
  auth(
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
    USER_ROLE.superAdmin,
  ),
  SemesterRegistrationControllers.getAllSemesterRegistrations,
)

export const SemesterRegistrationRoutes = router
