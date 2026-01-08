import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";

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
    <html lang="hr" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased min-h-screen`} suppressHydrationWarning>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
