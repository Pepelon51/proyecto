'use client'
import home from '@/app/images/home.svg'
import clipboard from '@/app/images/clipboard-list.svg'
import users from '@/app/images/users.svg'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

const ICONS: Record<string, StaticImageData> = {
  home,
  clipboard,
  users
};

interface SidebarItem {
  name: string;
  href: string;
  icon: keyof typeof ICONS;
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { name: "Inicio", href: "/", icon: "home" },
  { name: "Reportes", href: "/reports", icon: "clipboard" },
  { name: "Usuarios", href: "/registerUser", icon: "users" }
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className='h-full bg-gradient-to-b from-blue-50 to-white border-r border-gray-200'>
      {/* Encabezado compacto */}
      <div className='p-3 border-b border-gray-200'>
        <h1 className='text-lg font-bold text-blue-800'>Dashboard</h1>
        <p className='text-xs text-gray-500'>Panel de administración</p>
      </div>
      
      {/* Navegación sin márgenes extra */}
      <nav className='py-2'>
        {SIDEBAR_ITEMS.map((item) => {
          const iconSrc = ICONS[item.icon];
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.name} href={item.href} className='block'>
              <div 
                className={`flex items-center p-2 mx-2 my-1 text-sm font-medium rounded transition-all duration-200
                  ${isActive 
                    ? "bg-blue-600 text-white shadow" 
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  }`}
              >
                <Image 
                  src={iconSrc} 
                  alt={item.name}
                  width={18}
                  height={18}
                  className={`mr-2 ${isActive ? "invert" : ""}`}
                />
                <span className='font-medium'>{item.name}</span>
                {isActive && (
                  <div className='ml-auto w-1.5 h-1.5 bg-white rounded-full'></div>
                )}
              </div>
            </Link>
          )
        })}
      </nav>
      
      {/* Footer compacto */}
      <div className='mt-auto border-t border-gray-200'>
        <div className='text-xs text-gray-500 text-center py-2'>
          v1.0.0
        </div>
      </div>
    </div>  
  )
}

export default Sidebar