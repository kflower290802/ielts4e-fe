import { getStorage } from '@/utils/storage'
import { create } from 'zustand'
interface AuthState {
  isAuthenticated: boolean
  role: string
  setAuthStatus: (auth: { isAuthenticated: boolean; role: string }) => void
}
export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!getStorage('token'),
    role: getStorage('role') || 'Learner',
    setAuthStatus: (auth: { isAuthenticated: boolean; role: string }) => set({
      isAuthenticated: auth.isAuthenticated,
      role: auth.role,
    }),
  }))
  