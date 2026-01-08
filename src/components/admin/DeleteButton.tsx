'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface DeleteButtonProps {
  slug: string
}

export function DeleteButton({ slug }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setLoading(true)
    try {
      const res = await fetch(`/api/recipes/${slug}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        router.refresh()
      } else {
        alert('Greška pri brisanju recepta')
      }
    } catch {
      alert('Greška pri brisanju recepta')
    } finally {
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-warm-500">Sigurno?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 text-sm bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? '...' : 'Da'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-sm text-warm-600 hover:bg-warm-100 rounded-lg transition-colors"
        >
          Ne
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      Obriši
    </button>
  )
}

