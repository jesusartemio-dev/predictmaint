import { useEffect, useState } from 'react'
import { useReadingStore } from '@/store/useReadingStore'
import { useAuthStore } from '@/store/useAuthStore'
import { X, Activity, Thermometer, Zap, Gauge, RefreshCw } from 'lucide-react'
import Swal from 'sweetalert2'

// Umbrales segun norma ISO 10816: >5 critico, >3 alerta, normal verde
const getVibrationColor = (v) => {
  if (v > 5) return 'text-red-400'
  if (v > 3) return 'text-yellow-400'
  return 'text-green-400'
}

const getTempColor = (t) => {
  if (t > 70) return 'text-red-400'
  if (t > 55) return 'text-yellow-400'
  return 'text-green-400'
}

export default function EquipmentDetailModal({ equipment, onClose }) {
  const { readings, isLoading, fetchReadingsByEquipment, createReading, clearReadings } = useReadingStore()
  const { user } = useAuthStore()

  const [vibration, setVibration] = useState('')
  const [temperature, setTemperature] = useState('')
  const [current, setCurrent] = useState('')
  const [rpm, setRpm] = useState('')
  const [observations, setObservations] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // clearReadings en el cleanup limpia el store al cerrar el modal
  useEffect(() => {
    fetchReadingsByEquipment(equipment.id)
    return () => clearReadings()
  }, [equipment.id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!vibration || !temperature) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'Vibracion y temperatura son requeridos' })
      return
    }

    setIsSubmitting(true)
    try {
      await createReading(equipment.id, {
        vibration: parseFloat(vibration),
        temperature: parseFloat(temperature),
        current: current ? parseFloat(current) : null,
        rpm: rpm ? parseFloat(rpm) : null,
        observations,
      })
      Swal.fire({ icon: 'success', title: 'Lectura registrada', timer: 1500, showConfirmButton: false })
      setVibration('')
      setTemperature('')
      setCurrent('')
      setRpm('')
      setObservations('')
      fetchReadingsByEquipment(equipment.id)
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo registrar la lectura' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleString('es-PE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      {/* evita que el click dentro del modal cierre el fondo oscuro */}
      <div className="bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div>
            <h2 className="text-white font-bold text-lg">{equipment.tagName}</h2>
            <p className="text-gray-400 text-xs">{equipment.description}</p>
          </div>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white" size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="text-blue-400" size={16} />
            <h3 className="text-white text-sm font-semibold">Ultimas Lecturas de Condicion</h3>
          </div>

          {isLoading ? (
            <div className="text-center text-gray-400 py-6">
              <RefreshCw className="animate-spin mx-auto mb-2" size={18} />
              <p className="text-xs">Cargando lecturas...</p>
            </div>
          ) : readings.length === 0 ? (
            <p className="text-gray-500 text-xs text-center py-4">No hay lecturas registradas</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="text-left py-2 px-2">Fecha</th>
                    <th className="text-right py-2 px-2">Vibracion</th>
                    <th className="text-right py-2 px-2">Temperatura</th>
                    <th className="text-right py-2 px-2">Corriente</th>
                    <th className="text-right py-2 px-2">RPM</th>
                    <th className="text-left py-2 px-2">Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {readings.map((r) => (
                    <tr key={r.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-2 px-2 text-gray-300">{formatDate(r.readingDate)}</td>
                      <td className={`py-2 px-2 text-right font-mono font-semibold ${getVibrationColor(r.vibration)}`}>
                        {r.vibration?.toFixed(1)} mm/s
                      </td>
                      <td className={`py-2 px-2 text-right font-mono font-semibold ${getTempColor(r.temperature)}`}>
                        {r.temperature?.toFixed(1)} °C
                      </td>
                      <td className="py-2 px-2 text-right text-gray-300 font-mono">
                        {r.current?.toFixed(1)} A
                      </td>
                      <td className="py-2 px-2 text-right text-gray-300 font-mono">
                        {r.rpm}
                      </td>
                      <td className="py-2 px-2 text-gray-400 max-w-[150px] truncate">
                        {r.observations || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* el formulario de nueva lectura solo aparece si hay sesion activa */}
        {(user?.role === 'ADMIN' || user?.role === 'TECNICO') && (
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <Gauge className="text-green-400" size={16} />
              <h3 className="text-white text-sm font-semibold">Registrar Nueva Lectura</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <label className="block text-gray-400 text-[10px] mb-1">Vibracion (mm/s) *</label>
                  <input
                    type="number" step="0.1" value={vibration}
                    onChange={e => setVibration(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-400 focus:outline-none"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-[10px] mb-1">Temperatura (°C) *</label>
                  <input
                    type="number" step="0.1" value={temperature}
                    onChange={e => setTemperature(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-400 focus:outline-none"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-[10px] mb-1">Corriente (A)</label>
                  <input
                    type="number" step="0.1" value={current}
                    onChange={e => setCurrent(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-400 focus:outline-none"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-[10px] mb-1">RPM</label>
                  <input
                    type="number" step="1" value={rpm}
                    onChange={e => setRpm(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-400 focus:outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-gray-400 text-[10px] mb-1">Observaciones</label>
                <textarea
                  value={observations}
                  onChange={e => setObservations(e.target.value)}
                  rows={2}
                  placeholder="Observaciones de la lectura..."
                  className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-400 focus:outline-none resize-none"
                />
              </div>
              <button
                type="submit" disabled={isSubmitting}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Registrando...' : 'Registrar Lectura'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
