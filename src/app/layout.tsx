import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Recepti | Coolinarika",
    template: "%s | Coolinarika"
  },
  description: "Otkrijte tradicionalne i moderne recepte balkanske kuhinje. Sarma, ćevapi, burek i mnogo više!",
  keywords: ["recepti", "kuhanje", "balkanska kuhinja", "tradicionalni recepti", "coolinarika"],
  authors: [{ name: "Coolinarika" }],
  openGraph: {
    type: "website",
    locale: "hr_HR",
    siteName: "Coolinarika Recepti",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hr">
      <body className={`${geistSans.variable} antialiased min-h-screen`}>
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
      </body>
    </html>
  );
}
