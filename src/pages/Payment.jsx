import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  Typography,
  TextField,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Payment = () => {
  const navigate = useNavigate();
  const {
    searchPayload,
    selectedFlight,
    selectedSeats,
    passengerList,
    priceSummary,
    
  } = useAppContext();
  const {
    user
  } = useAuth();

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: user?.username || '',
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState(null);
const {setPaymentStatus,setTicketDetails} = useAppContext();
  if (
    !searchPayload ||
    !selectedFlight ||
    !selectedSeats?.length ||
    !passengerList?.length ||
    !priceSummary ||
    !user
  ) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <Typography variant="h5" gutterBottom>Missing Required Information</Typography>
        <Typography variant="body1" className="mb-4">
          Please select a flight, fill passenger details, and pick a seat before proceeding to payment.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Go to Home</Button>
      </div>
    );
  }

  const handleInput = (field, value) => {
    setPaymentData({ ...paymentData, [field]: value });
  };

  const generateFlightNumber = (airline) => {
    return (
      airline
        .toUpperCase()
        .replace(/[^A-Z]/g, '')
        .substring(0, 3) + Math.floor(100 + Math.random() * 900)
    );
  };
  
  const handleSubmit = async () => {
    const bookingData = {
      flight: selectedFlight,
      passengers: passengerList,
      seats: selectedSeats,
      user,
      priceSummary,
      paymentInfo: paymentData,
    };
  
    // 🧠 generate a single Payment object per passenger
    const ticketDetails = passengerList.map((passenger, index) => ({
      pnr: Math.floor(100000 + Math.random() * 900000),
      passenger_Name: passenger.name,
      flight_Number: generateFlightNumber(selectedFlight.airline),
      seat_Number: selectedSeats[index] || null,
      boarding: selectedFlight.legs[0].origin,
      destination: selectedFlight.legs[0].destination,
      departure_Date: selectedFlight.legs[0].departure.split('T')[0],
      departure_Time: selectedFlight.legs[0].departure.split('T')[1],
      fair: Math.round(priceSummary.grandTotal / passengerList.length),
      airline: selectedFlight.airline,
      // username: user.username, // optional: if your backend uses it
    }));
    setPaymentStatus('paid');
    setTicketDetails(ticketDetails);
           navigate('/success');
    try {
      // const res = await axios.post('http://localhost:9555/api/payment', payments); // post array of payments
 // save ticket to context
 

      // const res = await axios.post('http://localhost:9555/api/payment', payments, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // });
      
      // if (res.status === 200) {
      //   setPaymentStatus('paid');
      //   navigate('/success');
      // } else {
      //   setError('Transaction failed. Please try again later.');
      // }
    } catch (err) {
      // setError('Transaction failed. Please try again later.');
    } finally {
      setConfirmOpen(false);

    }
  };
  
  // const handleSubmit = async () => {
  //   const bookingData = {
  //     flight: selectedFlight,
  //     passengers: passengerList,
  //     seats: selectedSeats,
  //     user,
  //     priceSummary,
  //     paymentInfo: paymentData,
  //   }
  //   console.log(bookingData);
    
  //   try {
  //     const res = await axios.post('http://localhost:9555/api/payment', {
  //       flight: selectedFlight,
  //       passengers: passengerList,
  //       seats: selectedSeats,
  //       user,
  //       priceSummary,
  //       paymentInfo: paymentData,
  //     });

  //     if (res.status === 200) {
  //       setPaymentStatus('paid');

  //       navigate('/success');
  //     } else {
  //       setError('Transaction failed. Please try again later.');
  //     }
  //   } catch (err) {
  //     setError('Transaction failed. Please try again later.');
  //   } finally {
  //     setConfirmOpen(false);
  //   }
  // };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Left: Summary + Payment Form */}
      <div className="flex-1 space-y-4">
        <Typography variant="h6">Passenger & Seat Summary</Typography>
        <div className="bg-background p-4 rounded shadow text-foreground space-y-2">
          {passengerList.map((p, i) => (
            <div key={i}>
              <Typography>{p.name}, Age: {p.age}, Gender: {p.gender}</Typography>
              <Typography>Seat: {selectedSeats[i]}</Typography>
              <Divider className="my-2" />
            </div>
          ))}
        </div>

        <Typography variant="h6">Payment Information</Typography>
        <div className="space-y-3">
          <TextField
            fullWidth label="Card Number" value={paymentData.cardNumber}
            onChange={(e) => handleInput('cardNumber', e.target.value)} />
          <TextField
            fullWidth label="Expiry Date (MM/YY)" value={paymentData.expiry}
            onChange={(e) => handleInput('expiry', e.target.value)} />
          <TextField
            fullWidth label="CVV" value={paymentData.cvv}
            onChange={(e) => handleInput('cvv', e.target.value)} />
          <TextField
            fullWidth label="Name on Card" value={paymentData.nameOnCard}
            disabled />
          <TextField
            fullWidth label="Amount" value={`₹${priceSummary.grandTotal}`} disabled />
          <Button variant="contained" color="primary" fullWidth onClick={() => setConfirmOpen(true)}>
            Submit and Pay
          </Button>
        </div>
      </div>

      {/* Right: Flight Summary */}
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
        <Typography>Base Price: ₹{priceSummary.basePricePerTicket}</Typography>
        <Typography>Tax: ₹{priceSummary.taxPerTicket}</Typography>
        <Typography>Discount: ₹{priceSummary.discountPerTicket}</Typography>
        <Typography>Total (1 passenger): ₹{priceSummary.totalPerTicket}</Typography>
        <Typography>Passengers: {priceSummary.totalPassengers}</Typography>
        <Typography variant="h6" className="mt-2">Grand Total: ₹{priceSummary.grandTotal}</Typography>
      </div>

      {/* Confirm Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Typography>Please confirm all details before proceeding with payment.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Confirm & Pay</Button>
        </DialogActions>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={!!error} onClose={() => setError(null)}>
        <DialogTitle>Payment Failed</DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Payment;
