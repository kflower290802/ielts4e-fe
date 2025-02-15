import { getStorage } from '@/utils/storage'
import { create } from 'zustand'
interface AuthState {
  isAuthenticated: boolean
  setAuthStatus: (status: boolean) => void
}
export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: !!getStorage('token'),
    setAuthStatus: (status: boolean) => set({ isAuthenticated: status }),
  }))
  