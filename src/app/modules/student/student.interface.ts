import { Model, Types } from 'mongoose'

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  name: TUserName
  email: string
  gender: 'male' | 'female' | 'other'
  dateOfBirth: Date
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian?: TLocalGuardian
  profileImg?: string
  admissionSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  academicFaculty: Types.ObjectId
  isDeleted: boolean
}

// for creating static
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExist(id: string): Promise<TStudent | null>
}

// for creating instance
// export type TStudentMethods = {
//   // eslint-disable-next-line no-unused-vars
//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type TStudentModel = Model<TStudent, Record<string, never>>
