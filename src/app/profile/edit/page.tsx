"use client"

import { useState, useEffect, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, User, Crown, X } from "lucide-react"
import Link from "next/link"
import Input from "@/components/Input"
import { useSession } from "next-auth/react"

interface UserProfile {
  user_id: number
  name: string
  email: string
  role: string
  level: number
  point: number
  artCount: number
  createdAt: string
}

export default function EditProfilePage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    async function fetchUserProfile() {
      if (status === "loading") return 

      if (status === "unauthenticated" || !session?.user?.email) {
        setError("Please login to access this page")
        setLoading(false)
        return
      }

      try {
        const userRes = await fetch(`/api/user?id=${session.user.user_id}`)
        const userData = await userRes.json()

        if (userData.status === 200) {
          const userId = userData.data.user_id

          const res = await fetch(`/api/user?id=${userId}`)
          const data = await res.json()

          if (data.status === 200) {
            setUser(data.data)
            setForm({
              name: data.data.name,
              email: data.data.email,
              password: "",
              confirmPassword: "",
            })
          } else {
            setError("Failed to load profile data")
          }
        } else {
          setError("User not found")
        }
      } catch (e) {
        setError("Failed to load profile data")
      }
      setLoading(false)
    }

    fetchUserProfile()
  }, [session, status])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError("")
    if (success) setSuccess("")
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (form.password && form.password !== form.confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    if (!user) return

    setSaving(true)
    setError("")
    setSuccess("")

    try {
      const updateData: any = {
        user_id: user.user_id,
        name: form.name,
        email: form.email,
        role: user.role,
        level: user.level,
        point: user.point,
        artCount: user.artCount,
      }

      if (form.password.trim() !== "") {
        updateData.password = form.password
      }

      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess("Profile updated successfully!")
        setUser({ ...user, name: form.name, email: form.email })
        setForm({ ...form, password: "", confirmPassword: "" })

        setTimeout(() => {
          router.push("/profile")
        }, 2000)
      } else {
        setError(data.message || "Failed to update profile")
      }
    } catch (e) {
      setError("Failed to update profile. Please try again.")
    }
    setSaving(false)
  }

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12 transform rotate-2">
          <div className="text-4xl font-black text-black animate-pulse">LOADING PROFILE...</div>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-400 flex flex-col items-center justify-center p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,0,0,1)] max-w-2xl w-full p-12 flex flex-col items-center transform -rotate-2">
          <h1 className="text-6xl font-black text-red-600 mb-6 tracking-tighter text-center">ACCESS DENIED</h1>
          <div className="w-full h-4 bg-black mb-8 rotate-1" />
          <p className="text-2xl font-bold text-black text-center mb-8">
            Please login to access this page.
            <br />
            <Link href="/auth/signin" className="underline hover:text-blue-400">
              Click here to login
            </Link>
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-400 flex flex-col items-center justify-center p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,0,0,1)] max-w-2xl w-full p-12 flex flex-col items-center transform -rotate-2">
          <h1 className="text-6xl font-black text-red-600 mb-6 tracking-tighter text-center">ERROR</h1>
          <div className="w-full h-4 bg-black mb-8 rotate-1" />
          <p className="text-2xl font-bold text-black text-center mb-8">
            Failed to load profile data.
            <br />
            Please try again or return to{" "}
            <Link href="/profile" className="underline hover:text-blue-400">
              profile page
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-300 to-red-300 p-8 font-mono relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 gap-1 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="bg-black w-full h-8"></div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/profile"
            className="flex items-center gap-3 bg-black text-white px-6 py-3 border-4 border-white font-black text-lg hover:bg-white hover:text-black transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <ArrowLeft className="w-6 h-6" />
            BACK TO PROFILE
          </Link>

          <div className="flex items-center gap-3 bg-white border-4 border-black px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex items-center justify-center transform rotate-3">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-black">{user.name}</span>
            {user.role === "admin" && (
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-black flex items-center justify-center transform rotate-12">
                <Crown className="w-3 h-3 text-black" />
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-6xl lg:text-8xl font-black text-black mb-4 tracking-tighter drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
            EDIT <span className="text-orange-600">PROFILE</span>
          </h1>
          <div className="w-32 h-4 bg-gradient-to-r from-orange-500 to-red-500 mx-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2"></div>
        </div>

        {error && (
          <div className="bg-red-400 border-6 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black text-white">{error}</div>
              <button
                onClick={() => setError("")}
                className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-400 border-6 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-black text-white">{success}</div>
              <button
                onClick={() => setSuccess("")}
                className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1 hover:rotate-0 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 border-4 border-black flex items-center justify-center transform rotate-12">
                  <Save className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-black text-black">UPDATE PROFILE</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xl font-black text-black mb-4">FULL NAME:</label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Enter your full name..."
                  />
                </div>

                <div>
                  <label className="block text-xl font-black text-black mb-4">EMAIL ADDRESS:</label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Enter your email address..."
                  />
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                  <h3 className="text-2xl font-black text-black mb-4">CHANGE PASSWORD</h3>
                  <p className="text-lg font-bold text-gray-700 mb-6">Leave blank to keep current password</p>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-black text-black mb-2">NEW PASSWORD:</label>
                      <Input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Enter new password..."
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-black text-black mb-2">CONFIRM PASSWORD:</label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full"
                        placeholder="Confirm new password..."
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 border-4 border-black font-black text-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                >
                  <Save className="w-6 h-6" />
                  {saving ? "UPDATING..." : "UPDATE PROFILE"}
                </button>
              </form>
            </div>
          </div>

          <div>
            <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1 hover:rotate-0 transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-black flex items-center justify-center transform -rotate-12">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-black text-black">CURRENT INFO</h2>
              </div>

              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 border-6 border-black flex items-center justify-center transform rotate-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  {user.role === "admin" && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 border-2 border-black flex items-center justify-center transform rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Crown className="w-4 h-4 text-black" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-sm font-bold text-gray-700">ROLE</div>
                  <div className={`text-xl font-black ${user.role === "admin" ? "text-red-600" : "text-blue-600"}`}>
                    {user.role.toUpperCase()}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-sm font-bold text-gray-700">LEVEL</div>
                  <div className="text-xl font-black text-green-600">LEVEL {user.level}</div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-sm font-bold text-gray-700">POINTS</div>
                  <div className="text-xl font-black text-yellow-600">{user.point.toLocaleString()}</div>
                </div>

                <div className="bg-gradient-to-r from-red-100 to-pink-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-sm font-bold text-gray-700">ARTWORKS</div>
                  <div className="text-xl font-black text-red-600">{user.artCount}</div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-sm font-bold text-gray-700">JOINED</div>
                  <div className="text-lg font-black text-purple-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gray-100 border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                <div className="text-sm font-bold text-gray-700 text-center">
                  <strong>NOTE:</strong> Role, level, points, and art count cannot be changed from here. Contact an
                  admin if changes are needed.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center gap-8">
          <div className="w-20 h-6 bg-black transform rotate-12"></div>
          <div className="w-32 h-6 bg-gradient-to-r from-orange-400 to-red-400 border-4 border-black transform -rotate-6"></div>
          <div className="w-20 h-6 bg-black transform rotate-12"></div>
        </div>
      </div>
    </div>
  )
}
