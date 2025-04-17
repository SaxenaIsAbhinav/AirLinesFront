// src/pages/Passenger.jsx
import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppContext } from '../context/AppContext';
import SeatSelectionModal from '../components/SeatSelectionModal';
import { useNavigate } from 'react-router-dom';

const Passenger = () => {
  const { searchPayload,setPriceSummary, setPassengerList, selectedFlight } = useAppContext();
  const [forms, setForms] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();


  const taxRate = 10; // 10%
  const discountRate = 5; // 5%

  const priceValue = parseInt(selectedFlight?.price?.replace(/[^\d]/g, '') || 0);
  const tax = (priceValue * taxRate) / 100;
  const discount = (priceValue * discountRate) / 100;
  const total =  Math.round((priceValue + tax - discount) * 100) / 100;

  // Total passengers
  const totalPassengers =
    parseInt(searchPayload?.adults || 0) +
    parseInt(searchPayload?.children || 0) +
    parseInt(searchPayload?.infants || 0);

    const grandTotal = Math.round((total * totalPassengers) * 100) / 100;


  useEffect(() => {
    const initialForms = Array.from({ length: totalPassengers }, (_, index) => ({
      id: index + 1,
      name: '',
      age: '',
      gender: '',
    }));
    setForms(initialForms);
  }, [searchPayload]);

  const handleChange = (id, field, value) => {
    setForms((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };


  const handleContinue = () => {
    console.log('Saved Passenger List:', forms);
    setPassengerList(forms);

    
  // Save this in context
  setPriceSummary({
    basePricePerTicket: priceValue,
    taxPerTicket: tax,
    discountPerTicket: discount,
    totalPerTicket: total,
    totalPassengers,
    grandTotal,
  });

  // Go to payment page
  navigate('/payment');
    
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Left: Passenger Forms */}
      <div className="flex-1 space-y-4">
        {forms.map((passenger, index) => (
          <Accordion key={index} className="bg-background text-foreground rounded-md">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-foreground text-background">
              <Typography>Passenger {index + 1}</Typography>
            </AccordionSummary>
            <AccordionDetails className="space-y-4">
              <TextField
                fullWidth
                label="Name"
                value={passenger.name}
                onChange={(e) => handleChange(passenger.id, 'name', e.target.value)}
              />
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={passenger.age}
                onChange={(e) => handleChange(passenger.id, 'age', e.target.value)}
              />
              <TextField
                fullWidth
                label="Gender"
                value={passenger.gender}
                onChange={(e) => handleChange(passenger.id, 'gender', e.target.value)}
              />
            </AccordionDetails>
          </Accordion>
        ))}
        <Button variant="contained" onClick={handleContinue}>
          Continue
        </Button>
      </div>

      {/* Right: Summary Card */}
      <div className="w-full md:w-[350px] bg-background text-foreground p-4 border rounded-lg shadow">
        <div className="flex items-center gap-4 mb-4">
          <img src={selectedFlight?.airlineLogo} alt="logo" className="w-12 h-12 rounded" />
          <div>
            <Typography variant="h6">{selectedFlight?.airline}</Typography>
            <Typography variant="body2">{selectedFlight?.legs?.[0]?.origin} → {selectedFlight?.legs?.[0]?.destination}</Typography>
            <Typography variant="body2">{selectedFlight?.stops} stop(s)</Typography>
          </div>
        </div>

        <Divider className="my-3" />
<Typography>Base Price: ₹{priceValue}</Typography>
<Typography>Tax ({taxRate}%): ₹{tax}</Typography>
<Typography>Discount ({discountRate}%): ₹{discount}</Typography>
<Typography>Total (per passenger): ₹{total}</Typography>
<Typography>
  Passengers: {totalPassengers}
</Typography>
<Typography variant="h6" className="mt-2">
  Grand Total: ₹{grandTotal}
</Typography>
<Divider className="my-3" />

<Button variant="outlined" fullWidth onClick={() => setModalOpen(true)}>
  Select Seat
</Button>

        <SeatSelectionModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
};

export default Passenger;



// import React from "react";
// import { useAppContext } from '../context/AppContext';

// export default function Passenger() {
//   const {searchPayload} = useAppContext();
//   console.log("searchPayload",searchPayload);

//   return <div>{searchPayload}</div>;
// }
