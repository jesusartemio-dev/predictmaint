import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Factory, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react'

export default function Navbar() {
  const { user, isAuthenticated, logout, hasRole } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gray-800/90 backdrop-blur-sm border-b border-gray-700/50 px-4 py-2 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-1.5 text-blue-400 font-bold text-base">
        <Factory size={18} />
        PredictMaint
      </Link>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-1 text-sm transition-colors">
              <LayoutDashboard size={15} />
              Dashboard
            </Link>

            {hasRole('ADMIN') && (
              <Link to="/panel-admin" className="text-gray-300 hover:text-white flex items-center gap-1 text-sm transition-colors">
                <ShieldCheck size={15} />
                Admin
              </Link>
            )}

            <span className="text-gray-500 text-xs">{user?.name}</span>

            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm transition-colors">
              <LogOut size={15} />
              Salir
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            Iniciar sesion
          </Link>
        )}
      </div>
    </nav>
  )
}
