import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { academicSemesterCodeMapper } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'
import { AcademicSemester } from './academicSemester.model'

const createAcademicSemesterService = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid semester code!')
  }

  const result = await AcademicSemester.create(payload)

  return result
}

const getAllAcademicSemestersService = async (
  query: Record<string, unknown>,
) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await academicSemesterQuery.modelQuery
  const meta = await academicSemesterQuery.countTotal()
  return { meta, result }
}

const getSingleAcademicSemesterService = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id })

  return result
}

const updateAcademicSemesterService = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code')
  }

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
