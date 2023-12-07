import { z } from 'zod'

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Academic department required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Academic faculty is required',
    }),
  }),
})
const updateacAdemicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Academic department required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Academic faculty is required',
      })
      .optional(),
  }),
})

export const AcademicDepartmentValidation = {
  academicDepartmentValidationSchema,
  updateacAdemicDepartmentValidationSchema,
}
