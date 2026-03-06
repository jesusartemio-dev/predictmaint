import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useEquipmentStore } from '@/store/useEquipmentStore'
import KpiCard from '@/components/dashboard/KpiCard'
import EquipmentCard from '@/components/equipment/EquipmentCard'
import EquipmentDetailModal from '@/components/equipment/EquipmentDetailModal'
import { Activity, CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react'

export default function Dashboard() {
  const { user } = useAuthStore()
  const { equipment, isLoading, error, fetchEquipment } = useEquipmentStore()
  const [selectedEquipment, setSelectedEquipment] = useState(null)

  useEffect(() => {
    fetchEquipment()
  }, [])

  const total = equipment.length
  const operativos = equipment.filter(e => e.status === 'OPERATIVO').length
  const alertas = equipment.filter(e => e.status === 'ALERTA').length
  const fallas = equipment.filter(e => e.status === 'FALLA').length

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
        <KpiCard icon={Activity} label="Total Equipos" value={total} color="blue" />
        <KpiCard icon={CheckCircle} label="Operativos" value={operativos} color="green" />
        <KpiCard icon={AlertTriangle} label="En Alerta" value={alertas} color="yellow" />
        <KpiCard icon={XCircle} label="En Falla" value={fallas} color="red" />
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
              onClick={setSelectedEquipment}
            />
          ))}
        </div>
      )}

      {selectedEquipment && (
        <EquipmentDetailModal
          equipment={selectedEquipment}
          onClose={() => setSelectedEquipment(null)}
        />
      )}
    </div>
  )
}
