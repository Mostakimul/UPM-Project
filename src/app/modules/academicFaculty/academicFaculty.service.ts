import QueryBuilder from '../../builder/QueryBuilder'
import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyService = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllAcademicFacultiesService = async (
  query: Record<string, unknown>,
) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await academicFacultyQuery.modelQuery
  const meta = await academicFacultyQuery.countTotal()
  return { meta, result }
}

const getSingleAcademicFacultyService = async (id: string) => {
  const result = await AcademicFaculty.findOne({ _id: id })

  return result
}

const updateAcademicFacultyService = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

export const AcademicFacultyServices = {
  createAcademicFacultyService,
  getAllAcademicFacultiesService,
  getSingleAcademicFacultyService,
  updateAcademicFacultyService,
}
