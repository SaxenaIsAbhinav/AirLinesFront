// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [requireAuth, setRequireAuth] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
        }
      } catch (e) {
        logout();
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setRequireAuth(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setRequireAuth(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        requireAuth,
        setRequireAuth,
        redirectTo,
        setRedirectTo,passengerDetails, setPassengerDetails,registeredUser, setRegisteredUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
