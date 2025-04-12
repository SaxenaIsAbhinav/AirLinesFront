import React from 'react';

const UserInfo = () => {
  const user = {
    name: "Abhinav",
    email: "abhinav@example.com",
    phone: "+91 98765-43210",
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-2">Personal Info</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default UserInfo;
