'use client'
import home from '@/app/images/home.svg'
import clipboard from '@/app/images/clipboard-list.svg'
import users from '@/app/images/users.svg'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

// Definir el tipo para los iconos
const ICONS: Record<string, StaticImageData> = {
  home,
  clipboard,
  users
};

// Definir la interfaz para los items del sidebar
interface SidebarItem {
  name: string;
  href: string;
  icon: keyof typeof ICONS; // 'home' | 'clipboard' | 'users'
}

const Sidebar = () => {
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const pathname = usePathname();
  
  useEffect(() => {
    fetch("/data/data.json")
      .then((res) => res.json())
      .then((data) => setSidebarItems(data.sidebarItems))
      .catch((error) => console.error('Error loading sidebar items:', error));
  }, []);

  return (
    <div className='relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 w-64'>
      <div className='h-full bg-[#ecf7ff] backdrop-blur-md p-4 flex flex-col border-r border-[#ffffff]'>
        <nav className='mt-8 flex-grow'>
          {sidebarItems.map((item) => {
            const iconSrc = ICONS[item.icon];
            return (
              <Link key={item.name} href={item.href}>
                <div 
                  className={`flex items-center p-4 text-sm font-medium rounded-lg hover:bg-[#ffffff] transition-colors mb-2 
                    ${pathname === item.href ? "bg-[#ffffff] text-black" : "text-black/70"}`}
                >
                  <Image 
                    src={iconSrc} 
                    alt={item.name}
                    width={20}
                    height={20}
                    className='mr-3'
                  />
                  <span>{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>  
  )
}

export default Sidebar