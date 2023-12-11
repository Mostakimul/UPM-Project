import { Student } from './student.model'

const getAllStudentsService = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

  return result
}

const getAllSingleStudentService = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })

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
