import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { RegistrationStatus } from './semesterRegistration.constant'
import { TSemesterRegistration } from './semesterRegistration.interface'
import { SemesterRegistration } from './semesterRegistration.model'

const createSemesterRegistrationService = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester

  // * Check if there any registered semster is already 'UPCOMING' / 'ONGOING'
  const isExistAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    })

  if (isExistAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isExistAnyUpcomingOrOngoingSemester.status} registered semester!`,
    )
  }

  // * check if semster is exist
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester)
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Semester does not exist!',
    )
  }

  // * semester registration exist
  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  })
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'Semester already exist!')
  }

  const result = await SemesterRegistration.create(payload)

  return result
}

const getAllSemesterRegistrationsService = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery

  return result
}

const getSingleSemesterRegistrationService = async (id: string) => {
  const result = await SemesterRegistration.findById(id)

  return result
}

const updateSemesterRegistrationService = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  // * requested semester existance
  const isSemesterExist = await SemesterRegistration.findById(id)
  if (!isSemesterExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This requested semester dose not exist!`,
    )
  }

  // * ENDED semester can not be performed
  const currentSemesterStatus = isSemesterExist.status
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is  already ${currentSemesterStatus}`,
    )
  }

  // * upcoming -> ongoing -> ended
  const requestedStatus = payload.status
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not updated from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }
  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not updated from ${currentSemesterStatus} to ${requestedStatus}`,
    )
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return result
}

// const deleteSemesterRegistrationService = async (id: string) => {}

export const SemesterRegistrationServices = {
  createSemesterRegistrationService,
  getAllSemesterRegistrationsService,
  getSingleSemesterRegistrationService,
  updateSemesterRegistrationService,
  // deleteSemesterRegistrationService,
}
