import { z } from 'zod'

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
  id: z.string().min(1).max(255),
  password: z.string(),
  name: UserNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string().min(1).max(20).trim(),
  emergencyContactNo: z.string().min(1).max(20).trim(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  presentAddress: z.string().min(1).max(255).trim(),
  permanentAddress: z.string().min(1).max(255).trim(),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'inactive']).default('active'),
})

export default StudentValidationSchema
