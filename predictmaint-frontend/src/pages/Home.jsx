import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import { Factory, Activity, Wrench, Shield, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  return (
    <div className="min-h-screen bg-gray-900">

      {/* HERO */}
      <section className="py-20 px-6 text-center">
        <span className="bg-blue-900/50 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-medium">
          Scada Sistema Industrial IoT
        </span>

        <h1 className="text-5xl font-bold text-white leading-tight mt-6">
          Mantenimiento <span className="text-blue-400">Predictivo</span> Industrial
        </h1>

        <p className="text-gray-400 text-xl max-w-2xl mx-auto mt-4">
          Monitorea el estado de tus equipos en tiempo real.
          Previene fallas antes de que ocurran.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => isAuthenticated ? navigate('/dashboard') : navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
          >
            {isAuthenticated ? 'Ir al Dashboard' : 'Iniciar Sesion'}
            <ArrowRight size={18} />
          </button>

          {isAuthenticated && (
            <button
              onClick={() => navigate('/panel-admin')}
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              Panel Admin
              <Shield size={18} />
            </button>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-800 py-12 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <Activity className="text-blue-400 mx-auto mb-2" size={32} />
            <p className="text-4xl font-bold text-white">10+</p>
            <p className="text-gray-400">Equipos Monitoreados</p>
          </div>
          <div className="text-center">
            <Wrench className="text-yellow-400 mx-auto mb-2" size={32} />
            <p className="text-4xl font-bold text-white">3</p>
            <p className="text-gray-400">Tipos de Alertas</p>
          </div>
          <div className="text-center">
            <Shield className="text-green-400 mx-auto mb-2" size={32} />
            <p className="text-4xl font-bold text-white">24/7</p>
            <p className="text-gray-400">Monitoreo Continuo</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6">
        <h2 className="text-center text-white text-3xl font-bold mb-12">
          Por que PredictMaint?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-6">
            <Activity className="text-blue-400 mb-4" size={32} />
            <h3 className="text-white font-bold text-lg">Monitoreo en Tiempo Real</h3>
            <p className="text-gray-400 text-sm mt-2">
              Visualiza vibracion, temperatura y corriente
              de cada equipo desde cualquier dispositivo.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <Wrench className="text-yellow-400 mb-4" size={32} />
            <h3 className="text-white font-bold text-lg">Gestion de Ordenes de Trabajo</h3>
            <p className="text-gray-400 text-sm mt-2">
              Crea y gestiona ordenes preventivas, correctivas
              y predictivas con seguimiento en tiempo real.
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <Shield className="text-green-400 mb-4" size={32} />
            <h3 className="text-white font-bold text-lg">Alertas Automaticas ISO 10816</h3>
            <p className="text-gray-400 text-sm mt-2">
              El sistema evalua umbrales norma ISO 10816
              y actualiza el estado del equipo automaticamente.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 py-6 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2025 PredictMaint — Sistema de Mantenimiento Predictivo Industrial
        </p>
      </footer>
    </div>
  )
}
