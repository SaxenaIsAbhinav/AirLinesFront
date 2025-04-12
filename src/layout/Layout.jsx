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
        <div className="backdrop-blur-sm bg-white/70 dark:bg-black/50 min-h-screen">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <main className="px-4 py-8 min-h-[130vh]">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;


// import React from "react";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { Outlet } from "react-router-dom";

// const Layout = ({ theme, toggleTheme }) => {
//   return (
//     <div className={theme === "dark" ? "dark" : ""}>
//       <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
//         <Header theme={theme} toggleTheme={toggleTheme} />
//         <main className="px-4 py-8">
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Layout;


// import Header from "../components/Header";
// import Footer from "../components/Footer";

// const Layout = ({ children }) => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow p-4">{children}</main>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;
