'use client'

import { useState, FormEvent } from "react";
import Input from "@/components/Input";
import { signIn } from "next-auth/react";
import { useUser } from "@/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { push } = useRouter()

  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  const { loginUser } = useUser()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
        const res = await signIn("credentials", {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            callbackUrl
        })

        if(!res?.error) {
            const userResponse = await fetch('/api/auth/session')
            const session = await userResponse.json()
            
            if (session.user) {
                loginUser({
                    name: session.user.name || '',
                    email: session.user.email || '',
                    role: session.user.role || 'user'
                })

                push(callbackUrl)
            }
            
        } else {
            setError("Email or Password is incorrect")
            console.log(`${res.status} ${res.error}`)
        }
        
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}

  return (
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-6"
      >
        <div className="text-center mb-2">
            <h2 className="text-4xl sm:text-6xl font-black mb-2 tracking-tight">
              <span className="text-black">LOGIN</span>
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-700">
              Welcome back to <span className="bg-yellow-300 px-1 border border-black">PixArt</span>!
            </p>
        </div>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
        {error && <div className="text-red-600 font-bold text-center">{error}</div>}
        <button
          type="submit"
          className="bg-black text-yellow-300 px-6 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xl hover:bg-yellow-300 hover:text-black transition-all mt-2"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </form>
  )
}