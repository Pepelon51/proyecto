import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className="min-h-screen grid" style={{
      gridTemplateColumns: '16rem 1fr',
      gridTemplateRows: 'auto 1fr'
    }}>
      {/* Sidebar - ocupa 2 filas */}
      <div style={{ gridArea: '1 / 1 / 3 / 2' }} className="border-r border-gray-200">
        <Sidebar />
      </div>
      
      {/* Header */}
      <div style={{ gridArea: '1 / 2 / 2 / 3' }} className="px-4 py-3">
        <Header />
      </div>
      
      {/* Contenido */}
      <div style={{ gridArea: '2 / 2 / 3 / 3' }} className="p-4 bg-gray-50 overflow-auto">
        {/* Tu contenido */}
      </div>
    </div>
  )
}

export default Dashboard