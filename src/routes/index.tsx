import { useRoutes } from 'react-router-dom'
import { publicRoutes } from './publicRoutes'
import { privateRoutes } from './privateRoutes'
import { useAuthStore } from '@/store/auth'
export const RoutesComponent: React.FC = (): React.ReactElement | null => {
  const { isAuthenticated } = useAuthStore()
  const routes = isAuthenticated ? privateRoutes : publicRoutes

  const element = useRoutes(routes)
  return element
}
