export interface IUser {
  user_id: number
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
  level: number
  artCount: number
  point: number

  arts?: IArt[]
}
