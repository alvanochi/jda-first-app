'use client'

import { useState } from 'react'

export default function ArtForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/arts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    })

    if (res.ok) {
      setTitle('')
      setDescription('')
      alert('Karya berhasil ditambahkan!')
    } else {
      alert('Gagal menambahkan karya.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Tambah Karya Baru</h2>
      <div>
        <label className="block mb-1">Judul</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-1">Deskripsi</label>
        <textarea
          className="w-full border rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Simpan
      </button>
    </form>
  )
}
