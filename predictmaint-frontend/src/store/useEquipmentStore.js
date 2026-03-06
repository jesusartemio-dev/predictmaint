import { create } from 'zustand'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const API = `${import.meta.env.VITE_API_URL || 'https://predictmaint-production.up.railway.app'}/api`

export const useEquipmentStore = create((set) => ({
  equipment: [],
  selectedEquipment: null,
  isLoading: false,
  error: null,

  fetchEquipment: async () => {
    set({ isLoading: true })
    try {
      // getState() accede al token del authStore sin depender de props de React
      const token = useAuthStore.getState().token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.get(API + '/equipment', config)
      set({ equipment: response.data, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  fetchEquipmentByStatus: async (status) => {
    try {
      const token = useAuthStore.getState().token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.get(API + '/equipment/status/' + status, config)
      set({ equipment: response.data })
    } catch (err) {
      set({ error: err.message })
    }
  },

  setSelectedEquipment: (equip) => set({ selectedEquipment: equip }),

  clearError: () => set({ error: null }),
}))
