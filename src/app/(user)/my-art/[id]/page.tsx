'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { Edit, Trash2, Save, X } from "lucide-react"
import ModalDelete from "@/components/ModalDelete"
import { IArt } from "@/types/IArt"

async function getArtById(id: number): Promise<IArt | null> {
  const res = await fetch(`/api/art?id=${id}`)
  const data = await res.json()
  return data.status === 200 ? data.data : null
}

export default function DetailMyArt({ params }: { params: Promise<{ id: string }> }) {
  const [art, setArt] = useState<IArt | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    image: "",
  })
  const [saving, setSaving] = useState(false)
  const [id, setId] = useState<string>("")

  useEffect(() => {
    async function loadParams() {
      const resolvedParams = await params
      setId(resolvedParams.id)

      const artData = await getArtById(Number.parseInt(resolvedParams.id))
      setArt(artData)

      if (artData) {
        setEditForm({
          name: artData.name,
          description: artData.description || "",
          image: artData.image,
        })
      }
      setLoading(false)
    }

    loadParams()
  }, [params])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    if (art) {
      setEditForm({
        name: art.name,
        description: art.description || "",
        image: art.image,
      })
    }
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!art) return

    setSaving(true)
    try {
      const res = await fetch("/api/art", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          art_id: art.art_id,
          name: editForm.name,
          description: editForm.description,
          image: editForm.image,
        }),
      })

      if (res.ok) {
        const updatedArt = { ...art, ...editForm }
        setArt(updatedArt)
        setIsEditing(false)
      }
    } catch (error) {
      console.error("Failed to update art:", error)
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!art) return

    setSaving(true)
    try {
      const res = await fetch(`/api/art?id=${art.art_id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        window.location.href = "/my-art"
      }
    } catch (error) {
      console.error("Failed to delete art:", error)
    }
    setSaving(false)
    setShowDeleteModal(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-300 flex items-center justify-center p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12 transform rotate-2">
          <div className="text-4xl font-black text-black animate-pulse">LOADING...</div>
        </div>
      </div>
    )
  }

  if (!art) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-400 to-pink-400 flex flex-col items-center justify-center p-8 font-mono">
        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(255,0,0,1)] max-w-2xl w-full p-12 flex flex-col items-center transform -rotate-2">
          <h1 className="text-6xl font-black text-red-600 mb-6 tracking-tighter text-center">NOT FOUND</h1>
          <div className="w-full h-4 bg-black mb-8 rotate-1" />
          <p className="text-2xl font-bold text-black text-center mb-8">
            The art you are looking for does not exist.
            <br />
            Please check the ID or return to the{" "}
            <Link href="/my-art" className="underline hover:text-blue-400">
              art list
            </Link>
            .
          </p>
          <span className="bg-black text-red-400 px-6 py-3 font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] text-lg">
            ERROR 404
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-pink-300 p-8 font-mono relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 gap-1 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="bg-black w-full h-8"></div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="mb-8 flex items-center justify-end">

          <div className="flex gap-4">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 border-4 border-black font-black text-lg hover:from-blue-400 hover:to-purple-400 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Edit className="w-5 h-5" />
                  EDIT
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 border-4 border-black font-black text-lg hover:from-red-400 hover:to-pink-400 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Trash2 className="w-5 h-5" />
                  DELETE
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 border-4 border-black font-black text-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  {saving ? "SAVING..." : "SAVE"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 border-4 border-black font-black text-lg hover:from-gray-400 hover:to-gray-500 transition-all duration-200 transform hover:scale-105 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                >
                  <X className="w-5 h-5" />
                  CANCEL
                </button>
              </>
            )}
          </div>
        </div>

        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1 hover:rotate-0 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col items-center">
              {isEditing ? (
                <div className="w-full">
                  <label className="block text-xl font-black text-black mb-4">IMAGE URL:</label>
                  <input
                    type="text"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full p-4 border-4 border-black font-bold text-lg mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="https://example.com/image.png"
                  />
                </div>
              ) : null}

              <div className="relative">
                <img
                  src={isEditing ? editForm.image : art.image}
                  alt={isEditing ? editForm.name : art.name}
                  width={400}
                  height={400}
                  className="border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-blue-400 to-purple-400 object-contain transform rotate-2 hover:-rotate-2 transition-all duration-300"
                  
                />
                {isEditing && (
                  <div className="absolute -top-4 -right-4 bg-yellow-400 border-4 border-black px-3 py-1 font-black text-black transform rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    EDITING
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 border-2 border-black transform rotate-45"></div>
                  <h2 className="text-2xl font-black text-black">ART TITLE</h2>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full text-4xl font-black text-black p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-yellow-100"
                  />
                ) : (
                  <h1 className="text-4xl lg:text-5xl font-black text-black mb-4 tracking-tighter bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {art.name}
                  </h1>
                )}
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 border-2 border-black transform -rotate-45"></div>
                  <h3 className="text-2xl font-black text-black">DESCRIPTION</h3>
                </div>
                {isEditing ? (
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={4}
                    className="w-full text-lg font-bold text-black p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-100 resize-none"
                    placeholder="Enter art description..."
                  />
                ) : (
                  <p className="text-lg font-bold text-black bg-gradient-to-r from-green-100 to-blue-100 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {art.description || "No description available."}
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-200 to-orange-200 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-black transform rotate-12"></div>
                  <h3 className="text-2xl font-black text-black">ARTIST INFO</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-bold text-black">CREATED BY:</span>
                    <div className="font-black text-purple-600 text-lg">{art.user?.name}</div>
                  </div>
                  <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-bold text-black">CREATED ON:</span>
                    <div className="font-black text-blue-600 text-lg">
                      {new Date(art.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-400 border-4 border-black p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
                  <div className="text-2xl font-black text-white">#{art.art_id}</div>
                  <div className="text-sm font-bold text-black">ART ID</div>
                </div>
                <div className="bg-blue-400 border-4 border-black p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                  <div className="text-2xl font-black text-white">PIXEL</div>
                  <div className="text-sm font-bold text-black">ART</div>
                </div>
                <div className="bg-green-400 border-4 border-black p-4 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                  <div className="text-2xl font-black text-white">MINE</div>
                  <div className="text-sm font-bold text-black">OWNED</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-8">
          <div className="w-16 h-4 bg-black transform rotate-12"></div>
          <div className="w-24 h-4 bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-black transform -rotate-6"></div>
          <div className="w-16 h-4 bg-black transform rotate-12"></div>
        </div>
      </div>

      {showDeleteModal && (
        <ModalDelete onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} loading={saving}>
          Are you sure you want to delete "{art.name}"?
          <br />
          This action cannot be undone.
        </ModalDelete>
      )}
    </div>
  )
}
