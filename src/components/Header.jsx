// src/components/Header.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, MenuItem, IconButton, Tooltip, Avatar, Switch } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header = ({ theme, toggleTheme }) => {
  const { user, logout, setRequireAuth, setRedirectTo } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMenuClick = (path) => {
    handleMenuClose();
    if (path === "/logout") {
      logout();
      setRequireAuth(true);
      setRedirectTo("/");
    } else {
      navigate(path);
    }
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow-md dark:bg-gray-900 dark:text-white bg-white">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          SkyEase
        </Link>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Flights</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/support" className="hover:underline">Support</Link>
          <Link to="/pnr" className="hover:underline">CheckYourPnr</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Brightness4 className="text-gray-500 dark:text-gray-300" />
          <Switch checked={theme === "dark"} onChange={toggleTheme} color="default" />
          <Brightness7 className="text-gray-500 dark:text-gray-300" />
        </div>

        {!user ? (
          <button
            onClick={() => setRequireAuth(true)}
            className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
          >
            Login
          </button>
        ) : (
          <>
            <Tooltip title="Account settings">
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt={user?.username || "User"} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuClick("/profile")}>Profile</MenuItem>
              <MenuItem onClick={() => handleMenuClick("/account")}>Account</MenuItem>
              <MenuItem onClick={() => handleMenuClick("/dashboard")}>Dashboard</MenuItem>
              <MenuItem onClick={() => handleMenuClick("/logout")}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
