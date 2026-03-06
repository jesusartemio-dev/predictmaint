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
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-blue-400 font-bold text-xl">
        <Factory size={24} />
        PredictMaint
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-1">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            {hasRole('ADMIN') && (
              <Link to="/panel-admin" className="text-gray-300 hover:text-white flex items-center gap-1">
                <ShieldCheck size={18} />
                Admin
              </Link>
            )}

            <span className="text-gray-400 text-sm">{user?.name}</span>

            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-1">
              <LogOut size={18} />
              Salir
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Iniciar sesion
          </Link>
        )}
      </div>
    </nav>
  )
}
