// layout.tsx - VERSIÓN CORREGIDA
import { Theme } from '@radix-ui/themes'
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import "@radix-ui/themes/styles.css"
import Navbar from './components/Navbar' // ← IMPORTANTE: usa Navbar (el condicional)
import Sidebar from './components/Sidebar'
import { Providers } from '@/app/provider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Sistema de Reportes",
  description: "Panel de administración",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body style={{ backgroundColor: '#F9F9F9' }}>
        <Providers>
          <Theme style={{ backgroundColor: "#F9F9F9" }}>
            <Navbar />
            
            {/* CONTENEDOR PRINCIPAL FLEX */}
            <div className="flex">
              {/* SIDEBAR - columna izquierda */}
              <div className="flex-shrink-0 h-screen sticky top-0">
                <Sidebar />
              </div>
              
              {/* CONTENIDO PRINCIPAL - columna derecha */}
              <main className="flex-1 min-h-screen overflow-auto p-6">
                {children}
              </main>
            </div>
            
          </Theme>
        </Providers>
      </body>
    </html>
  )
}