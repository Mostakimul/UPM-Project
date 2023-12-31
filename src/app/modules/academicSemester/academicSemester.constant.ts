import {
  TAcademicSemesterCodeMapper,
  TMonths,
  TSemesterCode,
  TSemesterNames,
} from './academicSemester.interface'

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const SemesterCode: TSemesterCode[] = ['01', '02', '03', '04']

export const Semesters: TSemesterNames[] = [
  'Spring',
  'Summer',
  'Fall',
  'Winter',
]

export const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
  Spring: '01',
  Summer: '02',
  Fall: '03',
  Winter: '04',
}
