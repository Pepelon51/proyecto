import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  })

  const response = NextResponse.next()

  const { pathname } = request.nextUrl

    if (pathname === '/') {
    const response = NextResponse.next()
    response.cookies.delete('next-auth.session-token')
    response.cookies.delete('__Secure-next-auth.session-token')
    response.cookies.delete('next-auth.csrf-token')
    response.cookies.delete('__Secure-next-auth.csrf-token')
    return response
  }

  console.log('=== PROXY DEBUG ===')
  console.log('Ruta:', pathname)
  console.log('Token encontrado:', !!token)
  console.log('Token completo:', token)
  console.log('Cookies:', request.cookies.toString())
  console.log('===================')

  // Rutas que NO requieren autenticación
  const publicPaths = [
    '/',
    '/login',
    '/api/auth',
    '/_next',
    '/favicon.ico',
    '/images',
    '/fonts',
    '/viewReport',
    '/newReport'
  ]

  const isPublicPath = publicPaths.some(path =>
    pathname === path || pathname.startsWith(path + '/')
  )

  console.log('Es ruta pública?:', isPublicPath)

  // Permitir acceso a rutas públicas
  if (isPublicPath) {
    console.log('Permitiendo acceso a ruta pública')
    return NextResponse.next()
  }

  // Si NO está logueado y no es ruta pública, redirigir a login
  if (!token) {
    console.log('🚫 Usuario NO autenticado, redirigiendo a login')
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si está logueado y quiere ir al login, redirigir al dashboard
  if (token && pathname === '/login') {
    console.log('✅ Usuario ya logueado, redirigiendo a /dashboard')
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  console.log('✅ Acceso permitido a ruta protegida')
  return NextResponse.next()

}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}