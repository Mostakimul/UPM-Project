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

// Check if semester is already exist in the same year
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExist = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  })

  if (isSemesterExist) {
    throw new Error('Semester is already exisr!')
  }
  next()
})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
