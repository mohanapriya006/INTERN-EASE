import React, { useState } from "react";
import "../styles/AdminPages.css";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Software Engineer", company: "Amazon", location: "Bangalore" },
    { id: 2, title: "Frontend Developer", company: "Flipkart", location: "Chennai" },
    { id: 3, title: "Backend Developer", company: "Paytm", location: "Delhi" },
  ]);

  const handleDelete = (id) => {
    const updated = jobs.filter((job) => job.id !== id);
    setJobs(updated);
  };

  return (
    <div className="container">
      <h2>Manage Jobs</h2>
      <div className="card-container">
        {jobs.map((job) => (
          <div key={job.id} className="card">
            <h3>{job.title}</h3>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <button className="btn delete" onClick={() => handleDelete(job.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageJobs;
