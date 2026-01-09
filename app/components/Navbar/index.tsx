// components/Navbar/index.tsx
'use client'
import { useSession } from 'next-auth/react'
import PublicNavbar from './PublicNavbarComponent'

const Navbar = () => {
  const { data: session, status } = useSession()
  
  // Debug: ver qué está pasando
  console.log('Navbar - status:', status)
  console.log('Navbar - session:', session)
  
  if (status === 'loading') {
    return null // o un loader pequeño
  }
  
  // IMPORTANTE: No mostrar navbar público si hay sesión
  if (session) {
    return null
  }
  
  // Solo mostrar navbar público cuando NO hay sesión
  return <PublicNavbar />
}

export default Navbar