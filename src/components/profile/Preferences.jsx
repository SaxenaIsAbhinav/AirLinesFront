import React from 'react';

const Preferences = () => {
  const prefs = {
    seat: "Aisle",
    meal: "Veg",
    notifications: true,
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Preferences</h2>
      <p>Preferred Seat: {prefs.seat}</p>
      <p>Meal: {prefs.meal}</p>
      <p>Notifications: {prefs.notifications ? 'Enabled' : 'Disabled'}</p>
    </div>
  );
};

export default Preferences;
