// src/components/FlightCard.jsx
import React, { useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, Divider, Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppContext } from '../context/AppContext';

const FlightCard = ({ flight }) => {
  const [expanded, setExpanded] = useState(false);
  const { setSelectedFlight, setShowFlightModal } = useAppContext();

  const handleSelect = () => {
    setSelectedFlight(flight);
    setShowFlightModal(true);
    console.log("✅ Selected Flight:", flight); // LOG
  };

  const formatTime = (str) => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formatDate = (str) => new Date(str).toLocaleDateString();

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} className="rounded-xl shadow mb-4">
      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100 dark:bg-neutral-800">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center gap-4">
            <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 rounded" />
            <div>
              <Typography className="font-semibold">{flight.airline}</Typography>
              <Typography className="text-sm text-gray-500">{flight.stops} stop(s)</Typography>
            </div>
          </div>
          <div className="text-right">
            <Typography className="font-bold">{flight.price}</Typography>
            <Typography className="text-sm text-gray-500">{flight.totalDuration} min</Typography>
          </div>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        <div className="space-y-3">
          {flight.legs.map((leg, idx) => (
            <div key={idx} className="p-3 border rounded bg-white dark:bg-neutral-900">
              <Typography variant="subtitle2">{leg.origin} → {leg.destination}</Typography>
              <Typography variant="body2">
                {formatDate(leg.departure)} | {formatTime(leg.departure)} → {formatTime(leg.arrival)}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Duration: {leg.durationInMinutes} min | Stops: {leg.stopCount}
              </Typography>
            </div>
          ))}
          <Divider />
          <div className="flex justify-end pt-2">
            <Button variant="contained" color="primary" onClick={handleSelect}>
              Continue
            </Button>
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default FlightCard;

// // FlightCard.jsx
// import React, { useState } from 'react';
// import {
//   Accordion, AccordionSummary, AccordionDetails,
//   Typography, Divider, Button
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useAppContext } from '../context/AppContext';

// const FlightCard = ({ flight }) => {
//   const [expanded, setExpanded] = useState(false);
//   const { setSelectedFlight, setShowFlightModal } = useAppContext();

//   const toggleAccordion = () => setExpanded(!expanded);

//   const handleSelect = () => {
//     setSelectedFlight(flight);
//     setShowFlightModal(true);
//   };

//   const formatTime = (str) => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const formatDate = (str) => new Date(str).toLocaleDateString();

//   return (
//     <Accordion expanded={expanded} onChange={toggleAccordion} className="rounded-2xl shadow-md mb-4 border border-gray-300">
//       <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100 dark:bg-neutral-800">
//         <div className="flex items-center w-full justify-between">
//           <div className="flex items-center gap-4">
//             <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 rounded" />
//             <div>
//               <Typography variant="subtitle1" className="font-semibold">{flight.airline}</Typography>
//               <Typography variant="body2" className="text-gray-500">{flight.stops} stop(s)</Typography>
//             </div>
//           </div>
//           <div className="text-right">
//             <Typography variant="h6" className="font-bold">{flight.price}</Typography>
//             <Typography variant="body2" className="text-gray-500">{flight.totalDuration} min</Typography>
//           </div>
//         </div>
//       </AccordionSummary>

//       <AccordionDetails>
//         <div className="space-y-4">
//           {flight.legs.map((leg, idx) => (
//             <div key={idx} className="p-3 border rounded-lg bg-white dark:bg-neutral-900">
//               <Typography variant="subtitle2" className="font-medium mb-1">
//                 {leg.origin} → {leg.destination}
//               </Typography>
//               <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
//                 {formatDate(leg.departure)} | {formatTime(leg.departure)} → {formatTime(leg.arrival)}
//               </Typography>
//               <Typography variant="body2" className="text-sm text-gray-500">
//                 Duration: {leg.durationInMinutes} min | Stops: {leg.stopCount}
//               </Typography>
//             </div>
//           ))}
//           <Divider />
//           <div className="flex justify-end">
//             <Button variant="contained" color="primary" onClick={handleSelect}>
//               Continue
//             </Button>
//           </div>
//         </div>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default FlightCard;
// ------------------------------
// import React, { useState } from 'react';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Divider,
//   Button,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useAppContext } from '../context/AppContext';

// const FlightCard = ({ flight, onFlightSelect }) => {
//   const [expanded, setExpanded] = useState(false);
//   const { setSelectedFlight } = useAppContext();

//   const toggleAccordion = () => {
//     setExpanded(!expanded);
//   };

//   const handleSelect = () => {
//     setSelectedFlight(flight);
//     onFlightSelect();
//   };

//   const formatTime = (str) => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const formatDate = (str) => new Date(str).toLocaleDateString();

//   return (
//     <Accordion expanded={expanded} onChange={toggleAccordion} className="rounded-2xl shadow-md mb-4 border border-gray-300">
//       <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100 dark:bg-neutral-800">
//         <div className="flex items-center w-full justify-between">
//           <div className="flex items-center gap-4">
//             <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 rounded" />
//             <div>
//               <Typography variant="subtitle1" className="font-semibold">{flight.airline}</Typography>
//               <Typography variant="body2" className="text-gray-500">{flight.stops} stop(s)</Typography>
//             </div>
//           </div>

//           <div className="text-right">
//             <Typography variant="h6" className="font-bold">{flight.price}</Typography>
//             <Typography variant="body2" className="text-gray-500">{flight.totalDuration} min</Typography>
//           </div>
//         </div>
//       </AccordionSummary>

//       <AccordionDetails>
//         <div className="space-y-4">
//           {flight.legs.map((leg, idx) => (
//             <div key={idx} className="p-3 border rounded-lg bg-white dark:bg-neutral-900">
//               <Typography variant="subtitle2" className="font-medium mb-1">
//                 {leg.origin} → {leg.destination}
//               </Typography>
//               <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
//                 {formatDate(leg.departure)} | {formatTime(leg.departure)} → {formatTime(leg.arrival)}
//               </Typography>
//               <Typography variant="body2" className="text-sm text-gray-500">
//                 Duration: {leg.durationInMinutes} min | Stops: {leg.stopCount}
//               </Typography>
//             </div>
//           ))}

//           <Divider />

//           <div className="flex justify-end">
//             <Button variant="contained" color="primary" onClick={handleSelect}>
//               Continue
//             </Button>
//           </div>
//         </div>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default FlightCard;


////////////////
/// import React, { useState } from 'react';
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   Divider,
//   Button,
// } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { useAppContext } from '../context/AppContext';

// const FlightCard = ({ flight, onFlightSelect }) => {
//   const [expanded, setExpanded] = useState(false);
//   const { setSelectedFlight } = useAppContext();

//   const toggleAccordion = () => {
//     setExpanded(!expanded);
//   };

//   const handleSelect = () => {
//     setSelectedFlight(flight);
//     onFlightSelect();
//   };

//   const formatTime = (str) => new Date(str).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   const formatDate = (str) => new Date(str).toLocaleDateString();

//   return (
//     <Accordion expanded={expanded} onChange={toggleAccordion} className="rounded-2xl shadow-md mb-4 border border-gray-300">
//       <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100 dark:bg-neutral-800">
//         <div className="flex items-center w-full justify-between">
//           <div className="flex items-center gap-4">
//             <img src={flight.airlineLogo} alt={flight.airline} className="w-10 h-10 rounded" />
//             <div>
//               <Typography variant="subtitle1" className="font-semibold">{flight.airline}</Typography>
//               <Typography variant="body2" className="text-gray-500">{flight.stops} stop(s)</Typography>
//             </div>
//           </div>

//           <div className="text-right">
//             <Typography variant="h6" className="font-bold">{flight.price}</Typography>
//             <Typography variant="body2" className="text-gray-500">{flight.totalDuration} min</Typography>
//           </div>
//         </div>
//       </AccordionSummary>

//       <AccordionDetails>
//         <div className="space-y-4">
//           {flight.legs.map((leg, idx) => (
//             <div key={idx} className="p-3 border rounded-lg bg-white dark:bg-neutral-900">
//               <Typography variant="subtitle2" className="font-medium mb-1">
//                 {leg.origin} → {leg.destination}
//               </Typography>
//               <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
//                 {formatDate(leg.departure)} | {formatTime(leg.departure)} → {formatTime(leg.arrival)}
//               </Typography>
//               <Typography variant="body2" className="text-sm text-gray-500">
//                 Duration: {leg.durationInMinutes} min | Stops: {leg.stopCount}
//               </Typography>
//             </div>
//           ))}

//           <Divider />

//           <div className="flex justify-end">
//             <Button variant="contained" color="primary" onClick={handleSelect}>
//               Continue
//             </Button>
//           </div>
//         </div>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// export default FlightCard;
