import React, { useContext, useEffect, useState } from 'react';
import {  useAppContext } from '../context/AppContext';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';

const SeatGrid = () => {
  const { searchPayload, selectedSeats, setSelectedSeats, alreadyBookedSeats, setAlreadyBookedSeats } = useAppContext();
  const cabinClass = searchPayload?.cabinClass || 'economy';

  const rowsMap = {
    business: [1, 2],
    first: [3, 4, 5],
    economy: [6, 7, 8, 9, 10],
  };

  const seatPrices = {
    business: 1950,
    first: 1200,
    economy: 400,
  };

  const [seats, setSeats] = useState([]);

  // Generate seat grid
  useEffect(() => {
    const generateSeats = () => {
      const generated = [];

      Object.entries(rowsMap).forEach(([type, rows]) => {
        rows.forEach(row => {
          ['A', 'B', 'C', 'GAP', 'D', 'E'].forEach((col, idx) => {
            if (col === 'GAP') return;
            const id = `${row}${col}`;
            generated.push({
              id,
              row,
              col,
              classType: type,
              price: seatPrices[type],
            });
          });
        });
      });

      // Disable 60% from current class
      const currentClassSeats = generated.filter(s => s.classType === cabinClass);
      const total = currentClassSeats.length;
      const randomBooked = new Set();
      while (randomBooked.size < Math.floor(total * 0.6)) {
        const randomSeat = currentClassSeats[Math.floor(Math.random() * total)];
        randomBooked.add(randomSeat.id);
      }

      const finalSeats = generated.map(seat => ({
        ...seat,
        isDisabled:
          seat.classType !== cabinClass ||
          randomBooked.has(seat.id) ||
          alreadyBookedSeats.includes(seat.id),
        isSelected: selectedSeats.includes(seat.id),
      }));

      setSeats(finalSeats);
    };

    generateSeats();
  }, [cabinClass, selectedSeats, alreadyBookedSeats]);

  const handleSelect = (seatId) => {
    setSelectedSeats([seatId]); // single seat selection
    console.log("Selected Seat:", seatId);
  };

  return (
    <div className="grid grid-cols-6 gap-2 p-4 w-full max-w-[350px] mx-auto">
      {seats.map(seat => {
        if (seat.col === 'D') return <div key={seat.id} className="col-span-1" />;
        return (
          <Box
            key={seat.id}
            onClick={() => !seat.isDisabled && handleSelect(seat.id)}
            className={clsx(
              "w-10 h-10 flex items-center justify-center rounded-md text-sm font-semibold border",
              {
                "cursor-pointer bg-white hover:bg-gray-100 text-black border-gray-400": !seat.isDisabled && !seat.isSelected,
                "bg-gray-500 text-white cursor-not-allowed border-gray-500": seat.isDisabled,
                "bg-blue-600 text-white border-blue-600": seat.isSelected,
              }
            )}
          >
            {seat.id}
          </Box>
        );
      })}
    </div>
  );
};

export default SeatGrid;
