import Link from "next/link";

export default function ReceptiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-warm-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/recepti" className="flex items-center gap-2">
              <span className="text-2xl">🍳</span>
              <span className="font-display text-2xl font-bold text-primary-600">
                Coolinarika
              </span>
            </Link>
            <div className="flex items-center gap-6">
              <Link 
                href="/recepti" 
                className="text-warm-700 hover:text-primary-600 font-medium transition-colors"
              >
                Recepti
              </Link>
              <Link 
                href="/admin" 
                className="text-warm-500 hover:text-warm-700 text-sm transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-warm-100 border-t border-warm-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-warm-600">
            <p className="font-display text-lg mb-2">Coolinarika Recepti</p>
            <p className="text-sm">© 2026 Sva prava pridržana</p>
          </div>
        </div>
      </footer>
    </>
  );
}

