import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

// Fallback a Railway para desarrollo local sin .env
const API = `${import.meta.env.VITE_API_URL || 'https://predictmaint-production.up.railway.app'}/api`

export const useAuthStore = create(
  // persist: mantiene la sesion en localStorage para que sobreviva recargas de pagina
  persist(
    (set, get) => ({
      user: null,
      token: null, // JWT que se envia como header Authorization en cada peticion al backend
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null })
        try {
          const response = await axios.post(API + '/auth/login', { username, password })
          set({
            token: response.data.token,
            user: {
              username: response.data.username,
              role: response.data.role,
              name: response.data.name,
            },
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (err) {
          set({
            error: 'Credenciales incorrectas',
            isLoading: false,
            isAuthenticated: false,
          })
        }
      },

      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        error: null,
      }),

      hasRole: (role) => {
        const { user } = get()
        // ?. evita TypeError cuando user es null (no autenticado)
        return user?.role === role
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
