import React, { useState, useEffect } from "react";
import "../styles/FindInternships.css";

const internshipData = [
  { id: 1, title: "Web Development Intern", company: "Google", location: "Bangalore", stipend: "₹25K/month", type: "Remote", startDate: "2024-03-01", endDate: "2024-06-01" },
  { id: 2, title: "Data Science Intern", company: "Amazon", location: "Chennai", stipend: "₹30K/month", type: "On-Site", startDate: "2024-04-15", endDate: "2024-10-15" },
  { id: 3, title: "Product Management Intern", company: "Microsoft", location: "Hyderabad", stipend: "₹35K/month", type: "Remote", startDate: "2024-05-10", endDate: "2024-08-10" },
  { id: 4, title: "Software Testing Intern", company: "TCS", location: "Mumbai", stipend: "₹20K/month", type: "On-Site", startDate: "2024-06-01", endDate: "2024-09-01" },
  { id: 5, title: "Marketing Intern", company: "Infosys", location: "Pune", stipend: "₹18K/month", type: "Remote", startDate: "2024-07-01", endDate: "2024-10-01" },
  { id: 6, title: "Cyber Security Intern", company: "Cisco", location: "Delhi", stipend: "₹28K/month", type: "On-Site", startDate: "2024-08-15", endDate: "2024-11-15" },
];

const FindInternships = () => {
  const [filters, setFilters] = useState({
    location: "",
    company: "",
    stipend: "",
    type: "",
  });

  const [appliedInternships, setAppliedInternships] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedInternships")) || [];
  });

  useEffect(() => {
    localStorage.setItem("appliedInternships", JSON.stringify(appliedInternships));
  }, [appliedInternships]);

  const handleApply = (internship) => {
    alert(`Applied for ${internship.title} at ${internship.company}. Good Luck!`);
    setAppliedInternships([...appliedInternships, internship]);
  };

  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24 * 30));
    return `${months} months`;
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredInternships = internshipData.filter((internship) => {
    return (
      (filters.location === "" || internship.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.company === "" || internship.company.toLowerCase().includes(filters.company.toLowerCase())) &&
      (filters.stipend === "" || internship.stipend.toLowerCase().includes(filters.stipend.toLowerCase())) &&
      (filters.type === "" || internship.type.toLowerCase() === filters.type.toLowerCase())
    );
  });

  return (
    <div className="find-internships-container">
      <h1>Find Internships</h1>
      <div className="filters">
        <input type="text" name="location" placeholder="Location" onChange={handleFilterChange} />
        <input type="text" name="company" placeholder="Company Name" onChange={handleFilterChange} />
        <input type="text" name="stipend" placeholder="Stipend (e.g. ₹25K/month)" onChange={handleFilterChange} />
        <select name="type" onChange={handleFilterChange}>
          <option value="">Internship Type</option>
          <option value="Remote">Remote</option>
          <option value="On-Site">On-Site</option>
        </select>
      </div>

      <div className="internship-list">
        {filteredInternships.length > 0 ? (
          filteredInternships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <h2>{internship.title}</h2>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Location:</strong> {internship.location}</p>
              <p><strong>Stipend:</strong> {internship.stipend}</p>
              <p><strong>Type:</strong> {internship.type}</p>
              <p><strong>Start Date:</strong> {internship.startDate}</p>
              <p><strong>End Date:</strong> {internship.endDate}</p>
              <p><strong>Duration:</strong> {calculateDuration(internship.startDate, internship.endDate)}</p>
              <button className="apply-btn" onClick={() => handleApply(internship)}>Apply Now</button>
            </div>
          ))
        ) : (
          <p className="no-internships">No internships match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default FindInternships;
