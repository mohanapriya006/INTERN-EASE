import React, { useState } from "react";
import "../styles/AdminPages.css";

const ManageInternships = () => {
  const [internships, setInternships] = useState([
    { id: 1, title: "Web Developer", company: "TCS", duration: "3 months" },
    { id: 2, title: "Data Analyst", company: "Infosys", duration: "6 months" },
    { id: 3, title: "AI Engineer", company: "Google", duration: "4 months" },
  ]);

  const handleDelete = (id) => {
    const updated = internships.filter((internship) => internship.id !== id);
    setInternships(updated);
  };

  return (
    <div className="container">
      <h2>Manage Internships</h2>
      <div className="card-container">
        {internships.map((internship) => (
          <div key={internship.id} className="card">
            <h3>{internship.title}</h3>
            <p>Company: {internship.company}</p>
            <p>Duration: {internship.duration}</p>
            <button className="btn delete" onClick={() => handleDelete(internship.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ManageInternships;

