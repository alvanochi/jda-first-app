"use client"

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Users, Palette, Crown, Shield, Trash2, Edit, Plus } from "lucide-react"
import ModalDelete from "@/components/ModalDelete"
import type { IArt } from "@/types/IArt"
import type { IUser } from "@/types/IUser"

type TabType = "arts" | "users"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("arts")

  const [arts, setArts] = useState<IArt[]>([])
  const [artForm, setArtForm] = useState({
    art_id: null as number | null,
    name: "",
    description: "",
    image: "",
    user_id: 3,
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
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [deleteType, setDeleteType] = useState<"art" | "user">("art")

  async function fetchArts() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/art")
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

  async function handleArtSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (editArtId) {
        const res = await fetch("/api/art", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...artForm, art_id: editArtId }),
        })
        if (!res.ok) throw new Error("Failed to update art")
      } else {
        const res = await fetch("/api/art", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(artForm),
        })
        if (!res.ok) throw new Error("Failed to create art")
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

  async function handleUserSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (editUserId) {
        const res = await fetch("/api/user", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...userForm, user_id: editUserId }),
        })
        if (!res.ok) throw new Error("Failed to update user")
      } else {
        const res = await fetch("/api/user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userForm),
        })
        if (!res.ok) throw new Error("Failed to create user")
      }

      setUserForm({ user_id: null, name: "", email: "", password: "", role: "user", level: 1, point: 0, artCount: 0 })
      setEditUserId(null)
      await fetchUsers()
    } catch (e) {
      setError("Failed to save user")
    }
    setLoading(false)
  }

  function handleEditArt(art: IArt) {
    setArtForm({
      art_id: art.art_id,
      name: art.name,
      description: art.description ?? "",
      image: art.image,
      user_id: art.user_id,
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
                      className="bg-gradient-to-r from-blue-100 to-purple-100 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-6">
                        <img
                          src={art.image || "/placeholder.svg"}
                          alt={art.name}
                          width={80}
                          height={80}
                          className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white object-contain"
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-black mb-2">{art.name}</h3>
                          <p className="text-lg font-bold text-gray-700 mb-2">{art.description || "No description"}</p>
                          <div className="flex gap-2">
                            <span className="bg-blue-500 text-white px-3 py-1 border-2 border-black font-black text-sm">
                              ID: {art.art_id}
                            </span>
                            <span className="bg-green-500 text-white px-3 py-1 border-2 border-black font-black text-sm">
                              USER: {art.user_id}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditArt(art)}
                            className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black flex items-center justify-center hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          >
                            <Edit className="w-5 h-5 text-black" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(art.art_id, "art")}
                            className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 border-4 border-black flex items-center justify-center hover:from-red-300 hover:to-pink-300 transition-all duration-200 transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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

                  <div>
                    <label className="block text-xl font-black text-black mb-2">IMAGE URL:</label>
                    <input
                      type="url"
                      name="image"
                      value={artForm.image}
                      onChange={handleArtChange}
                      required
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-100"
                      placeholder="https://example.com/image.png"
                    />
                  </div>

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
                      value={artForm.user_id}
                      onChange={handleArtChange}
                      required
                      className="w-full p-4 border-4 border-black text-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-purple-100"
                      placeholder="User ID..."
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
                      className="bg-gradient-to-r from-green-100 to-blue-100 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] "
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-black flex items-center justify-center transform rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                          <span className="text-2xl font-black text-white">{user.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-black text-black">{user.name}</h3>
                            {user.role === "admin" && (
                              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 border-2 border-black flex items-center justify-center transform rotate-12">
                                <Crown className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                          <p className="text-lg font-bold text-gray-700 mb-2">{user.email}</p>
                          <div className="flex gap-2">
                            <span
                              className={`px-3 py-1 border-2 border-black font-black text-sm ${
                                user.role === "admin" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                              }`}
                            >
                              {user.role.toUpperCase()}
                            </span>
                            <span className="bg-green-500 text-white px-3 py-1 border-2 border-black font-black text-sm">
                              LVL {user.level}
                            </span>
                            <span className="bg-yellow-500 text-black px-3 py-1 border-2 border-black font-black text-sm">
                              {user.point} PTS
                            </span>
                            <span className="bg-purple-500 text-white px-3 py-1 border-2 border-black font-black text-sm">
                              {user.artCount} ARTS
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 border-4 border-black flex items-center justify-center hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                          >
                            <Edit className="w-5 h-5 text-black" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(user.user_id, "user")}
                            className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-400 border-4 border-black flex items-center justify-center hover:from-red-300 hover:to-pink-300 transition-all duration-200 transform hover:scale-110 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
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
                      disabled
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
