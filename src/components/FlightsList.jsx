// components/FlightsList.jsx
import React from 'react';
import { useAppContext } from '../context/AppContext';
import FlightCard from './FlightCard';

const FlightsList = ({ flights,onFlightSelect }) => {
  // const { flights } = useAppContext(); // ✅ Pull from context

  if (!flights || flights.length === 0) {
    return <div className="text-center text-gray-500 py-10">No flights found.</div>;
  }

  return (
    <div className="space-y-4">
      {flights.map((flight, index) => (
        <FlightCard
          key={index}
          flight={flight}
          onSelect={onFlightSelect} // needed for modal open
        />
      ))}
    </div>
  );
};

export default FlightsList;
