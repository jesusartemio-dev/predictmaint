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
    <div className="min-h-screen bg-gray-900 px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-white text-xl font-bold">Dashboard Tecnico</h1>
          <p className="text-gray-500 text-xs">Bienvenido, {user?.name}</p>
        </div>
        <button
          onClick={fetchEquipment}
          className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm px-3 py-1.5 rounded-lg border border-gray-700 transition-all"
        >
          <RefreshCw size={14} />
          Actualizar
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 border-l-4 border-l-blue-500">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="text-blue-400" size={16} />
            <p className="text-gray-400 text-xs">Total Equipos</p>
          </div>
          <p className="text-white text-3xl font-bold">{total}</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 border-l-4 border-l-green-500">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle className="text-green-400" size={16} />
            <p className="text-gray-400 text-xs">Operativos</p>
          </div>
          <p className="text-green-400 text-3xl font-bold">{operativos}</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 border-l-4 border-l-yellow-500">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="text-yellow-400" size={16} />
            <p className="text-gray-400 text-xs">En Alerta</p>
          </div>
          <p className="text-yellow-400 text-3xl font-bold">{alertas}</p>
        </div>
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 border-l-4 border-l-red-500">
          <div className="flex items-center gap-2 mb-1">
            <XCircle className="text-red-400" size={16} />
            <p className="text-gray-400 text-xs">En Falla</p>
          </div>
          <p className="text-red-400 text-3xl font-bold">{fallas}</p>
        </div>
      </div>

      <h2 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider text-gray-400">Estado de Equipos</h2>

      {isLoading && (
        <div className="text-center text-gray-400 py-8">
          <RefreshCw className="animate-spin mx-auto mb-2" size={20} />
          <p className="text-sm">Cargando equipos...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 py-8 text-sm">
          Error al cargar equipos: {error}
        </div>
      )}

      {!isLoading && equipment.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
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
