'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="px-4 py-2 text-sm bg-warm-800 hover:bg-warm-700 rounded-lg transition-colors"
    >
      Odjava
    </button>
  )
}

