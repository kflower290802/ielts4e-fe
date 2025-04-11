import { useRoutes } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { adminPrivateRoutes, privateRoutes } from "./privateRoutes";
import { useAuthStore } from "@/store/auth";
export const RoutesComponent: React.FC = (): React.ReactElement | null => {
  const { isAuthenticated, role } = useAuthStore();
  const routes = (() => {
    if (!isAuthenticated) {
      return publicRoutes;
    }

    if (role === "admin") {
      return adminPrivateRoutes;
    }

    return privateRoutes;
  })();

  const element = useRoutes(routes);
  return element;
};
