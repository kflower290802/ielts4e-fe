import { authRoutes, Route } from "@/constant/route";
import { useAuthStore } from "@/store/auth";
import React, { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useMemo } from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
// import { useAuthStore } from '@/store/auth'
// import { authRoutes, Route } from '@/constant/route'

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const { isAuthenticated } = useAuthStore();
  
  const location = useLocation();

  const pathName = useMemo(() => {
    return location.pathname;
  }, [location]);
  const privatePath = Object.values(Route).filter(
    (route) => route !== Route.Home && !authRoutes.includes(route)
  );

  if (isAuthenticated && authRoutes.some((route) => pathName === route)) {
    return <Navigate to={Route.Home} />;
  }
  if (!isAuthenticated && privatePath.some((route) => pathName === route)) {
    return <Navigate to={Route.Login} />;
  }
  return <>{children}</>;
};

export default AuthMiddleware;
