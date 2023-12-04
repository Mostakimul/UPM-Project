import { Schema, model } from 'mongoose'
import { Months, SemesterCode, Semesters } from './academicSemester.constant'
import { TAcademicSemester } from './academicSemester.interface'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: Semesters,
      required: true,
    },
    code: { type: String, enum: SemesterCode, required: true },
    year: { type: String, required: true },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
