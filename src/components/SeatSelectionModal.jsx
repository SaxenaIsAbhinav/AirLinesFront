// src/components/SeatSelectionModal.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { AppContext, useAppContext } from '../context/AppContext';

const SeatSelectionModal = ({ open, onClose }) => {
  const { searchPayload, selectedSeats, setSelectedSeats, alreadyBookedSeats, setAlreadyBookedSeats } = useAppContext();
  const [seats, setSeats] = useState([]);

  const cabinClass = searchPayload?.cabinClass || 'economy';
  const cabinRowLimits = {
    business: [1, 2],
    first: [3, 5],
    economy: [6, 10],
  };

  const getCabinClass = (row) => {
    if (row <= 2) return 'business';
    if (row <= 5) return 'first';
    return 'economy';
  };

  const generateSeats = () => {
    const newSeats = [];
    const seatLetters = ['A', 'B', 'C', 'D', 'E'];
    let allSeats = [];

    for (let row = 1; row <= 10; row++) {
      seatLetters.forEach((letter) => {
        const seatNumber = `${row}${letter}`;
        const type = getCabinClass(row);
        const isCorrectClass = type === cabinClass;
        allSeats.push({ seatNumber, row, letter, type, isCorrectClass });
      });
    }

    const sameClassSeats = allSeats.filter(seat => seat.type === cabinClass);
    const blockedCount = Math.floor(sameClassSeats.length * 0.6);
    const blockedSeats = new Set();

    while (blockedSeats.size < blockedCount) {
      const random = sameClassSeats[Math.floor(Math.random() * sameClassSeats.length)];
      blockedSeats.add(random.seatNumber);
    }

    const seatMap = allSeats.map(seat => {
      const isAlreadyBooked = alreadyBookedSeats.includes(seat.seatNumber);
      const isRandomlyBlocked = blockedSeats.has(seat.seatNumber);
      const isBlocked = isAlreadyBooked || isRandomlyBlocked;

      return {
        ...seat,
        status: seat.isCorrectClass
          ? isBlocked
            ? 'disabled'
            : 'available'
          : 'disabled',
      };
    });

    setSeats(seatMap);
  };

  useEffect(() => {
    if (open) generateSeats();
  }, [open]);

  const handleSelect = (seatNumber) => {
    const seat = seats.find(s => s.seatNumber === seatNumber);
    if (seat.status !== 'available') return;

    setSelectedSeats([seatNumber]);
    console.log("Selected Seat:", seatNumber);
  };

  const handleDone = () => {
    setAlreadyBookedSeats(prev => [...new Set([...prev, ...selectedSeats])]);
    onClose();
  };

  const renderSeat = (seat) => (
    <div
      key={seat.seatNumber}
      className={`w-10 h-10 text-sm font-medium rounded-md flex items-center justify-center 
        ${seat.status === 'available' ? 'bg-green-500 hover:bg-green-600 cursor-pointer' : 'bg-gray-400'} 
        ${selectedSeats.includes(seat.seatNumber) ? 'ring-2 ring-red-500' : ''}`}
      onClick={() => handleSelect(seat.seatNumber)}
    >
      {seat.seatNumber}
    </div>
  );

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="bg-background text-foreground p-6 w-[90%] md:w-[700px] mx-auto mt-20 rounded-lg shadow-lg">
        <Typography variant="h6" gutterBottom>Select Your Seat</Typography>
        <div
          className="grid gap-1 my-2"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr ',
            justifyItems: 'center',
          }}
        >
          {seats.map(seat => {
            // insert grid gaps as empty divs (C - gap - D)
            const index = seats.indexOf(seat);
            if (seat.letter === 'C') {
              return (
                <React.Fragment key={seat.seatNumber}>
                  {renderSeat(seat)}
                </React.Fragment>
              );
            } else {
              return renderSeat(seat);
            }
          })}
        </div>

        <Button variant="contained" onClick={handleDone}>Done</Button>
      </Box>
    </Modal>
  );
};

export default SeatSelectionModal;


// // src/components/SeatSelectionModal.jsx
// import React, { useContext } from 'react';
// import { Modal, Box, Typography, Button } from '@mui/material';
// import SeatGrid from './SeatGrid';
// import { AppContext, useAppContext } from '../context/AppContext';

// const SeatSelectionModal = ({ open, onClose }) => {
//   const { selectedSeats, setSelectedSeats, alreadyBookedSeats, setAlreadyBookedSeats } = useAppContext();

//   const handleDone = () => {
//     // Add selected seats to already booked seats
//     setAlreadyBookedSeats(prev => [...prev, ...selectedSeats]);
//     setSelectedSeats([]); // reset after confirmation
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="bg-background text-foreground p-6 w-[90%] md:w-[500px] mx-auto mt-40 rounded-lg shadow-lg outline-none">
//         <Typography variant="h6" gutterBottom>Select Your Seat</Typography>
//         <div className="my-4">
//           <SeatGrid />
//         </div>
//         <Button
//           variant="contained"
//           onClick={handleDone}
//           disabled={selectedSeats.length === 0}
//         >
//           Done
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default SeatSelectionModal;


// import React, { useEffect, useState, useContext } from 'react';
// import { Modal, Box, Typography, Button } from '@mui/material';
// import { AppContext, useAppContext } from '../context/AppContext'; // Adjust import if needed
// import clsx from 'clsx';

// const rows = 9;
// const cols = 6;

// const seatPrices = {
//   business: 1950,
//   premium: 850,
//   standard: 400,
// };

// const SeatSelectionModal = ({ open, onClose }) => {
//   const { selectedSeat, setSelectedSeat, alreadyBookedSeats, setAlreadyBookedSeats } = useAppContext()
//   const [seats, setSeats] = useState([]);

//   useEffect(() => {
//     if (open) generateSeats();
//   }, [open]);

//   const generateSeats = () => {
//     const newSeats = [];
//     const randomBooked = new Set();

//     while (randomBooked.size < 6) {
//       const row = Math.floor(Math.random() * rows) + 1;
//       const col = String.fromCharCode(65 + Math.floor(Math.random() * cols));
//       randomBooked.add(`${row}${col}`);
//     }

//     for (let i = 1; i <= rows; i++) {
//       for (let j = 0; j < cols; j++) {
//         const seatId = `${i}${String.fromCharCode(65 + j)}`;
//         const seatClass = i === 1 ? 'business' : i <= 3 ? 'premium' : 'standard';
//         const isRandomBooked = randomBooked.has(seatId);
//         const isPreviouslyBooked = alreadyBookedSeats.includes(seatId);
//         newSeats.push({
//           id: seatId,
//           class: seatClass,
//           price: seatPrices[seatClass],
//           isBooked: isRandomBooked || isPreviouslyBooked,
//         });
//       }
//     }

//     setSeats(newSeats);
//   };

//   const handleSeatClick = (seat) => {
//     if (seat.isBooked) return;
//     setSelectedSeat(seat);
//     console.log('Selected Seat:', seat);
//   };

//   const handleDone = () => {
//     if (selectedSeat) {
//       setAlreadyBookedSeats(prev => [...new Set([...prev, selectedSeat.id])]);
//     }
//     onClose();
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="bg-background text-foreground p-6 w-[95%] md:w-[700px] mx-auto mt-20 rounded-lg shadow-lg">
//         <Typography variant="h6" gutterBottom>Select Your Seat</Typography>
//         <div className="grid grid-cols-7 gap-2 justify-center items-center my-4">
//           {['A', 'B', 'C', '', 'D', 'E', 'F'].map((label, idx) => (
//             <div key={idx} className="text-center font-bold">{label}</div>
//           ))}
//           {seats.map((seat, index) => (
//             <div
//               key={seat.id}
//               onClick={() => handleSeatClick(seat)}
//               className={clsx(
//                 'w-12 h-12 rounded-md flex items-center justify-center cursor-pointer border-2 font-semibold',
//                 {
//                   'border-yellow-500': seat.class === 'premium',
//                   'border-red-500': seat.class === 'business',
//                   'border-gray-400': seat.class === 'standard',
//                   'bg-gray-500 text-white cursor-not-allowed': seat.isBooked,
//                   'bg-red-600 text-white border-red-600': selectedSeat?.id === seat.id,
//                   'hover:bg-gray-100 dark:hover:bg-gray-700': !seat.isBooked && selectedSeat?.id !== seat.id,
//                 }
//               )}
//             >
//               {seat.id}
//             </div>
//           ))}
//         </div>

//         <Typography className="mt-2 text-sm text-secondary">
//           Note: You can ‘Skip’ preferred seat selection and continue.
//         </Typography>

//         <div className="mt-4 flex justify-end gap-4">
//           <Button variant="outlined" onClick={onClose}>Cancel</Button>
//           <Button variant="contained" onClick={handleDone}>Done</Button>
//         </div>
//       </Box>
//     </Modal>
//   );
// };

// export default SeatSelectionModal;


// // src/components/SeatSelectionModal.jsx
// import React from 'react';
// import { Modal, Box, Typography, Button } from '@mui/material';

// const SeatSelectionModal = ({ open, onClose }) => {
//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box className="bg-background text-foreground p-6 w-[90%] md:w-[500px] mx-auto mt-40 rounded-lg shadow-lg">
//         <Typography variant="h6" gutterBottom>Select Your Seat</Typography>
//         {/* TODO: Seat selection logic */}
//         <div className="my-4">[Seat Grid Coming Soon]</div>
//         <Button variant="contained" onClick={onClose}>Done</Button>
//       </Box>
//     </Modal>
//   );
// };

// export default SeatSelectionModal;
