import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUser } from './user.interface'
import { User } from './user.model'

const createStudentService = async (
  password: string,
  studentData: TStudent,
) => {
  // set student role
  const userData: Partial<TUser> = {}

  userData.password = password || (config.default_passwrod as string)
  userData.role = 'student'
  userData.id = '12345'

  const newUser = await User.create(userData)

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id
    studentData.user = newUser._id

    const newStudent = await Student.create(studentData)

    return newStudent
  }
}

export const UserServices = {
  createStudentService,
}
