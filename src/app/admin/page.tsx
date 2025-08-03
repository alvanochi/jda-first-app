"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Users, Palette, Crown, Shield, Trash2, Edit, Plus } from "lucide-react";
import ModalDelete from "@/components/ModalDelete";
import type { IArt } from "@/types/IArt";
import type { IUser } from "@/types/IUser";

type TabType = "arts" | "users"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("arts")

  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const [arts, setArts] = useState<IArt[]>([])
  const [artForm, setArtForm] = useState({
    art_id: null as number | null,
    name: "",
    description: "",
    image: "",
    user_id: null as number | null,
  })
  const [editArtId, setEditArtId] = useState<number | null>(null)

  const [users, setUsers] = useState<IUser[]>([])
  const [userForm, setUserForm] = useState({
    user_id: null as number | null,
    name: "",
    email: "",
    password: "",
    role: "user",
    level: 1,
    point: 0,
    artCount: 0,
  })
  const [editUserId, setEditUserId] = useState<number | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess("") , 3000)
      return () => clearTimeout(timer)
    }
  }, [success])
  
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteType, setDeleteType] = useState<"art" | "user">("art")

  async function fetchArts() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/art")
      const data = await res.json()
      setArts(data.data)
    } catch (e) {
      setError("Failed to fetch arts")
    }
    setLoading(false)
  }

  async function fetchUsers() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/user")
      const data = await res.json()
      setUsers(data.data)
    } catch (e) {
      setError("Failed to fetch users")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchArts()
    fetchUsers()
  }, [])

  function handleArtChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setArtForm({ ...artForm, [e.target.name]: e.target.value })
  }

  async function handleFileUpload(file: File) {
    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) return null

      const { url } = await res.json()

      setArtForm({ ...artForm, image: url })

    } catch (e) {
      console.error("File upload error:", e)
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  async function handleArtSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (editArtId) {
        const res = await fetch("/api/art", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...artForm, art_id: editArtId }),
        })
        if (!res.ok) throw new Error("Failed to update art")
        setSuccess("Art updated successfully!")
      } else {
        const res = await fetch("/api/art", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(artForm),
        })
        if (!res.ok) throw new Error("Failed to create art")
        setSuccess("Art added successfully!")
      }

      setArtForm({ art_id: null, name: "", description: "", image: "", user_id: 3 })
      setEditArtId(null)
      await fetchArts()
    } catch (e) {
      setError("Failed to save art")
    }
    setLoading(false)
  }

  function handleUserChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const value =
      e.target.name === "level" || e.target.name === "point" || e.target.name === "artCount"
        ? Number(e.target.value)
        : e.target.value
    setUserForm({ ...userForm, [e.target.name]: value })
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFile(file)
      setArtForm({ ...artForm, image: '' })
    }
  }

  async function handleUserSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (editUserId) {
        const res = await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userForm, user_id: editUserId }),
        })
        if (!res.ok) throw new Error("Failed to update user")
        setSuccess("User updated successfully!")
      } else {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userForm),
        })
        if (!res.ok) throw new Error("Failed to create user")
        setSuccess("User added successfully!")
      }

      setUserForm({ user_id: null, name: "", email: "", password: "", role: "user", level: 1, point: 0, artCount: 0 })
      setEditUserId(null)
      await fetchUsers()
    } catch (e) {
      setError("Failed to save/create user")
    }
    setLoading(false)
  }

  function handleEditArt(art: IArt) {
    setArtForm({
      art_id: art.art_id,
      name: art.name,
      description: art.description ?? "",
      image: art.image,
      user_id: art.user?.user_id ?? null,
    })
    setEditArtId(art.art_id)
  }

  function handleEditUser(user: IUser) {
    setUserForm({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      level: user.level,
      point: user.point,
      artCount: user.artCount,
    })
    setEditUserId(user.user_id)
  }

  function handleDeleteClick(id: number, type: "art" | "user") {
    setDeleteId(id)
    setDeleteType(type)
    setShowModal(true)
  }

  async function handleDeleteConfirmed() {
    if (deleteId == null) return
    setLoading(true)
    setError("")

    try {
      const endpoint = deleteType === "art" ? "/api/art" : "/api/user"
      const res = await fetch(`${endpoint}?id=${deleteId}`, { method: "DELETE" })
      if (!res.ok) throw new Error(`Failed to delete ${deleteType}`)

      setSuccess(`${deleteType.charAt(0).toUpperCase() + deleteType.slice(1)} deleted successfully!`)

      if (deleteType === "art") {
        await fetchArts()
        if (editArtId === deleteId) {
          setEditArtId(null)
          setArtForm({ art_id: null, name: "", description: "", image: "", user_id: 3 })
        }
      } else {
        await fetchUsers()
        if (editUserId === deleteId) {
          setEditUserId(null)
          setUserForm({
            user_id: null,
            name: "",
            email: "",
            password: "",
            role: "user",
            level: 1,
            point: 0,
            artCount: 0,
          })
        }
      }
    } catch (e) {
      setError(`Failed to delete ${deleteType}`)
    }

    setLoading(false)
    setShowModal(false)
    setDeleteId(null)
  }

  function handleModalClose() {
    setShowModal(false)
    setDeleteId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-purple-600 p-8 font-mono relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 gap-1 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="bg-black w-full h-8"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 border-6 border-black flex items-center justify-center transform rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Crown className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-white mb-4 tracking-tighter drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              ADMIN <span className="text-yellow-300">CONTROL</span>
            </h1>
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-400 border-6 border-black flex items-center justify-center transform -rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Shield className="w-10 h-10 text-black" />
            </div>
          </div>
          <div className="w-full h-8 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1"></div>
        </header>

        <div className="flex justify-center mb-12">
          <div className="bg-white border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-2 transform -rotate-1">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("arts")}
                className={`flex items-center gap-3 px-8 py-4 border-4 border-black font-black text-xl transition-all duration-200 transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                  activeTab === "arts"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <Palette className="w-6 h-6" />
                MANAGE ARTS
              </button>
              <button
                onClick={() => setActiveTab("users")}
                className={`flex items-center gap-3 px-8 py-4 border-4 border-black font-black text-xl transition-all duration-200 transform hover:scale-105 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                  activeTab === "users"
                    ? "bg-gradient-to-r from-blue-500 to-green-500 text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <Users className="w-6 h-6" />
                MANAGE USERS
              </button>
            </div>
          </div>
        </div>

        {success && (
          <div className="bg-green-400 border-6 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <div className="text-2xl font-black text-white text-center">{success}</div>
          </div>
        )}
        {error && (
          <div className="bg-red-400 border-6 border-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            <div className="text-2xl font-black text-white text-center">{error}</div>
          </div>
        )}

        {activeTab === "arts" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <div className="bg-white border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-black flex items-center justify-center transform rotate-12">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-black">ARTS ({arts.length})</h2>
                </div>

                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {loading && <div className="text-center text-2xl font-black text-gray-500 py-8">LOADING...</div>}
                  {arts.map((art) => (
                    <div
                      key={art.art_id}
                      className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full">
                        <img
                          src={art.image || "/placeholder.svg"}
                          alt={art.name}
                          className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white object-contain w-24 h-24 md:w-20 md:h-20 mb-4 md:mb-0"
                        />
                        <div className="flex-1 w-full">
                          <h3 className="text-xl md:text-2xl font-black text-black mb-2">{art.name}</h3>
                          <p className="text-base md:text-lg font-bold text-gray-700 mb-2">{art.description || "No description"}</p>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-green-500 text-white px-2 md:px-3 py-1 border-2 border-black font-black text-xs md:text-sm">
                              USER: {art.user?.name}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <button
                            onClick={() => handleEditArt(art)}
                            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black flex items-center justify-center hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          >
                            <Edit className="w-5 h-5 text-black" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(art.art_id, "art")}
                            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-400 to-pink-400 border-4 border-black flex items-center justify-center hover:from-red-300 hover:to-pink-300 transition-all duration-200 transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          >
                            <Trash2 className="w-5 h-5 text-black" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 border-4 border-black flex items-center justify-center transform -rotate-12">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-black">{editArtId ? "EDIT ART" : "ADD ART"}</h2>
                </div>

                <form onSubmit={handleArtSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xl font-black text-black mb-2">NAME:</label>
                    <input
                      type="text"
                      name="name"
                      value={artForm.name}
                      onChange={handleArtChange}
                      required
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-yellow-100"
                      placeholder="Art name..."
                    />
                  </div>
f
                  {!editArtId && (
                    <div>
                      <label className="block text-xl font-black text-black mb-4">ART IMAGE:</label>

                      <div className="relative">
                        <input
                          id="fileUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        
                        <div className="w-full p-4 border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-100 text-black text-center pointer-events-none">
                          {file ? file.name : 'CHOOSE FILE'}
                        </div>
                      </div>

                      {file && (
                        <button
                          type="button"
                          className="mt-2 px-4 py-2 bg-green-500 text-white font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          disabled={uploading}
                          onClick={async () => { await handleFileUpload(file) }}
                        >
                          {uploading ? 'Uploading...' : 'Upload Image'}
                        </button>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-xl font-black text-black mb-2">DESCRIPTION:</label>
                    <textarea
                      name="description"
                      value={artForm.description}
                      onChange={handleArtChange}
                      rows={3}
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-100 resize-none"
                      placeholder="Art description..."
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-black text-black mb-2">USER ID:</label>
                    <input
                      type="number"
                      name="user_id"
                      value={artForm.user_id || ""}
                      onChange={handleArtChange}
                      required
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-purple-100"
                      placeholder="User ID..."
                      readOnly={!!editArtId}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 border-4 border-black font-black text-xl hover:from-purple-400 hover:to-pink-400 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                  >
                    {loading ? "SAVING..." : editArtId ? "UPDATE ART" : "CREATE ART"}
                  </button>

                  {editArtId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditArtId(null)
                        setArtForm({ art_id: null, name: "", description: "", image: "", user_id: 3 })
                      }}
                      className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 border-4 border-black font-black text-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      CANCEL
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2">
              <div className="bg-white border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 border-4 border-black flex items-center justify-center transform -rotate-12">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-black text-black">USERS ({users.length})</h2>
                </div>

                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {loading && <div className="text-center text-2xl font-black text-gray-500 py-8">LOADING...</div>}
                  {users.map((user) => (
                    <div
                      key={user.user_id}
                      className="bg-gradient-to-r from-green-100 to-blue-100 border-4 border-black p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 w-full">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-black flex items-center justify-center transform rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 md:mb-0">
                          <span className="text-xl md:text-2xl font-black text-white">{user.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 w-full">
                          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 mb-2">
                            <h3 className="text-lg md:text-2xl font-black text-black">{user.name}</h3>
                            {user.role === "admin" && (
                              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-red-500 to-orange-500 border-2 border-black flex items-center justify-center transform rotate-12">
                                <Crown className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-base md:text-lg font-bold text-gray-700 mb-2 text-center md:text-left">{user.email}</p>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span
                              className={`px-2 md:px-3 py-1 border-2 border-black font-black text-xs md:text-sm ${
                                user.role === "admin" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                              }`}
                            >
                              {user.role.toUpperCase()}
                            </span>
                            <span className="bg-green-500 text-white px-2 md:px-3 py-1 border-2 border-black font-black text-xs md:text-sm">
                              LVL {user.level}
                            </span>
                            <span className="bg-yellow-500 text-black px-2 md:px-3 py-1 border-2 border-black font-black text-xs md:text-sm">
                              {user.point} PTS
                            </span>
                            <span className="bg-purple-500 text-white px-2 md:px-3 py-1 border-2 border-black font-black text-xs md:text-sm">
                              {user.artCount} ARTS
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black flex items-center justify-center hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          >
                            <Edit className="w-5 h-5 text-black" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user.user_id, "user")}
                            className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-400 to-pink-400 border-4 border-black flex items-center justify-center hover:from-red-300 hover:to-pink-300 transition-all duration-200 transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          >
                            <Trash2 className="w-5 h-5 text-black" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 border-4 border-black flex items-center justify-center transform rotate-12">
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-black">{editUserId ? "EDIT USER" : "ADD USER"}</h2>
                </div>

                <form onSubmit={handleUserSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xl font-black text-black mb-2">NAME:</label>
                    <input
                      type="text"
                      name="name"
                      value={userForm.name}
                      onChange={handleUserChange}
                      required
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-yellow-100"
                      placeholder="User name..."
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-black text-black mb-2">EMAIL:</label>
                    <input
                      type="email"
                      name="email"
                      value={userForm.email}
                      onChange={handleUserChange}
                      required
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-100"
                      placeholder="user@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-black text-black mb-2">PASSWORD:</label>
                    <input
                      type="password"
                      name="password"
                      value={userForm.password}
                      onChange={handleUserChange}
                      required={!editUserId} 
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-red-100"
                      placeholder={editUserId ? "Leave blank to keep current password" : "Enter password..."}
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-black text-black mb-2">ROLE:</label>
                    <select
                      name="role"
                      value={userForm.role}
                      onChange={handleUserChange}
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-100"
                    >
                      <option value="user">USER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xl font-black text-black mb-2">LEVEL:</label>
                      <input
                        type="number"
                        name="level"
                        value={userForm.level}
                        onChange={handleUserChange}
                        min="1"
                        required
                        className="w-full text-black p-4 border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-purple-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xl font-black text-black mb-2">POINTS:</label>
                      <input
                        type="number"
                        name="point"
                        value={userForm.point}
                        onChange={handleUserChange}
                        min="0"
                        required
                        className="w-full text-black p-4 border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-orange-100"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 border-4 border-black font-black text-xl hover:from-blue-400 hover:to-green-400 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                  >
                    {loading ? "SAVING..." : editUserId ? "UPDATE USER" : "CREATE USER"}
                  </button>

                  {editUserId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditUserId(null)
                        setUserForm({
                          user_id: null,
                          name: "",
                          email: "",
                          password: "",
                          role: "user",
                          level: 1,
                          point: 0,
                          artCount: 0,
                        })
                      }}
                      className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-4 border-4 border-black font-black text-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      CANCEL
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 flex justify-center gap-8">
          <div className="w-20 h-6 bg-black transform rotate-12"></div>
          <div className="w-32 h-6 bg-gradient-to-r from-yellow-400 to-red-400 border-4 border-black transform -rotate-6"></div>
          <div className="w-20 h-6 bg-black transform rotate-12"></div>
        </div>
      </div>

      {showModal && (
        <ModalDelete onClose={handleModalClose} onConfirm={handleDeleteConfirmed} loading={loading}>
          Are you sure you want to delete this {deleteType}?
          <br />
          This action cannot be undone.
        </ModalDelete>
      )}
    </div>
  )
}
