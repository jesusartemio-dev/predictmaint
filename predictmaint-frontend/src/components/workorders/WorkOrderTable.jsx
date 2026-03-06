import { Wrench, CheckCircle, Clock, AlertTriangle, XCircle, ChevronDown } from 'lucide-react'

const priorityConfig = {
  ALTA: { color: 'text-red-400', bg: 'bg-red-900/30' },
  MEDIA: { color: 'text-yellow-400', bg: 'bg-yellow-900/30' },
  BAJA: { color: 'text-green-400', bg: 'bg-green-900/30' },
}

const statusConfig = {
  PENDIENTE: { color: 'text-yellow-400', icon: Clock },
  EN_PROGRESO: { color: 'text-blue-400', icon: Wrench },
  COMPLETADA: { color: 'text-green-400', icon: CheckCircle },
  CANCELADA: { color: 'text-red-400', icon: XCircle },
}

const orderTypeConfig = {
  PREVENTIVO: 'text-blue-300',
  CORRECTIVO: 'text-red-300',
  PREDICTIVO: 'text-purple-300',
}

// prop opcional: en false oculta la columna de acciones (vista solo lectura)
export default function WorkOrderTable({ workOrders, onUpdateStatus, showActions = true }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">OT#</th>
            <th className="px-4 py-3">Equipo</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Descripcion</th>
            <th className="px-4 py-3">Tecnico</th>
            <th className="px-4 py-3">Prioridad</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Fecha</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {workOrders.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center text-gray-400 py-8">
                No hay ordenes de trabajo
              </td>
            </tr>
          ) : (
            workOrders.map((workOrder) => {
              const priority = priorityConfig[workOrder.priority] || priorityConfig.MEDIA
              const status = statusConfig[workOrder.status] || statusConfig.PENDIENTE
              const StatusIcon = status.icon
              const typeColor = orderTypeConfig[workOrder.orderType] || 'text-gray-300'

              return (
                <tr key={workOrder.id} className="bg-gray-800 hover:bg-gray-700 transition-colors">
                  <td className="px-4 py-3 text-gray-400 font-mono">#{workOrder.id}</td>
                  <td className="px-4 py-3">
                    <p className="text-white font-semibold">{workOrder.equipment?.tagName}</p>
                    <p className="text-gray-400 text-xs">{workOrder.equipment?.area}</p>
                  </td>
                  <td className={`px-4 py-3 font-semibold ${typeColor}`}>
                    {workOrder.orderType}
                  </td>
                  <td className="px-4 py-3 text-gray-300 max-w-xs truncate">
                    {workOrder.description}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {workOrder.assignedTechnician}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priority.bg} ${priority.color}`}>
                      {workOrder.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className={`flex items-center gap-1 ${status.color}`}>
                      <StatusIcon size={14} />
                      {workOrder.status}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(workOrder.createdAt).toLocaleDateString('es-PE')}
                  </td>
                  <td className="px-4 py-3">
                    {showActions && workOrder.status !== 'COMPLETADA' && workOrder.status !== 'CANCELADA' ? (
                      <select
                        className="bg-gray-700 text-white text-xs rounded px-2 py-1 border border-gray-600"
                        defaultValue=""
                        // resetea el select a 'Cambiar...' despues de ejecutar la accion
                        onChange={(e) => {
                          if (e.target.value) {
                            onUpdateStatus && onUpdateStatus(workOrder.id, e.target.value)
                            e.target.value = ''
                          }
                        }}
                      >
                        <option value="" disabled>Cambiar...</option>
                        <option value="EN_PROGRESO">EN_PROGRESO</option>
                        <option value="COMPLETADA">COMPLETADA</option>
                        <option value="CANCELADA">CANCELADA</option>
                      </select>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}
