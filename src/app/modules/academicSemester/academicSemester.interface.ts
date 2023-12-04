export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type TSemesterNames = 'Spring' | 'Summer' | 'Fall' | 'Winter'

export type TSemesterCode = '01' | '02' | '03' | '04'

export type TAcademicSemester = {
  name: TSemesterNames
  code: TSemesterCode
  year: string
  startMonth: TMonths
  endMonth: TMonths
}

// // for creating static
// export interface StudentModel extends Model<TStudent> {
//   // eslint-disable-next-line no-unused-vars
//   isUserExist(id: string): Promise<TStudent | null>
// }

// for creating instance
// export type TStudentMethods = {
//   // eslint-disable-next-line no-unused-vars
//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type TStudentModel = Model<TStudent, Record<string, never>>
