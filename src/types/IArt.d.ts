import { IUser } from "./IUser"

export interface IArt {
  art_id: number
  name: string
  image: string
  description?: string
  createdAt: Date
  
  user_id: number
  user?: IUser
}
