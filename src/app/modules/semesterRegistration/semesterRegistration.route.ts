import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { SemesterRegistrationControllers } from './semesterRegistration.controller'
import { SemesterRegistrationValidations } from './semesterRegistration.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.createSemesterRegistration,
)

router.get(
  '/:id',
  SemesterRegistrationControllers.getSingleSemesterRegistration,
)

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationControllers.updateSemesterRegistration,
)

// router.delete('/:id', SemesterRegistrationControllers.deleteSemesterRegistration)

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations)

export const SemesterRegistrationRoutes = router
