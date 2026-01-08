import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🍳</div>
        <h1 className="font-display text-4xl font-bold text-warm-900 mb-4">
          Stranica nije pronađena
        </h1>
        <p className="text-warm-600 text-lg mb-8 max-w-md mx-auto">
          Nažalost, stranica koju tražite ne postoji ili je premještena.
        </p>
        <Link 
          href="/recepti" 
          className="btn btn-primary"
        >
          Pregledaj recepte
        </Link>
      </div>
    </div>
  )
}

