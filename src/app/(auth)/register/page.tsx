'use client'

import { useState, FormEvent } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useUser } from "@/hooks/useUser";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const {push} = useRouter()
  const { loginUser } = useUser()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const body = {
        name: form.name,
        email: form.email,
        password: form.password,
      }
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      
      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Registration failed")
      }
      
      const userData = await res.json()
      
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      })

      if (!loginRes?.error) {
        const userResponse = await fetch('/api/auth/session')
        const session = await userResponse.json()
        
        if (session.user) {
          loginUser({
            name: session.user.name || form.name,
            email: session.user.email || form.email,
            role: session.user.role || 'user'
          })
        }
        
        setForm({ name: "", email: "", password: "" })
        push("/")
      } else {
        setError("Registration successful but auto-login failed. Please login manually.")
      }

    } catch(e: any) {
      setError(e?.message || "Registration failed")
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-yellow-300 flex flex-col items-center justify-center p-8 font-mono">
      <form
        onSubmit={handleSubmit}
        className="bg-white border-8 text-black border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-8 flex flex-col gap-6 transform -rotate-2"
      >
        <h1 className="text-5xl font-black mb-2 tracking-tighter text-center">REGISTER</h1>
        <div className="w-full h-2 bg-black mb-4" />
        <Input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        {error && <div className="text-red-600 font-bold text-center">{error}</div>}
        <button
          type="submit"
          className="bg-black text-yellow-300 px-6 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-xl hover:bg-yellow-300 hover:text-black transition-all mt-2"
          disabled={loading}
        >
          {loading ? "Registering..." : "REGISTER"}
        </button>
      </form>
    </div>
  )
}