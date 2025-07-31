//tar bakal buat component terpisah, sementara gini dulu

"use client";
import ArtList, { ArtListLoading } from "@/components/ArtList";
import Input from "@/components/Input";
import ModalDelete from "@/components/ModalDelete";
import { IArt } from "@/types/IArt";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

export default function AdminPage() {
  const [arts, setArts] = useState<IArt[]>([])
  const [form, setForm] = useState<{
    art_id: number | null
    name: string
    description: string
    image: string
    user_id: number
  }>({ art_id: null, name: "", description: "", image: "", user_id: 3 })
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

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

  useEffect(() => {
    fetchArts()
  }, [])

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      if (editId) {
        const body = {
          art_id: editId,
          name: form.name,
          description: form.description,
          image: form.image,
        }
        const res = await fetch("/api/art", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error("Failed to update")
      } else {
        const body = {
          name: form.name,
          description: form.description,
          image: form.image,
          user_id: 3
        }
        const res = await fetch("/api/art", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error("Failed to create")
      }
      setForm({ art_id: null, name: "", description: "", image: "", user_id: 3 })
      setEditId(null)
      await fetchArts()
    } catch (e) {
      setError("Failed to save art")
    }
    setLoading(false)
  }

  function handleEdit(art: IArt) {
    setForm({
      art_id: art.art_id,
      name: art.name,
      description: art.description ?? "",
      image: art.image,
      user_id: art.user_id,
    })
    setEditId(art.art_id)
  }

  function handleDeleteClick(id: number) {
    setDeleteId(id)
    setShowModal(true)
  }

  async function handleDeleteConfirmed() {
    if (deleteId == null) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/art?id=${deleteId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")
      await fetchArts()
      if (editId === deleteId) {
        setEditId(null)
        setForm({ art_id: null, name: "", description: "", image: "", user_id: 3 });
      }
    } catch (e) {
      setError("Failed to delete art")
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
    <div className="min-h-screen bg-black text-white p-8 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-7xl font-black text-yellow-300 mb-4 tracking-tighter drop-shadow-[4px_4px_0px_rgba(255,255,0,1)]">
            ADMIN PANEL
          </h1>
          <div className="w-full h-6 bg-yellow-300 rotate-1 mb-8"></div>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-black mb-6">Arts</h2>
            {loading && <ArtListLoading />}
            {error && <div className="mb-4 text-red-500 font-bold">{error}</div>}
            <ul className="space-y-6">
              {arts.map((art) => (
                <ArtList key={art.art_id} art={art} handleEdit={handleEdit} handleDelete={handleDeleteClick} />
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-black mb-6">{editId ? "Edit Art" : "Add Art"}</h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white text-black border-4 border-yellow-300 p-6 shadow-[6px_6px_0px_0px_rgba(255,255,0,1)] flex flex-col gap-4"
            >
              <Input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="image"
                placeholder="https://cdn.lospec.com/..."
                value={form.image}
                onChange={handleChange}
                required
              />
              <textarea
                className="border-2 border-black p-2 font-bold"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-yellow-300 text-black px-6 py-2 font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-yellow-300 transition-all text-xl mt-2"
                disabled={loading}
              >
                {editId ? "UPDATE" : "CREATE"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="bg-black text-yellow-300 px-6 py-2 font-black border-2 border-yellow-300 shadow-[2px_2px_0px_0px_rgba(255,255,0,1)] hover:bg-yellow-300 hover:text-black transition-all text-xl"
                  onClick={() => {
                    setEditId(null);
                    setForm({ art_id: null, name: "", description: "", image: "", user_id: 3});
                  }}
                >
                  CANCEL
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      {showModal && 
        <ModalDelete
          onClose={handleModalClose}
          onConfirm={handleDeleteConfirmed}
          loading={loading}
        >
          Are you sure you want to delete this art?<br />
          This action cannot be undone.
        </ModalDelete>
      }
    </div>
  )
} 