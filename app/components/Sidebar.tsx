'use client'
import home from '@/app/images/home.svg'
import clipboard from '@/app/images/clipboard-list.svg'
import users from '@/app/images/users.svg'
import userIcon from '@/app/images/user.svg' // Ícono de perfil
import logoutIcon from '@/app/images/user-logout.svg' // Ícono de logout
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@radix-ui/themes'

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
  const { data: session } = useSession();

  // Si no hay sesión, no mostrar sidebar
  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({
      callbackUrl: '/login',
      redirect: true
    });
  };

  return (
    <div className='h-full bg-gradient-to-b from-blue-50 to-white border-r border-gray-200 flex flex-col'>
      {/* Encabezado compacto */}
      <div className='p-3 border-b border-gray-200'>
        <h1 className='text-lg font-bold text-blue-800'>Dashboard</h1>
        <p className='text-xs text-gray-500'>Panel de administración</p>
      </div>
      
      {/* Navegación */}
      <nav className='py-2 flex-1'>
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
          );
        })}
      </nav>
      
      {/* SECCIÓN DE USUARIO (NUEVA) - Arriba del footer */}
      <div className='border-t border-gray-200 p-3'>
        <div className='flex items-center mb-2'>
          {/* Ícono de perfil */}
          <div className='mr-2 p-1 bg-gray-100 rounded-full'>
            <Image 
              src={userIcon}
              alt="Usuario"
              width={20}
              height={20}
              className='text-gray-600'
            />
          </div>
          
          {/* Nombre del usuario */}
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-gray-800 truncate'>
              {session.user?.name || 'Usuario'}
            </p>
            <p className='text-xs text-gray-500'>
              {session.user?.role || 'Administrador'}
            </p>
          </div>
        </div>
        {/* Botón de logout */}
        <Button
          onClick={handleLogout}
          variant="soft"
          color="red"
          className='w-full justify-start '
          size="2"

        >
          <Image 
            src={logoutIcon}
            alt="Cerrar sesión"
            width={16}
            height={16}
            className='mr-2'
          />
          Cerrar sesión
        </Button>
        
      </div>
      
      {/* Footer (manteniendo el original) */}
      <div className='border-t border-gray-200'>
        <div className='text-xs text-gray-500 text-center py-2'>
          v0.0.1
        </div>
      </div>
    </div>  
  );
};

export default Sidebar;