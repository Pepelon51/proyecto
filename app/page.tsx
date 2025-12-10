'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [dbStatus, setDbStatus] = useState<{
    success: boolean
    message: string
    timestamp?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await fetch('/api/test-db')
        const data = await response.json()
        setDbStatus(data)
        
        // También mostrarlo en consola
        if (data.success) {
          console.log('✅', data.message)
        } else {
          console.error('❌', data.message)
        }
      } catch (error) {
        console.error('❌ Error al probar conexión:', error)
        setDbStatus({
          success: false,
          message: 'Error al probar la conexión'
        })
      } finally {
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Estado de Conexión con Prisma
        </h1>
        
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-2 text-gray-600">Probando conexión...</p>
          </div>
        ) : (
          <div className={`p-4 rounded-lg ${
            dbStatus?.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {dbStatus?.success ? '✅' : '❌'}
              </span>
              <div>
                <p className={`font-semibold ${
                  dbStatus?.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {dbStatus?.message}
                </p>
                {dbStatus?.timestamp && (
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(dbStatus.timestamp).toLocaleString('es-MX')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Revisa la consola del navegador y del servidor para más detalles</p>
        </div>
      </div>
    </div>
  )
}