'use client'

import "@radix-ui/themes/styles.css";
import classnames from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import xinyaLogo from './images/xinya-logo.png'
import { usePathname } from 'next/navigation'

const NavBar = () =>{
    const currentPath = usePathname();
    const links = [
        { label: 'Login', href: './login'}
    ]

  return (
    <nav className='flex space-x-8 border-b shadow-2xs border-zinc-300 mb-10 px-7 h-14 items-center bg bg-blend-color' style={{background:'#F9F9F9', color:'#F9F9F9'}}>
        <Link href="./"> <Image src={xinyaLogo} alt='logo' width={120} height={40}/> </Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
            <Link 
                key={link.href} 
                className={ classnames ({
                    'text-zinc-500' : link.href === currentPath,
                    '#F9F9F9' : link.href !==  currentPath,
                    'hover:#F9F9F9 transition-colors': true   
                })} 
                href={link.href}>{link.label}
            </Link>)}
        </ul>   
    </nav>
)

}

export default NavBar