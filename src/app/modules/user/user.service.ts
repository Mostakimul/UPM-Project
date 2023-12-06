import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import { generateStudentID } from './user.utils'

const createStudentService = async (password: string, payload: TStudent) => {
  // set student role
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_passwrod as string)
  userData.role = 'student'

  // Academix semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  userData.id = await generateStudentID(admissionSemester)

  const newUser = await User.create(userData)

  // create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id
    payload.user = newUser._id

    const newStudent = await Student.create(payload)

    return newStudent
  }
}

export const UserServices = {
  createStudentService,
}
