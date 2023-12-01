export type TUser = {
  id: string
  password: string
  needsPasswordChamge: boolean
  role: 'admin' | 'student' | 'faculty'
  status: 'in-peogress' | 'blocked'
  isDeleted: boolean
}
