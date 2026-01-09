// components/Navbar/PublicNavbar.tsx
'use client'
import classnames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import xinyaLogo from '@/app/images/xinya-logo.png'
import { usePathname } from 'next/navigation'

const PublicNavbar = () => {
  const currentPath = usePathname()
  const links = [
    { label: 'Login', href: '/login' }, // ← CAMBIA a '/login' (ruta absoluta)
  ]

  return (
    <nav className='flex space-x-8 border-b shadow-2xs border-zinc-300 px-7 h-14 items-center' style={{ background: '#F9F9F9' }}>
      {/* CAMBIA: Logo debe redirigir a login cuando no hay sesión */}
      <Link href="./">
        <Image src={xinyaLogo} alt='logo' width={120} height={40} />
      </Link>

      <ul className='flex space-x-6'>
        {links.map(link => (
          <Link
            key={link.href}
            className={classnames({
              'text-zinc-500': link.href === currentPath,
              '#F9F9F9': link.href !== currentPath,
              'hover:#F9F9F9 transition-colors': true
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default PublicNavbar