import {
  CheckCircle, AlertTriangle, XCircle, Wrench,
  Zap, Wind, Droplets, ArrowRightLeft, Settings,
  MapPin, Clock
} from 'lucide-react'

const statusConfig = {
  OPERATIVO: {
    color: 'green',
    bg: 'bg-green-900/30',
    border: 'border-green-500',
    badge: 'bg-green-500',
    icon: CheckCircle,
  },
  ALERTA: {
    color: 'yellow',
    bg: 'bg-yellow-900/30',
    border: 'border-yellow-500',
    badge: 'bg-yellow-500',
    icon: AlertTriangle,
  },
  FALLA: {
    color: 'red',
    bg: 'bg-red-900/30',
    border: 'border-red-500',
    badge: 'bg-red-500',
    icon: XCircle,
  },
  MANTENIMIENTO: {
    color: 'blue',
    bg: 'bg-blue-900/30',
    border: 'border-blue-500',
    badge: 'bg-blue-500',
    icon: Wrench,
  },
}

const equipmentTypeIcon = {
  MOTOR: Zap,
  COMPRESOR: Wind,
  BOMBA: Droplets,
  FAJA: ArrowRightLeft,
  VALVULA: Settings,
}

export default function EquipmentCard({ equipment, onClick }) {
  const config = statusConfig[equipment.status] || statusConfig.OPERATIVO
  const StatusIcon = config.icon
  const TypeIcon = equipmentTypeIcon[equipment.equipmentType] || Settings

  return (
    <div
      className={`rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${config.bg} ${config.border}`}
      onClick={() => onClick && onClick(equipment)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TypeIcon className={`text-${config.color}-400`} size={20} />
          <span className="font-bold text-white text-lg">{equipment.tagName}</span>
        </div>
        <span className={`${config.badge} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
          {equipment.status}
        </span>
      </div>

      <p className="text-gray-400 text-sm mt-1 truncate">{equipment.description}</p>

      <div className="flex items-center gap-1 mt-2">
        <MapPin size={12} className="text-gray-500" />
        <span className="text-gray-500 text-xs">{equipment.area}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-700">
        <div className="flex items-center gap-1">
          <Clock size={12} className="text-gray-500" />
          <div>
            <p className="text-white text-sm">{equipment.operatingHours}h</p>
            <p className="text-gray-500 text-xs">Horas op.</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TypeIcon size={12} className="text-gray-500" />
          <div>
            <p className="text-white text-sm">{equipment.equipmentType}</p>
            <p className="text-gray-500 text-xs">Tipo</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-3">
        <StatusIcon size={16} className={`text-${config.color}-400`} />
      </div>
    </div>
  )
}
