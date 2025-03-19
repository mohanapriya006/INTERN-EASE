import React, { useState } from "react";
import "../styles/AdminPages.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Amit Sharma", email: "amit.sharma@gmail.com", status: "Active" },
    { id: 2, name: "Priya Iyer", email: "priya.iyer@yahoo.com", status: "Blocked" },
    { id: 3, name: "Rahul Mehta", email: "rahul.mehta@outlook.com", status: "Active" },
  ]);

  const handleAction = (id, action) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, status: action === "block" ? "Blocked" : "Suspended" } : user
    );
    setUsers(updatedUsers);

    if (action === "email") {
      alert(`Email sent to ${users.find((user) => user.id === id).name} about suspension.`);
    }
  };

  return (
    <div className="container">
      <h2>Manage Users</h2>
      <div className="card-container">
        {users.map((user) => (
          <div key={user.id} className={`card ${user.status === "Blocked" ? "blocked" : ""}`}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>Status: <strong>{user.status}</strong></p>
            <div className="btn-group">
              <button className="btn delete" onClick={() => handleAction(user.id, "delete")}>
                Delete
              </button>
              <button className="btn block" onClick={() => handleAction(user.id, "block")}>
                Block
              </button>
              <button className="btn email" onClick={() => handleAction(user.id, "email")}>
                Send Email
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
