import { getServerSession } from "next-auth"
import HeaderClient from "./HeaderClient"
import { authOptions } from "@/lib/authOptions"

export default async function HeaderServer() {
  const session = await getServerSession(authOptions)

  return <HeaderClient isLoggedIn={!!session} />
}