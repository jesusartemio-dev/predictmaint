import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useEquipmentStore } from '@/store/useEquipmentStore'
import EquipmentCard from '@/components/equipment/EquipmentCard'
import { Activity, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { equipment, isLoading, error, fetchEquipment, setSelectedEquipment } = useEquipmentStore()

  useEffect(() => {
    fetchEquipment()
  }, [])

  const total = equipment.length
  const operativos = equipment.filter(e => e.status === 'OPERATIVO').length
  const alertas = equipment.filter(e => e.status === 'ALERTA').length
  const fallas = equipment.filter(e => e.status === 'FALLA').length

  const handleCardClick = (equip) => {
    setSelectedEquipment(equip)
    console.log(equip)
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Dashboard Tecnico</h1>
          <p className="text-gray-400 text-sm">Bienvenido, {user?.name}</p>
        </div>
        <button
          onClick={fetchEquipment}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <RefreshCw size={16} />
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <Activity className="text-blue-400 mb-2" size={24} />
          <p className="text-white text-3xl font-bold">{total}</p>
          <p className="text-gray-400 text-sm">Total Equipos</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <CheckCircle className="text-green-400 mb-2" size={24} />
          <p className="text-green-400 text-3xl font-bold">{operativos}</p>
          <p className="text-gray-400 text-sm">Operativos</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <AlertTriangle className="text-yellow-400 mb-2" size={24} />
          <p className="text-yellow-400 text-3xl font-bold">{alertas}</p>
          <p className="text-gray-400 text-sm">En Alerta</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <XCircle className="text-red-400 mb-2" size={24} />
          <p className="text-red-400 text-3xl font-bold">{fallas}</p>
          <p className="text-gray-400 text-sm">En Falla</p>
        </div>
      </div>

      <h2 className="text-white text-xl font-semibold mb-4">Estado de Equipos</h2>

      {isLoading && (
        <div className="text-center text-gray-400 py-12">
          <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
          Cargando equipos...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 py-12">
          Error al cargar equipos: {error}
        </div>
      )}

      {!isLoading && equipment.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {equipment.map((equip) => (
            <EquipmentCard
              key={equip.id}
              equipment={equip}
              onClick={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
