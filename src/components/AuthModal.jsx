import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { TESTING_MODE, mockLogin } from "../testing";

const AuthModal = () => {
  const {
    user,
    login,
    requireAuth,
    setRequireAuth,
    redirectTo,
    setRedirectTo,
  } = useAuth();

  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  if (user || !requireAuth) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (TESTING_MODE) {
      const result = mockLogin(form.username, form.password);
      if (result) {
        login(result);
        if (redirectTo) {
          navigate(redirectTo);
          setRedirectTo(null);
        }
      } else {
        alert("Invalid test credentials.");
      }
      return;
    }

    // Real login
    try {
      console.log("calling  auth/login ");
      
      const { data } = await axios.post("http://localhost:9555/auth/login", form);
      login(data);
      if (redirectTo) {
        navigate(redirectTo);
        setRedirectTo(null);
      }
    } catch (e) {
      alert("Authentication failed.");
    }
  };

  const handleClose = () => {
    setRequireAuth(false);
    if (redirectTo) {
      setRedirectTo(null);
    }
    navigate("/");
  };

  const goToRegisterPage = () => {
    setRequireAuth(false); // Hide modal
    navigate("/register");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
      <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          <CloseIcon />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          Don’t have an account?
          <button
            className="ml-2 text-blue-500 underline"
            onClick={goToRegisterPage}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;


// // src/components/AuthModal.jsx
// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import CloseIcon from "@mui/icons-material/Close";
// import { TESTING_MODE, mockLogin } from "../testing"; // ⬅️ import mock login setup

// const AuthModal = () => {
//   const {
//     user,
//     login,
//     requireAuth,
//     setRequireAuth,
//     redirectTo,
//     setRedirectTo,
//   } = useAuth();

//   const navigate = useNavigate();
//   const [mode, setMode] = useState("login");
//   const [form, setForm] = useState({ username: "", password: "", email: "" });

//   if (user || !requireAuth) return null;

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (TESTING_MODE) {
//       if (mode === "login") {
//         const result = mockLogin(form.username, form.password);
//         if (result) {
//           login(result); // mimic backend response
//           if (redirectTo) {
//             navigate(redirectTo);
//             setRedirectTo(null);
//           }
//         } else {
//           alert("Invalid test credentials.");
//         }
//       } else {
//         alert("Registration is not supported in testing mode.");
//       }
//       return;
//     }

//     // Real API call
//     const url =
//       mode === "register"
//         ? "http://localhost:9091/auth/register"
//         : "http://localhost:9091/auth/login";

//     try {
//       const { data } = await axios.post(url, form);
//       if (mode === "login") {
//         login(data);
//         if (redirectTo) {
//           navigate(redirectTo);
//           setRedirectTo(null);
//         }
//       } else {
//         setMode("login");
//       }
//     } catch (e) {
//       alert("Authentication failed.");
//     }
//   };

//   const handleClose = () => {
//     setRequireAuth(false);
//     if (redirectTo) {
//       setRedirectTo(null);
//     }
//     navigate("/");
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
//       <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
//         >
//           <CloseIcon />
//         </button>

//         <h2 className="text-xl font-bold mb-4 text-center">
//           {mode === "login" ? "Sign In" : "Register"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             placeholder="Username"
//             className="w-full p-2 border rounded"
//             required
//           />
//           {mode === "register" && (
//             <input
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-2 border rounded"
//               required
//             />
//           )}
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             {mode === "login" ? "Login" : "Register"}
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
//           {mode === "login"
//             ? "Don’t have an account?"
//             : "Already have an account?"}
//           <button
//             className="ml-2 text-blue-500 underline"
//             onClick={() => setMode(mode === "login" ? "register" : "login")}
//           >
//             {mode === "login" ? "Register" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;



// // src/components/AuthModal.jsx
// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import CloseIcon from "@mui/icons-material/Close";
// import { AiOutlineClose } from "react-icons/ai";

// const AuthModal = () => {
//   const {
//     user,
//     login,
//     requireAuth,
//     setRequireAuth,
//     redirectTo,
//     setRedirectTo,
//   } = useAuth();

//   const navigate = useNavigate();
//   const [mode, setMode] = useState("login");
//   const [form, setForm] = useState({ username: "", password: "", email: "" });

//   // 🚫 Don't show modal if not required or already logged in
//   if (user || !requireAuth) return null;

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {

    
//     e.preventDefault();

//     const url =
//       mode === "register"
//         ? "http://localhost:9091/auth/register"
//         : "http://localhost:9091/auth/login";
//     try {
//       const { data } = await axios.post(url, form);
//       if (mode === "login") {
//         login(data);
//         if (redirectTo) {
//           navigate(redirectTo);
//           setRedirectTo(null);
//         }
//       } else {
//         setMode("login");
//       }
//     } catch (e) {
//       alert("Authentication failed.");
//     }
//   };

//   const handleClose = () => {
//     console.log("handel workin??s")
//     setRequireAuth(false);
//     if (redirectTo) {
//       setRedirectTo(null);
//       alert("heere")
//     }
//     navigate("/"); // Redirect to home if it was a private page
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/60">
//       <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
//         {/* ❌ Close Button */}
//         <button
//           onClick={handleClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
//         >
//   <CloseIcon /> 
//     {/* <AiOutlineClose size={20} />
//   &times; */}

//   </button>

//         <h2 className="text-xl font-bold mb-4 text-center">
//           {mode === "login" ? "Sign In" : "Register"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             placeholder="Username"
//             className="w-full p-2 border rounded"
//             required
//           />
//           {mode === "register" && (
//             <input
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-2 border rounded"
//               required
//             />
//           )}
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             {mode === "login" ? "Login" : "Register"}
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
//           {mode === "login"
//             ? "Don’t have an account?"
//             : "Already have an account?"}
//           <button
//             className="ml-2 text-blue-500 underline"
//             onClick={() => setMode(mode === "login" ? "register" : "login")}
//           >
//             {mode === "login" ? "Register" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;

///////////////////

// // src/components/AuthModal.jsx
// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AuthModal = () => {
//   const {
//     user,
//     login,
//     requireAuth,
//     setRequireAuth,
//     redirectTo,
//     setRedirectTo,
//   } = useAuth();

//   const navigate = useNavigate();
//   const [mode, setMode] = useState("login");
//   const [form, setForm] = useState({ username: "", password: "", email: "" });

//   if (user || !requireAuth) return null;

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url =
//       mode === "register"
//         ? "http://localhost:9091/auth/register"
//         : "http://localhost:9091/auth/login";
//     try {
//       const { data } = await axios.post(url, form);
//       if (mode === "login") {
//         login(data); // Save token and decode
//         if (redirectTo) {
//           navigate(redirectTo);
//           setRedirectTo(null);
//         }
//       } else {
//         setMode("login"); // After register, switch to login
//       }
//     } catch (e) {
//       alert("Authentication failed.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
//         <h2 className="text-xl font-bold mb-4">
//           {mode === "login" ? "Sign In" : "Register"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="username"
//             value={form.username}
//             onChange={handleChange}
//             placeholder="Username"
//             className="w-full p-2 border rounded"
//             required
//           />
//           {mode === "register" && (
//             <input
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email"
//               className="w-full p-2 border rounded"
//               required
//             />
//           )}
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             placeholder="Password"
//             className="w-full p-2 border rounded"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             {mode === "login" ? "Login" : "Register"}
//           </button>
//         </form>
//         <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
//           {mode === "login"
//             ? "Don’t have an account?"
//             : "Already have an account?"}
//           <button
//             className="ml-2 text-blue-500 underline"
//             onClick={() => setMode(mode === "login" ? "register" : "login")}
//           >
//             {mode === "login" ? "Register" : "Login"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;
