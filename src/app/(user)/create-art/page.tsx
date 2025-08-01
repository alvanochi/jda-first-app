"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Palette, Save, Eye } from "lucide-react"
import Image from "next/image"

export default function CreateArtPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "https://cdn.lospec.com/thumbnails/gallery/kyle-d00/pixel-portrait-2-default.png",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/art", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          image: form.image,
          user_id: 3, // This should come from session in real app
        }),
      })

      if (!res.ok) throw new Error("Failed to create art")

      router.push(`/my-art`)
    } catch (e) {
      setError("Failed to create art. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 to-blue-300 p-8 font-mono relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-20 gap-1 h-full">
          {Array.from({ length: 400 }).map((_, i) => (
            <div key={i} className="bg-black w-full h-8"></div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl lg:text-8xl font-black text-black mb-4 tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            CREATE <span className="text-green-600">NEW ART</span>
          </h1>
          <div className="w-32 h-4 bg-gradient-to-r from-green-500 to-blue-500 mx-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-2"></div>
        </div>

        {error && (
          <div className="bg-red-400 border-4 border-black p-4 mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
            <div className="text-xl font-black text-white text-center">{error}</div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1 hover:rotate-0 transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 border-4 border-black flex items-center justify-center transform rotate-12">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-black">ART DETAILS</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xl font-black text-black mb-4">ART NAME:</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full text-black p-4 border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-yellow-100 focus:bg-yellow-200 transition-colors"
                  placeholder="Enter your art name..."
                />
              </div>

              <div>
                <label className="block text-xl font-black text-black mb-4">IMAGE URL:</label>
                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                  className="w-full text-black p-4 border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-100 focus:bg-blue-200 transition-colors"
                  placeholder="https://cdn.lospec.com/..."
                />
              </div>

              <div>
                <label className="block text-xl font-black text-black mb-4">DESCRIPTION:</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full text-black p-4 border-4 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-green-100 focus:bg-green-200 transition-colors resize-none"
                  placeholder="Describe your art..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 border-4 border-black font-black text-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-200 transform hover:scale-105 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50"
              >
                <Save className="w-6 h-6" />
                {loading ? "CREATING..." : "CREATE ART"}
              </button>
            </form>
          </div>

          <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 transform -rotate-1 hover:rotate-0 transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 border-4 border-black flex items-center justify-center transform -rotate-12">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-black">LIVE PREVIEW</h2>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                {form.image ? (
                  <div className="relative inline-block">
                    <Image
                      src={form.image || "/placeholder.svg"}
                      alt={form.name || "Preview"}
                      width={300}
                      height={300}
                      className="border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-blue-400 to-purple-400 object-contain transform rotate-2"
                      onError={() => {}}
                    />
                    <div className="absolute -top-3 -right-3 bg-yellow-400 border-2 border-black px-2 py-1 font-black text-black text-sm transform rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      PREVIEW
                    </div>
                  </div>
                ) : (
                  <div className="w-72 h-72 border-6 border-black bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
                    <div className="text-center">
                      <Palette className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <div className="text-xl font-black text-gray-500">NO IMAGE YET</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-3xl font-black text-black mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {form.name || "Your Art Title"}
                </h3>
              </div>

              <div className="bg-gradient-to-r overflow-auto from-green-100 to-blue-100 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-lg font-bold text-black">
                  {form.description || "Your art description will appear here..."}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="bg-red-400 border-2 border-black p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                  <div className="text-lg font-black text-white">NEW</div>
                  <div className="text-xs font-bold text-black">STATUS</div>
                </div>
                <div className="bg-blue-400 border-2 border-black p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                  <div className="text-lg font-black text-white">PIXEL</div>
                  <div className="text-xs font-bold text-black">ART</div>
                </div>
                <div className="bg-green-400 border-2 border-black p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                  <div className="text-lg font-black text-white">MINE</div>
                  <div className="text-xs font-bold text-black">OWNED</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-8">
          <div className="w-16 h-4 bg-black transform rotate-12"></div>
          <div className="w-24 h-4 bg-gradient-to-r from-green-500 to-blue-500 border-2 border-black transform -rotate-6"></div>
          <div className="w-16 h-4 bg-black transform rotate-12"></div>
        </div>
      </div>
    </div>
  )
}
