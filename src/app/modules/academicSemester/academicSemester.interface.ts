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

export type TAcademicSemesterCodeMapper = {
  [key: string]: string
}
