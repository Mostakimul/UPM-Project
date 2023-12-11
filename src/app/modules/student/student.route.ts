import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { StudentController } from './student.controller'
import { StudentValidations } from './student.validation'

const router = express.Router()

router.get('/:studentId', StudentController.getSingleStudent)

router.patch(
  '/:studentId',
  validateRequest(StudentValidations.UpdateStudentValidationSchema),
  StudentController.updateStudent,
)

router.delete('/:studentId', StudentController.deleteSingleStudent)

router.get('/', StudentController.getAllStudents)

export const StudentRoutes = router
