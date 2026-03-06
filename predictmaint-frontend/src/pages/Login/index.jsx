import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import Swal from 'sweetalert2'
import { Lock } from 'lucide-react'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(username, password)
    const { isAuthenticated, error } = useAuthStore.getState()
    if (isAuthenticated) {
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate('/dashboard'))
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Credenciales incorrectas',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <Lock className="text-blue-400 mx-auto mb-2" size={48} />
        <h1 className="text-white text-3xl font-bold text-center">PredictMaint</h1>
        <p className="text-gray-400 text-center mb-6">Sistema de Mantenimiento Predictivo</p>

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-300">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 mt-1 mb-4 border border-gray-600 focus:border-blue-400 focus:outline-none"
          />

          <label className="block text-gray-300">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 mt-1 mb-4 border border-gray-600 focus:border-blue-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="text-gray-500 text-sm text-center mt-4">
          Usuarios: admin / tecnico1 / tecnico2<br />
          Contraseña: 1234
        </p>
      </div>
    </div>
  )
}
