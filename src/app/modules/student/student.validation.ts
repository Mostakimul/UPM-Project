import { z } from 'zod'
import { BloodGroup } from '../faculty/faculty.constant'

const UserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255).trim(),
  middleName: z.string().min(0).max(255).trim().optional(),
  lastName: z.string().min(1).max(255).trim(),
})

const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255).trim(),
  fatherOccupation: z.string().min(1).max(255).trim(),
  fatherContactNo: z.string().min(1).max(20).trim(),
  motherName: z.string().min(1).max(255).trim(),
  motherOccupation: z.string().min(1).max(255).trim(),
  motherContactNo: z.string().min(1).max(20).trim(),
})

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255).trim(),
  occupation: z.string().min(1).max(255).trim(),
  contactNo: z.string().min(1).max(20).trim(),
  address: z.string().min(1).max(255).trim(),
})

const StudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string(),
      email: z.string().email(),
      contactNo: z.string().min(1).max(20).trim(),
      emergencyContactNo: z.string().min(1).max(20).trim(),
      bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]),
      presentAddress: z.string().min(1).max(255).trim(),
      permanentAddress: z.string().min(1).max(255).trim(),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
})

const UpdateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(255).trim().optional(),
  middleName: z.string().min(0).max(255).trim().optional(),
  lastName: z.string().min(1).max(255).trim().optional(),
})

const UpdateGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255).trim().optional(),
  fatherOccupation: z.string().min(1).max(255).trim().optional(),
  fatherContactNo: z.string().min(1).max(20).trim().optional(),
  motherName: z.string().min(1).max(255).trim().optional(),
  motherOccupation: z.string().min(1).max(255).trim().optional(),
  motherContactNo: z.string().min(1).max(20).trim().optional(),
})

const UpdateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255).trim().optional(),
  occupation: z.string().min(1).max(255).trim().optional(),
  contactNo: z.string().min(1).max(20).trim().optional(),
  address: z.string().min(1).max(255).trim().optional(),
})

const UpdateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: UpdateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().min(1).max(20).trim().optional(),
      emergencyContactNo: z.string().min(1).max(20).trim().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().min(1).max(255).trim().optional(),
      permanentAddress: z.string().min(1).max(255).trim().optional(),
      guardian: UpdateGuardianValidationSchema.optional(),
      localGuardian: UpdateLocalGuardianValidationSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
})

export const StudentValidations = {
  StudentValidationSchema,
  UpdateStudentValidationSchema,
}
