import type { Metadata } from "next"
import "./globals.css"
import NextAuthProvider from "@/components/SessionProvider"
import Navbar from "@/components/Navbar"

export const metadata: Metadata = {
  title: "CareerWay - Find Your Perfect Career Path",
  description: "Structured roadmaps and curated resources for your career journey",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
