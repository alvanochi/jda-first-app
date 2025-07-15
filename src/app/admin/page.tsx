//tar bakal buat component terpisah, sementara gini dulu

"use client";
import { IProduct } from "@/types/IProduct";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";


export default function AdminPage() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [form, setForm] = useState<{ id: number | null; name: string; price: string; description: string; image: string }>({ id: null, name: "", price: "", description: "", image: "" });
  const [editId, setEditId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  async function fetchProducts() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/product")
      const data = await res.json()
      setProducts(data.data)
    } catch (e) {
      setError("Failed to fetch products")
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
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
          id: editId,
          name: form.name,
          price: Number(form.price),
          description: form.description,
          image: form.image,
        }

        const res = await fetch("/api/product", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })

        if (!res.ok) throw new Error("Failed to update")
      } else {
        const body = {
          name: form.name,
          price: Number(form.price),
          description: form.description,
          image: form.image,
        }

        const res = await fetch("/api/product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })

        if (!res.ok) throw new Error("Failed to create")
      }
      setForm({ id: null, name: "", price: "", description: "", image: "" })
      setEditId(null)

      await fetchProducts()
    } catch (e) {
      setError("Failed to save product")
    }
    setLoading(false)
  }

  function handleEdit(product: IProduct) {
    setForm({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
    })
    setEditId(product.id)
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
      const res = await fetch(`/api/product?id=${deleteId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete")

      await fetchProducts()

      if (editId === deleteId) {
        setEditId(null)
        setForm({ id: null, name: "", price: "", description: "", image: "" })
      }
    } catch (e) {
      setError("Failed to delete product")
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
            <h2 className="text-3xl font-black mb-6">Products</h2>
            {loading && <div className="mb-4 text-yellow-300 font-bold">Loading...</div>}
            {error && <div className="mb-4 text-red-500 font-bold">{error}</div>}
            <ul className="space-y-6">
              {products.map((product) => (
                <li key={product.id} className="bg-white text-black border-4 border-yellow-300 p-4 shadow-[6px_6px_0px_0px_rgba(255,255,0,1)] flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="font-black text-xl">{product.name}</span>
                    <span className="font-bold">Rp {Number(product.price).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="text-xs mb-2 truncate">{product.description}</div>
                  <div className="flex gap-4">
                    <button
                      className="bg-yellow-300 text-black px-4 py-1 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-yellow-300 transition-all"
                      onClick={() => handleEdit(product)}
                    >
                      EDIT
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-1 font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,0,0,1)] hover:bg-black hover:text-red-600 transition-all"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      DELETE
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-black mb-6">{editId ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit} className="bg-white text-black border-4 border-yellow-300 p-6 shadow-[6px_6px_0px_0px_rgba(255,255,0,1)] flex flex-col gap-4">
              <input
                className="border-2 border-black p-2 font-bold"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="border-2 border-black p-2 font-bold"
                name="price"
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={handleChange}
                required
              />
              <input
                className="border-2 border-black p-2 font-bold"
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
                required
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
                    setEditId(null)
                    setForm({ id: null, name: "", price: "", description: "", image: "" })
                  }}
                >
                  CANCEL
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white border-8 border-red-600 p-12 shadow-[12px_12px_0px_0px_rgba(255,0,0,1)] flex flex-col items-center max-w-md w-full transform -rotate-2">
            <h2 className="text-4xl font-black text-red-600 mb-6 tracking-tighter text-center">
              Confirm Delete
            </h2>
            <p className="text-lg font-bold text-black mb-8 text-center">
              Are you sure you want to delete this product?<br />
              This action cannot be undone.
            </p>
            <div className="flex gap-6">
              <button
                className="bg-red-600 text-white px-8 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] text-xl hover:bg-black hover:text-red-600 transition-all"
                onClick={handleDeleteConfirmed}
                disabled={loading}
              >
                DELETE
              </button>
              <button
                className="bg-black text-yellow-300 px-8 py-3 font-black border-2 border-yellow-300 shadow-[4px_4px_0px_0px_rgba(255,255,0,1)] text-xl hover:bg-yellow-300 hover:text-black transition-all"
                onClick={handleModalClose}
                disabled={loading}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 