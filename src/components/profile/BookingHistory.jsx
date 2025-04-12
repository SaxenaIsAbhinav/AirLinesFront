import React from 'react';

const BookingHistory = () => {
  const bookings = [
    { flight: "AI203", from: "Delhi", to: "Mumbai", date: "2025-03-15" },
    { flight: "6E405", from: "Chandigarh", to: "Bangalore", date: "2025-01-10" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-2">Booking History</h2>
      <ul className="list-disc ml-6">
        {bookings.map((b, idx) => (
          <li key={idx}>
            {b.flight} - {b.from} to {b.to} on {b.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingHistory;
