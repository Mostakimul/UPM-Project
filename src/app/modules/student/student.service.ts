import { Student } from './student.model'

const getAllStudentsService = async () => {
  const result = await Student.find()

  return result
}

const getAllSingleStudentService = async (id: string) => {
  const result = await Student.findOne({ id })

  return result
}
const deleteSingleStudentService = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })

  return result
}

export const StudentServices = {
  getAllStudentsService,
  getAllSingleStudentService,
  deleteSingleStudentService,
}
