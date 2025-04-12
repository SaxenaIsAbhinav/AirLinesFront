import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Button,
  TextField,
  Avatar
} from '@mui/material';
import { useAuth } from '../../context/AuthContext'; // ✅ useAuth to get passengerDetails

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { passengerDetails } = useAuth(); // ✅ updated

  useEffect(() => {
    const email = passengerDetails?.emailId;

    if (!email) {
      navigate('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = {data:{
          "fullName": "zoii",
          "age": "23",
          "emailId": "abhi@com",
          "mobileNumber": "9564567567",
          "password": "Bangalore"
          
      }}
      // const response = await axios.get(`http://localhost:9555/api/user/getPassengerDetails/${email}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [passengerDetails, navigate]);

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={5}>
      <CircularProgress />
    </Box>
  );

  if (!profile) return (
    <Container>
      <Typography variant="h6" mt={5}>Profile not found.</Typography>
    </Container>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          p: 4,
          borderRadius: '30px',
          background: 'linear-gradient(to right, #52e0f3, #0041c2)',
          color: '#fff',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
      >
        <Avatar
          alt="Profile Picture"
          src="/assets/profiledp.png"
          sx={{
            width: 180,
            height: 180,
            boxShadow: 5,
            border: '4px solid #ffffff',
            backgroundColor: '#fff'
          }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            fontWeight="bold"
            sx={{
              color: '#000',
              mb: 3,
              textAlign: 'center',
              textTransform: 'uppercase'
            }}
          >
            {profile.fullName}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                AGE
              </Typography>
              <TextField
                fullWidth
                disabled
                value={profile.age}
                InputProps={{
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: 3
                  }
                }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                EMAIL ID
              </Typography>
              <TextField
                fullWidth
                disabled
                value={profile.emailId}
                InputProps={{
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: 3
                  }
                }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
                MOBILE NUMBER
              </Typography>
              <TextField
                fullWidth
                disabled
                value={profile.mobileNumber}
                InputProps={{
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: 3
                  }
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '20px',
                fontWeight: 'bold',
                width: 'fit-content',
                alignSelf: 'center',
                px: 4,
                '&:hover': {
                  backgroundColor: '#222'
                }
              }}
            >
              EDIT PROFILE
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;


// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Container, Typography, Box, CircularProgress, Button } from '@mui/material';

// const ProfilePage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = location.state?.email;

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!email) {
//       navigate('/'); // fallback if no email in state
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9555/getPassengerDetails/${email}`);
//         setProfile(response.data);
//       } catch (error) {
//         console.error('Failed to fetch profile', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [email, navigate]);

//   if (loading) return (
//     <Box display="flex" justifyContent="center" mt={5}>
//       <CircularProgress />
//     </Box>
//   );

//   if (!profile) return (
//     <Container>
//       <Typography variant="h6" mt={5}>Profile not found.</Typography>
//     </Container>
//   );

//   return (
//     <Container maxWidth="sm">
//       <Box
//         sx={{
//           mt: 5,
//           p: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//           background:"#c45805"
//         }}
//       >
//         <Typography variant="h4" gutterBottom>Profile Details</Typography>
//         <Typography><strong>Name:</strong> {profile.fullName}</Typography>
//         <Typography><strong>Age:</strong> {profile.age}</Typography>
//         <Typography><strong>Email:</strong> {profile.emailId}</Typography>
//         <Typography><strong>Mobile Number:</strong> {profile.mobileNumber}</Typography>
//         {/* Add more fields if your API returns them */}
//       </Box>
//     </Container>
//   );
// };

// export default ProfilePage;



// v2
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Box,
//   CircularProgress,
//   Button,
//   TextField,
//   Avatar
// } from '@mui/material';
// import { useAppContext } from '../../context/AppContext';

// // import profilePic from '../../assets/profiledp.png'; // ✅ Imported from assets

// const ProfilePage = () => {
//   // const location = useLocation();
//   const navigate = useNavigate();
//   // const email = location.state?.email;

//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
// const {username} = useAppContext();
//   useEffect(() => {
//     if (!username) {
//       navigate('/');
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(`http://localhost:9555/getPassengerDetails/${username}`);
//         setProfile(response.data);
//       } catch (error) {
//         console.error('Failed to fetch profile', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [username, navigate]);

//   if (loading) return (
//     <Box display="flex" justifyContent="center" mt={5}>
//       <CircularProgress />
//     </Box>
//   );

//   if (!profile) return (
//     <Container>
//       <Typography variant="h6" mt={5}>Profile not found.</Typography>
//     </Container>
//   );

//   return (
//     <Container maxWidth="md" sx={{ mt: 5 }}>
//       <Box
//         sx={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: 4,
//           p: 4,
//           borderRadius: '30px',
//           background: 'linear-gradient(to right, #52e0f3, #0041c2)',
//           color: '#fff',
//           flexWrap: 'wrap',
//           justifyContent: 'center'
//         }}
//       >
//         <Avatar
//   alt="Profile Picture"
//   src="/assets/profiledp.png"
//   sx={{
//     width: 180,
//     height: 180,
//     boxShadow: 5,
//     border: '4px solid #ffffff',
//     backgroundColor: '#fff'
//   }}
// />

//         {/* <Box>
//           <Avatar
//             alt="Profile Picture"
//             src={profilePic}
//             sx={{
//               width: 180,
//               height: 180,
//               boxShadow: 5,
//               border: '4px solid #ffffff',
//               backgroundColor: '#fff'
//             }}
//           />
//         </Box> */}

//         <Box sx={{ flex: 1 }}>
//           <Typography
//             variant="h3"
//             fontWeight="bold"
//             sx={{
//               color: '#000',
//               mb: 3,
//               textAlign: 'center', // ✅ Center aligned
//               textTransform: 'uppercase' // ✅ Uppercase
//             }}
//           >
//             {profile.fullName}
//           </Typography>

//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             <Box>
//               <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
//                 AGE
//               </Typography>
//               <TextField
//                 fullWidth
//                 disabled
//                 value={profile.age}
//                 InputProps={{
//                   sx: {
//                     backgroundColor: 'rgba(255, 255, 255, 0.4)',
//                     borderRadius: 3
//                   }
//                 }}
//               />
//             </Box>

//             <Box>
//               <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
//                 EMAIL ID
//               </Typography>
//               <TextField
//                 fullWidth
//                 disabled
//                 value={profile.emailId}
//                 InputProps={{
//                   sx: {
//                     backgroundColor: 'rgba(255, 255, 255, 0.4)',
//                     borderRadius: 3
//                   }
//                 }}
//               />
//             </Box>

//             <Box>
//               <Typography variant="subtitle2" sx={{ mb: 0.5, fontWeight: 600 }}>
//                 MOBILE NUMBER
//               </Typography>
//               <TextField
//                 fullWidth
//                 disabled
//                 value={profile.mobileNumber}
//                 InputProps={{
//                   sx: {
//                     backgroundColor: 'rgba(255, 255, 255, 0.4)',
//                     borderRadius: 3
//                   }
//                 }}
//               />
//             </Box>

//             <Button
//               variant="contained"
//               sx={{
//                 mt: 2,
//                 backgroundColor: '#000',
//                 color: '#fff',
//                 borderRadius: '20px',
//                 fontWeight: 'bold',
//                 width: 'fit-content',
//                 alignSelf: 'center',
//                 px: 4,
//                 '&:hover': {
//                   backgroundColor: '#222'
//                 }
//               }}
//             >
//               EDIT PROFILE
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ProfilePage;
