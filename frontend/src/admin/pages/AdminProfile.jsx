import React, { useState } from "react";
import "../styles/AdminPages.css";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "Priyanka Sharma",
    email: "priyanka.sharma@admin.com",
    role: "Super Admin",
    phone: "+91-9876543210",
    organization: "INTERN-EASE"
  });

  const [editing, setEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({ ...admin });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSave = () => {
    setAdmin(updatedProfile);
    setEditing(false);
  };

  return (
    <div className="container">
      <h2>Admin Profile</h2>

      <div className="card profile-card">
        {editing ? (
          <>
            <input
              type="text"
              name="name"
              value={updatedProfile.name}
              onChange={handleChange}
              placeholder="Admin Name"
            />
            <input
              type="email"
              name="email"
              value={updatedProfile.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={updatedProfile.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <input
              type="text"
              name="organization"
              value={updatedProfile.organization}
              onChange={handleChange}
              placeholder="Organization"
            />
            <button className="btn save" onClick={handleSave}>
              Save Changes
            </button>
          </>
        ) : (
          <>
            <h3>{admin.name}</h3>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Phone:</strong> {admin.phone}</p>
            <p><strong>Role:</strong> {admin.role}</p>
            <p><strong>Organization:</strong> {admin.organization}</p>

            <button className="btn edit" onClick={handleEdit}>
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
