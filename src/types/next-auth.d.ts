import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      user_id: number
      name?: string | null
      email?: string | null
      role?: string | null
    }
  }

  interface User {
    user_id: number
    role?: string | null
  }
}
