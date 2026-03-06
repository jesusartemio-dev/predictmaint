import {
  CheckCircle, AlertTriangle, XCircle, Wrench,
  Zap, Wind, Droplets, ArrowRightLeft, Settings,
  MapPin, Clock
} from 'lucide-react'

const statusConfig = {
  OPERATIVO: {
    color: 'green',
    bg: 'bg-green-900/20',
    border: 'border-green-500/40',
    badge: 'bg-green-500',
    icon: CheckCircle,
  },
  ALERTA: {
    color: 'yellow',
    bg: 'bg-yellow-900/20',
    border: 'border-yellow-500/40',
    badge: 'bg-yellow-500',
    icon: AlertTriangle,
  },
  FALLA: {
    color: 'red',
    bg: 'bg-red-900/20',
    border: 'border-red-500/40',
    badge: 'bg-red-500',
    icon: XCircle,
  },
  MANTENIMIENTO: {
    color: 'blue',
    bg: 'bg-blue-900/20',
    border: 'border-blue-500/40',
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
      className={`rounded-lg border p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:border-gray-500 hover:shadow-lg ${config.bg} ${config.border}`}
      onClick={() => onClick && onClick(equipment)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <TypeIcon className={`text-${config.color}-400`} size={14} />
          <span className="font-bold text-white text-sm">{equipment.tagName}</span>
        </div>
        <span className={`${config.badge} text-white text-[10px] px-2 py-0.5 rounded-full font-semibold`}>
          {equipment.status}
        </span>
      </div>

      <p className="text-gray-400 text-xs mt-1 truncate">{equipment.description}</p>

      <div className="flex items-center gap-1 mt-1.5">
        <MapPin size={10} className="text-gray-500" />
        <span className="text-gray-500 text-[10px]">{equipment.area}</span>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-gray-700/50">
        <div className="flex items-center gap-1">
          <Clock size={10} className="text-gray-500" />
          <div>
            <p className="text-white text-xs">{equipment.operatingHours}h</p>
            <p className="text-gray-500 text-[10px]">Horas op.</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <TypeIcon size={10} className="text-gray-500" />
          <div>
            <p className="text-white text-xs">{equipment.equipmentType}</p>
            <p className="text-gray-500 text-[10px]">Tipo</p>
          </div>
        </div>
      </div>
    </div>
  )
}
