import QueryBuilder from '../../builder/QueryBuilder'
import { TAcademicDepartment } from './academicDepartment.interface'
import { AcademicDepartment } from './academicDepartment.model'

const createacAdemicDepartmentService = async (
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.create(payload)
  return result
}

const getAllAcademicDepartmentsService = async (
  query: Record<string, unknown>,
) => {
  const academicDepartmentQuery = new QueryBuilder(
    AcademicDepartment.find().populate('academicFaculty'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await academicDepartmentQuery.modelQuery
  const meta = await academicDepartmentQuery.countTotal()
  return { meta, result }
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
