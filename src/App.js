// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Flights from "./pages/Flights";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import Passenger from "./pages/Passenger";
import AuthModal from "./components/AuthModal";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import ProfilePage from './components/profile/ProfilePage';
import Ticket from './components/profile/Ticket';
import UserForm from './components/profile/UserForm';
import PnrInputPage from './components/profile/PnrInputPage';

const App = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <AuthProvider>
      <Router>
        <Routes>

          <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
            <Route index element={<Home />} />


            <Route path="flights" element={<Flights />} />
            <Route path="contact" element={<Contact />} />
            <Route path="support" element={<Support />} />

            {/*  */}
            <Route path="register" element={<UserForm />} />
            <Route path="profile" element={<ProfilePage />} />
        <Route path="ticket/pnr" element={<Ticket />} />
        <Route path="pnr" element={<PnrInputPage />} />
        {/*  */}
            <Route
              path="passenger"
              element={
                <ProtectedRoute>
                  <Passenger />
                </ProtectedRoute>
              }
            />
            <Route
              path="payment"
              element={
                <ProtectedRoute>
                  <Payment />
                </ProtectedRoute>
              }
            />
            <Route
              path="success"
              element={
                <ProtectedRoute>
                  <Success />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <AuthModal />
      </Router>
    </AuthProvider>
  );
};

export default App;

