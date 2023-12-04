import { academicSemesterCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterService = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code!')
  }

  const result = await AcademicSemester.create(payload)

  return result
}

const getAllAcademicSemestersService = async () => {
  const result = await AcademicSemester.find()

  return result
}

const getSingleAcademicSemesterService = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id })

  return result
}

const updateAcademicSemesterService = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })

  return result
}

export const AcademicSemesterServices = {
  createAcademicSemesterService,
  getAllAcademicSemestersService,
  getSingleAcademicSemesterService,
  updateAcademicSemesterService,
}
