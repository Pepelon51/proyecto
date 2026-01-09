'use client'
import admin from '@/app/images/user.svg'
import { Button, Text } from '@radix-ui/themes'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'



const handleLogout = async () => {
  await signOut({
    callbackUrl: '/login', // Redirige aquí después del logout
    redirect: true
  })
}


const Header = () => {
  const { data: session } = useSession();
  const currentUserName = session?.user?.name;
  return (
    
    <header className='bg-[#ebeefe] shadow-2xl  border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 mt-2 mb-2 rounded-lg'>
      <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 flex item-center justify-between'>
        <h1 className='text-lg sm:text-xl lg:text-2xl font-semibold'>
          Dashboard
        </h1>
        <div className='flex items-center space-x-3 sm:space-x-6'>
                    <div>
            <Text size={'1'}>{currentUserName}</Text>
          </div>
          <div className='flex items-center space-x-2 sm:space-x-3'>
            <Image src={admin} alt="admin" width={20} height={20}></Image>
          </div>
          <div className='flex items-center space-x-3 sm:space-x-6'>
            <Button onClick={handleLogout} variant="outline">Salir</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
