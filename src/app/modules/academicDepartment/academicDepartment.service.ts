import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createacAdemicDepartmentService = async (
  payload: TAcademicDepartment,
) => {
  // const isDepartmentExist = await AcademicDepartment.findOne({
  //   name: payload.name,
  // })

  // if (isDepartmentExist) {
  //   throw new Error('This deprtment is already exist!')
  // }
  const result = await AcademicDepartment.create(payload)
  return result
}

const getAllAcademicDepartmentsService = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')

  return result
}

const getSingleAcademicDepartmentService = async (id: string) => {
  const result = await AcademicDepartment.findOne({ _id: id }).populate(
    'academicFaculty',
  )

  return result
}

const updateAcademicDepartmentService = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )

  return result
}

export const AcademicDepartmentServices = {
  createacAdemicDepartmentService,
  getAllAcademicDepartmentsService,
  getSingleAcademicDepartmentService,
  updateAcademicDepartmentService,
}
