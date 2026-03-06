import { useEffect, useState } from 'react'
import { useWorkOrderStore } from '@/store/useWorkOrderStore'
import { useEquipmentStore } from '@/store/useEquipmentStore'
import WorkOrderTable from '@/components/workorders/WorkOrderTable'
import WorkOrderForm from '@/components/workorders/WorkOrderForm'
import { ClipboardList, Clock, Wrench, CheckCircle, RefreshCw, Plus } from 'lucide-react'
import Swal from 'sweetalert2'

export default function AdminPanel() {
  const { workOrders, isLoading, error, fetchWorkOrders, updateWorkOrderStatus } = useWorkOrderStore()
  const { equipment, fetchEquipment } = useEquipmentStore()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchWorkOrders()
    fetchEquipment()
  }, [])

  const total = workOrders.length
  const pendientes = workOrders.filter(w => w.status === 'PENDIENTE').length
  const enProgreso = workOrders.filter(w => w.status === 'EN_PROGRESO').length
  const completadas = workOrders.filter(w => w.status === 'COMPLETADA').length

  const handleUpdateStatus = async (id, status) => {
    const result = await Swal.fire({
      title: 'Actualizar estado?',
      text: 'Se cambiara el estado de la orden',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3b82f6',
    })

    if (result.isConfirmed) {
      try {
        await updateWorkOrderStatus(id, status)
        Swal.fire({
          title: 'Estado actualizado',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        })
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el estado',
          icon: 'error',
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Panel Administrador</h1>
          <p className="text-gray-400 text-sm">Gestion de Ordenes de Trabajo</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={16} />
            Nueva OT
          </button>
          <button
            onClick={fetchWorkOrders}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={16} />
            Actualizar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 rounded-xl p-4">
          <ClipboardList className="text-blue-400 mb-2" size={24} />
          <p className="text-white text-3xl font-bold">{total}</p>
          <p className="text-gray-400 text-sm">Total OTs</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <Clock className="text-yellow-400 mb-2" size={24} />
          <p className="text-yellow-400 text-3xl font-bold">{pendientes}</p>
          <p className="text-gray-400 text-sm">Pendientes</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <Wrench className="text-blue-400 mb-2" size={24} />
          <p className="text-blue-400 text-3xl font-bold">{enProgreso}</p>
          <p className="text-gray-400 text-sm">En Progreso</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4">
          <CheckCircle className="text-green-400 mb-2" size={24} />
          <p className="text-green-400 text-3xl font-bold">{completadas}</p>
          <p className="text-gray-400 text-sm">Completadas</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-white text-xl font-semibold mb-4">Ordenes de Trabajo</h2>

        {isLoading && (
          <div className="text-center text-gray-400 py-12">
            <RefreshCw className="animate-spin mx-auto mb-2" size={24} />
            Cargando...
          </div>
        )}

        {error && (
          <div className="text-red-400 text-center py-8">
            Error al cargar ordenes: {error}
          </div>
        )}

        {!isLoading && (
          <WorkOrderTable
            workOrders={workOrders}
            onUpdateStatus={handleUpdateStatus}
            showActions={true}
          />
        )}
      </div>

      {showForm && (
        <WorkOrderForm onClose={() => setShowForm(false)} />
      )}
    </div>
  )
}
