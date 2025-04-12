// src/components/FlightModal.jsx
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
  position: 'absolute', top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%', maxWidth: 600,
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4,
};

const FlightModal = () => {
  const { selectedFlight, showFlightModal, setShowFlightModal } = useAppContext();
  const navigate = useNavigate();

  if (!selectedFlight) return null;

  const handleClose = () => setShowFlightModal(false);
  const handleProceed = () => {
    setShowFlightModal(false);
    navigate('/passenger');
  };

  return (
    <Modal open={showFlightModal} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>Selected Flight</Typography>
        <Typography><strong>Airline:</strong> {selectedFlight.airline}</Typography>
        <Typography><strong>Price:</strong> {selectedFlight.price}</Typography>
        <Typography><strong>Stops:</strong> {selectedFlight.stops}</Typography>

        {selectedFlight.legs.map((leg, idx) => (
          <Typography key={idx} sx={{ mt: 1 }} variant="body2">
            {leg.origin} → {leg.destination} ({new Date(leg.departure).toLocaleString()})
          </Typography>
        ))}

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleProceed}>Go to Passenger Info</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default FlightModal;

