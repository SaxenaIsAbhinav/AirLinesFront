import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ theme, toggleTheme }) => {
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-background text-foreground transition-colors duration-300"
        style={{
          backgroundImage: "url('/assets/bg.jpg')"
        }}
      >
        <div className="backdrop-blur-sm bg-white/70 dark:bg-black/70 min-h-screen rounded 2x1 shadow-md">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="px-4 py-8 min-h-[130vh] text-white">

            {/* (Example Title) */}
            <h1 className="text-4x1 font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text text-center"></h1>

            {/* Example Button */}
            {/* <div className="flex justify-center">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-2x1 transition duration-300">
              </button>
            </div> */}

            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;

