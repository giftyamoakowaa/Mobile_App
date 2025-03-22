import React from "react";

const Profile = () => {
  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="border p-4 rounded-lg">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default Profile;
