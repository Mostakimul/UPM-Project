import { TAcademicFaculty } from './academicFaculty.interface'
import { AcademicFaculty } from './academicFaculty.model'

const createAcademicFacultyService = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllAcademicFacultiesService = async () => {
  const result = await AcademicFaculty.find()

  return result
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
