import { Schema, model } from 'mongoose'
import { SemesterRegistrationStatus } from './semesterRegistration.constant'
import { TSemesterRegistration } from './semesterRegistration.interface'

const SemesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'AcademicSemester',
      required: true,
    },
    status: {
      type: String,
      enum: SemesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      required: true,
      default: 3,
    },
    maxCredit: {
      type: Number,
      required: true,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
)

export const SemesterRegistration = model<TSemesterRegistration>(
  'SemesterRegistration',
  SemesterRegistrationSchema,
)
