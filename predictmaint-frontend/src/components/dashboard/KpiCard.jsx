const colorMap = {
  blue: { border: 'border-l-blue-500', text: 'text-blue-400' },
  green: { border: 'border-l-green-500', text: 'text-green-400' },
  yellow: { border: 'border-l-yellow-500', text: 'text-yellow-400' },
  red: { border: 'border-l-red-500', text: 'text-red-400' },
}

export default function KpiCard({ icon: Icon, label, value, color }) {
  const colors = colorMap[color] || colorMap.blue

  return (
    <div className={`bg-gray-800/50 border border-gray-700/50 rounded-xl p-3 border-l-4 ${colors.border}`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={colors.text} size={16} />
        <p className="text-gray-400 text-xs">{label}</p>
      </div>
      <p className={`${color === 'blue' ? 'text-white' : colors.text} text-3xl font-bold`}>{value}</p>
    </div>
  )
}
