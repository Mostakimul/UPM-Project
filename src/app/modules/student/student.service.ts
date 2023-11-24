import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentService = async (studentData: TStudent) => {
  // static method
  // const result = await StudentModel.create(student);

  // instance method
  const student = new Student(studentData)
  if (await student.isUserExist(studentData.id)) {
    throw new Error('User already exist!')
  }
  const result = await student.save()

  return result
}

const getAllStudentsService = async () => {
  const result = await Student.find()

  return result
}

const getAllSingleStudentService = async (id: string) => {
  const result = await Student.findOne({ id })

  return result
}

export const StudentServices = {
  createStudentService,
  getAllStudentsService,
  getAllSingleStudentService,
}
