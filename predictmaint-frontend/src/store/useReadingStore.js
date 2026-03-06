import { create } from 'zustand'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const API = `${import.meta.env.VITE_API_URL || 'https://predictmaint-production.up.railway.app'}/api`

export const useReadingStore = create((set) => ({
  readings: [],
  isLoading: false,
  error: null,

  fetchReadingsByEquipment: async (equipmentId) => {
    set({ isLoading: true, error: null })
    try {
      const token = useAuthStore.getState().token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      // /last trae solo las ultimas 10 lecturas, suficiente para evaluar condicion actual
      const response = await axios.get(API + '/readings/equipment/' + equipmentId + '/last', config)
      set({ readings: response.data, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  createReading: async (equipmentId, readingData) => {
    const token = useAuthStore.getState().token
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.post(API + '/readings/equipment/' + equipmentId, readingData, config)
    // No refresca aqui: el modal llama fetchReadingsByEquipment despues de crear
    return response.data
  },

  // Limpia al cerrar modal para no mostrar lecturas del equipo anterior al abrir otro
  clearReadings: () => set({ readings: [], error: null }),
}))
