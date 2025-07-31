'use client'

import { useState, FormEvent } from "react";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const router = useRouter()

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
      
      if(!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Registration failed")
      } else {
        router.push("/login")
      }
      
    } catch(e: any) {
      setError(e?.message || "Registration failed")
    }
    finally {
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
              <span className="text-black">SIGNUP</span>
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-700">
              Join the <span className="bg-yellow-300 px-1 border border-black">PixArt</span> community!
            </p>
        </div>
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
  )
}