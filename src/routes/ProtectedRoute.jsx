// src/routes/ProtectedRoute.jsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import UnAuth from "../pages/UnAuth";

const ProtectedRoute = ({ children }) => {
  const { user, setRequireAuth } = useAuth();

  useEffect(() => {
    if (!user) {
      setRequireAuth(true); // 👈 trigger modal only for private route
    }
  }, [user]);

  // if (!user) return null;
  if (!user) return <UnAuth/>;
  return children;
};

export default ProtectedRoute;
