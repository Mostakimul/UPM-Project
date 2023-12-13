import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { StudentController } from './student.controller'
import { StudentValidations } from './student.validation'

const router = express.Router()

router.get('/:id', StudentController.getSingleStudent)

router.patch(
  '/:id',
  validateRequest(StudentValidations.UpdateStudentValidationSchema),
  StudentController.updateStudent,
)

router.delete('/:id', StudentController.deleteSingleStudent)

router.get('/', StudentController.getAllStudents)

export const StudentRoutes = router
