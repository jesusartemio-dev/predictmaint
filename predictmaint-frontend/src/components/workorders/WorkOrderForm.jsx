import { useState } from 'react'
import { useWorkOrderStore } from '@/store/useWorkOrderStore'
import { useEquipmentStore } from '@/store/useEquipmentStore'
import { X, ClipboardList } from 'lucide-react'
import Swal from 'sweetalert2'

export default function WorkOrderForm({ onClose }) {
  const { createWorkOrder } = useWorkOrderStore()
  const { equipment } = useEquipmentStore()

  const [equipmentId, setEquipmentId] = useState('')
  const [orderType, setOrderType] = useState('PREVENTIVO')
  const [priority, setPriority] = useState('MEDIA')
  const [description, setDescription] = useState('')
  const [assignedTechnician, setAssignedTechnician] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!equipmentId || !description) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Complete los campos requeridos',
      })
      return
    }

    setIsSubmitting(true)
    try {
      await createWorkOrder(equipmentId, {
        orderType,
        priority,
        description,
        assignedTechnician,
      })
      Swal.fire({
        icon: 'success',
        title: 'Orden creada',
        text: 'La orden de trabajo fue registrada',
        timer: 1500,
        showConfirmButton: false,
      })
      onClose()
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear la orden',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <ClipboardList className="text-blue-400" size={24} />
            <h2 className="text-white font-bold text-xl">Nueva Orden de Trabajo</h2>
          </div>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-300 text-sm">Equipo *</label>
          <select
            value={equipmentId}
            onChange={(e) => setEquipmentId(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 mt-1 mb-4 border border-gray-600 focus:border-blue-400 focus:outline-none"
          >
            <option value="" disabled>Selecciona un equipo</option>
            {equipment.map((e) => (
              <option key={e.id} value={e.id}>
                {e.tagName} — {e.description}
              </option>
            ))}
          </select>

          <label className="block text-gray-300 text-sm">Tipo de Mantenimiento</label>
          <select
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 mt-1 mb-4 border border-gray-600 focus:border-blue-400 focus:outline-none"
          >
            <option value="PREVENTIVO">Preventivo</option>
            <option value="CORRECTIVO">Correctivo</option>
            <option value="PREDICTIVO">Predictivo</option>
          </select>

          <label className="block text-gray-300 text-sm">Prioridad</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 mt-1 mb-4 border border-gray-600 focus:border-blue-400 focus:outline-none"
          >
            <option value="ALTA">Alta</option>
            <option value="MEDIA">Media</option>
            <option value="BAJA">Baja</option>
          </select>

          <label className="block text-gray-300 text-sm">Descripcion *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Describe el trabajo a realizar..."
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 mt-1 mb-4 border border-gray-600 focus:border-blue-400 focus:outline-none resize-none"
          />

          <label className="block text-gray-300 text-sm">Tecnico Asignado</label>
          <input
            type="text"
            value={assignedTechnician}
            onChange={(e) => setAssignedTechnician(e.target.value)}
            placeholder="Nombre del tecnico"
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 mt-1 mb-4 border border-gray-600 focus:border-blue-400 focus:outline-none"
          />

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Creando...' : 'Crear Orden'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
