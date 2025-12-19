'use client'
import { Box, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import animationData from './animations/mantenimiento.json'
import Lottie from 'lottie-react'

const TicketsPage = () => {
  return (
    <div className="max-w-l" style={{
      display: "flex", 
      alignItems:"center", 
      justifyContent:"center", 
      minHeight: "calc(80vh - 120px)" // Resta la altura del navbar (ajusta según tu navbar)
    }}>
      <Box className="shadow-2xl" style={{
        background: "white", 
        borderRadius: "var(--radius-5)",
        padding: "40px"
      }}>
        <Flex direction="column" gap="3" align="center">
          <Lottie 
            animationData={animationData} 
            loop={true} 
            autoplay={true} 
            style={{width:'200px', height: '200px'}}
          />
          <Link href="./newReport">
            <Button size="4" style={{width: '250px'}}>Generar ticket</Button>
          </Link>
          <Link href="./viewReport">
            <Button size="4" style={{width: '250px'}}>Consultar ticket</Button>
          </Link>
        </Flex>
      </Box>
    </div>
  )
}

export default TicketsPage