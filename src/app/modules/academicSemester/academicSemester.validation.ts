import { z } from 'zod'
import { Months, SemesterCode, Semesters } from './academicSemester.constant'

const academicSemesterValidation = z.object({
  body: z.object({
    name: z.enum([...Semesters] as [string, ...string[]]),
    code: z.enum([...SemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...Months] as [string, ...string[]]),
    endMonth: z.enum([...Months] as [string, ...string[]]),
  }),
})

export const AcademicSemesterValidations = {
  academicSemesterValidation,
}
