// import React, { useState } from "react";
// import axios from 'axios';
// import { TextField, Button, Container, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { useTheme } from '@mui/material/styles';



// const UserForm = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     fullName: "",
//     age: "",
//     password: "",
//     emailId: "",
//     mobileNumber: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:9555/postPassengerDetails', formData);
//       console.log(response.data);
//       window.alert('✅ Successfully saved!');
//       setIsSubmitted(true);
//     } catch (error) {
//       window.alert('❌ Failed to create profile.');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const theme = useTheme();
//   const handleViewProfile = () => {
//     navigate('/profile', { state: { email: formData.emailId } });
//   };
  

//   return (
//   <AppProvider theme={theme}>

//     <div className="min-h-screen bg-cover bg-center flex items-center justify-start px-4">
//       <Container maxWidth="sm" style={{ background: "#c45805" }}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             mt: 5,
//             p: 3,
//             boxShadow: 3,
//             borderRadius: 2
//           }}
//         >
//           <Typography variant="h5" align="center"> Create Your Account </Typography>

//           <TextField
//             label="Name"
//             variant="outlined"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//             style={{ background: "#FFFFFF" }}
//           />

//           <TextField
//             label="Age"
//             variant="outlined"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//             style={{ background: "#FFFFFF" }}
//           />

//           <TextField
//             label="Password"
//             variant="outlined"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={{ background: "#FFFFFF" }}
//           />

//           <TextField
//             label="Email"
//             variant="outlined"
//             name="emailId"
//             type="email"
//             value={formData.emailId}
//             onChange={handleChange}
//             required
//             style={{ background: "#FFFFFF" }}
//           />

//           <TextField
//             label="Mobile No."
//             variant="outlined"
//             name="mobileNumber"
//             value={formData.mobileNumber}
//             onChange={handleChange}
//             required
//             style={{ background: "#FFFFFF" }}
//           />

//           {!isSubmitted ? (
//             <Button type="submit" variant="contained" color="primary" disabled={loading}>
//               {loading ? 'Saving...' : 'Submit'}
//             </Button>
//           ) : (
//             <Button variant="contained" color="success" onClick={handleViewProfile}>
//               View Profile
//             </Button>
//           )}
//         </Box>
//       </Container>
//     </div>
//   </AppProvider>
//   );
// };

// export default UserForm;


import React, { useState } from "react";
import axios from 'axios';
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { AppProvider } from '@toolpad/core/AppProvider';
import { useTheme } from '@mui/material/styles';
import { useAuth } from "../../context/AuthContext";

const UserForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    password: "",
    emailId: "",
    mobileNumber: ""
  });

  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setPassengerDetails, setRegisteredUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!/^\d{10}$/.test(formData.mobileNumber)) {
      alert("❌ Mobile number must be exactly 10 digits");
      setLoading(false);
      return;
    }

    try {
      // 1. Extract basic user info
      const userPayload = {
        name: formData.fullName,
        password: formData.password,
        email: formData.emailId,
      };
    
      // 2. Send registration request
      // const regResponse = await axios.post('http://localhost:9555/auth/register', userPayload);
      console.log("Auth Register Response:", userPayload);
    
      // 3. Save passenger data
      const response = await axios.post('http://localhost:9555/api/user/postPassengerDetails', formData);
      console.log("Passenger Save Response:", formData);
    
      window.alert('✅ Successfully saved!');
      setIsSubmitted(true);
    
      // 4. Save to context (strip password from both)
      const passengerDetails = { ...formData };
      delete passengerDetails.password;
    
      const registeredUser = { ...userPayload };
      delete registeredUser.password;
    
      // Assuming you have setPassengerDetails and setRegisteredUser in context
      // Example:
      // const { setPassengerDetails, setRegisteredUser } = useAppContext();
      setPassengerDetails(passengerDetails);
      setRegisteredUser(registeredUser);
    
    } catch (error) {
      window.alert('❌ Failed to create profile.');
      console.error(error);
    } finally {
      setLoading(false);
    }
    
    // try {
    //   console.log(formData);
      
    //   const response = await axios.post('http://localhost:9555/postPassengerDetails', formData);
    //   console.log(response.data);
    //   window.alert('✅ Successfully saved!');
    //   setIsSubmitted(true);
    // } catch (error) {
    //   window.alert('❌ Failed to create profile.');
    //   console.error(error);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleViewProfile = () => {
    navigate('/profile', { state: { email: formData.emailId } });
  };

  return (
    <>
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center px-4">
        <Container maxWidth="sm" sx={{
          // backgroundColor: '#ffffff',
          // borderRadius: 4,
          // boxShadow: 6,
          padding: 4,
        }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
              p: 4,
              backgroundColor: "#ffffff", // light theme
              boxShadow: 3,
              borderRadius: 3
            }}
          >

            <Typography variant="h3" align="center" sx={{ color: '#000000' }}> Create Your <br />  Account </Typography>

            <TextField
              label="Name"
              name="fullName"
              variant="outlined"
              fullWidth
              required
              value={formData.fullName}
              onChange={handleChange}
              sx={{
                input: {
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  padding: "12px"
                },
                label: {
                  color: "#555"
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                }
              }}
            />

            <TextField
              label="Age"
              name="age"
              variant="outlined"
              fullWidth
              required
              value={formData.age}
              onChange={handleChange}
              sx={{
                input: {
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  padding: "12px"
                },
                label: {
                  color: "#555"
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                }
              }}
            />

            <TextField
              label="Password"
              name="password"
              variant="outlined"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleChange}
              sx={{
                input: {
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  padding: "12px"
                },
                label: {
                  color: "#555"
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                }
              }}
            />

            <TextField
              label="Email"
              name="emailId"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={formData.emailId}
              onChange={handleChange}
              sx={{
                input: {
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  padding: "12px"
                },
                label: {
                  color: "#555"
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                }
              }}
            />

            <TextField
              label="Mobile No."
              name="mobileNumber"
              variant="outlined"
              fullWidth
              required
              value={formData.mobileNumber}
              onChange={handleChange}
              sx={{
                input: {
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  padding: "12px"
                },
                label: {
                  color: "#555"
                },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                }
              }}
            />

            {!isSubmitted ? (
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 3,
                  padding: "12px",
                  '&:hover': {
                    backgroundColor: "#1565c0"
                  }
                }}
                fullWidth
              >
                {loading ? "Saving..." : "Sign up"}
              </Button>

            ) : (
              <Button variant="contained" color="success" onClick={handleViewProfile}>
                View Profile
              </Button>
            )}
          </Box>
        </Container>
      </div>
    </>
  );
};

export default UserForm;
