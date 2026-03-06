import { create } from 'zustand'
import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const API = `${import.meta.env.VITE_API_URL || 'https://predictmaint-production.up.railway.app'}/api`

export const useWorkOrderStore = create((set, get) => ({
  workOrders: [],
  isLoading: false,
  error: null,

  fetchWorkOrders: async () => {
    set({ isLoading: true })
    try {
      const token = useAuthStore.getState().token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.get(API + '/workorders', config)
      set({ workOrders: response.data, isLoading: false })
    } catch (err) {
      set({ error: err.message, isLoading: false })
    }
  },

  fetchWorkOrdersByStatus: async (status) => {
    try {
      const token = useAuthStore.getState().token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.get(API + '/workorders/status/' + status, config)
      set({ workOrders: response.data })
    } catch (err) {
      set({ error: err.message })
    }
  },

  createWorkOrder: async (equipmentId, workOrderData) => {
    try {
      const token = useAuthStore.getState().token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      const response = await axios.post(API + '/workorders/equipment/' + equipmentId, workOrderData, config)
      // Refresca la tabla del AdminPanel automaticamente despues de crear
      await get().fetchWorkOrders()
      return response.data
    } catch (err) {
      set({ error: err.message })
    }
  },

  updateWorkOrderStatus: async (id, status) => {
    try {
      const token = useAuthStore.getState().token
      const config = { headers: { Authorization: `Bearer ${token}` } }
      // PATCH porque solo cambia el status, no el recurso completo. Body null, status va como query param
      const response = await axios.patch(API + '/workorders/' + id + '/status', null, { ...config, params: { status } })
      await get().fetchWorkOrders()
      return response.data
    } catch (err) {
      set({ error: err.message })
    }
  },
}))
