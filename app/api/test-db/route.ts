import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Intenta hacer una consulta simple a la base de datos
    await prisma.$connect()
    
    // Puedes hacer una consulta real si tienes alguna tabla
    // Por ejemplo: const users = await prisma.user.findMany()
    
    console.log('✅ Conexión a la base de datos exitosa!')
    
    return NextResponse.json({
      success: true,
      message: '¡Conexión a la base de datos exitosa!',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('❌ Error de conexión a la base de datos:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Error al conectar con la base de datos',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}