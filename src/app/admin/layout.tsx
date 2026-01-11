import { auth } from '@/lib/auth'
import Link from 'next/link'
import { SignOutButton } from '@/components/admin/SignOutButton'
import { SessionProvider } from '@/components/providers/SessionProvider'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  // Wrap admin routes with SessionProvider (only needed here, not in public routes)
  if (!session) {
    return (
      <SessionProvider>
        {children}
      </SessionProvider>
    )
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-warm-50">
        {/* Admin Header */}
        <header className="bg-warm-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <Link href="/admin/recepti" className="flex items-center gap-2">
                  <span className="text-2xl" aria-hidden="true">🔧</span>
                  <span className="font-display text-xl font-bold">
                    Admin Panel
                  </span>
                </Link>
                <nav className="flex items-center gap-6" aria-label="Admin navigacija">
                  <Link 
                    href="/admin/recepti" 
                    className="hover:text-primary-300 transition-colors"
                  >
                    Recepti
                  </Link>
                  <Link 
                    href="/recepti" 
                    className="hover:text-primary-300 transition-colors"
                    target="_blank"
                  >
                    Pogledaj stranicu ↗
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-warm-300 text-sm">
                  {session.user?.name}
                </span>
                <SignOutButton />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </SessionProvider>
  )
}
