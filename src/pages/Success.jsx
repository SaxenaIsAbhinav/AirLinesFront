// src/pages/Success.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Button, Typography, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Success = () => {
  const navigate = useNavigate();
  const {
    selectedFlight,
    selectedSeats,
    passengerList,
    priceSummary,
    searchPayload,
    paymentStatus,
    setSelectedFlight,
    setPassengerList,
    setSelectedSeats,
    setPriceSummary,
    setSearchPayload,
    setPaymentStatus,
  } = useAppContext();

  useEffect(() => {
    // If payment not completed, go home
    if (paymentStatus !== 'paid') {
      navigate('/');
    }

    // Clear context after short delay (optional)
    const timer = setTimeout(() => {
      setSelectedFlight(null);
      setPassengerList([]);
      setSelectedSeats([]);
      setPriceSummary(null);
      setSearchPayload(null);
      setPaymentStatus(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [paymentStatus]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
      <CheckCircleIcon sx={{ fontSize: 80, color: 'green' }} />
      <Typography variant="h4" className="mt-4 text-green-600">Booking Successful!</Typography>
      <Typography variant="body1" className="mt-2 max-w-xl">
        Thank you for booking with us. Your ticket has been successfully confirmed.
      </Typography>

      <div className="mt-6 bg-background text-foreground border rounded-lg p-4 w-full max-w-xl space-y-3 shadow">
        <Typography variant="h6">Flight Summary</Typography>
        <div className="flex items-center gap-4">
          <img src={selectedFlight?.airlineLogo} alt="logo" className="w-12 h-12 rounded" />
          <div>
            <Typography>{selectedFlight?.airline}</Typography>
            <Typography variant="body2">
              {selectedFlight?.legs?.[0]?.origin} → {selectedFlight?.legs?.[0]?.destination}
            </Typography>
          </div>
        </div>

        <Divider className="my-2" />
        <Typography variant="body2">Date: {searchPayload?.departureDate}</Typography>
        <Typography variant="body2">Passengers: {passengerList?.length}</Typography>
        {passengerList.map((p, i) => (
          <Typography key={i} variant="body2">
            {p.name} — Seat: {selectedSeats[i]}
          </Typography>
        ))}
        <Divider className="my-2" />
        <Typography variant="h6">Total Paid: ₹{priceSummary?.grandTotal}</Typography>
      </div>

      <Button
        variant="contained"
        color="primary"
        className="mt-6"
        onClick={() => navigate('/')}
      >
        Go to Home
      </Button>
    </div>
  );
};

export default Success;
