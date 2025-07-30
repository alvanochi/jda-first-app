import { compare } from "bcrypt";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function loginUser({ email, password }: { email: string; password: string }) {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string }
        const user: any = await loginUser({ email, password })
        if (user) {
          const passwordConfirm = await compare(password, user.password)
          if (passwordConfirm) {
            return user
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },

    async session({ session, token }: any) {
      if ("email" in token) {
        session.user.email = token.email
      }
      if ("name" in token) {
        session.user.name = token.name
      }
      if ("role" in token) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  }
}
