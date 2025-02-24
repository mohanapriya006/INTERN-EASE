import React, { useState, useEffect } from "react";
import "../styles/BrowseJobs.css";

const jobData = [
  { id: 1, title: "Software Engineer", company: "Google", location: "Bangalore", salary: "₹15 LPA", type: "Remote", role: "Full-time" },
  { id: 2, title: "Data Analyst", company: "Amazon", location: "Chennai", salary: "₹10 LPA", type: "On-Site", role: "Full-time" },
  { id: 3, title: "Product Manager", company: "Microsoft", location: "Hyderabad", salary: "₹18 LPA", type: "Remote", role: "Full-time" },
  { id: 4, title: "Intern - Web Developer", company: "TCS", location: "Mumbai", salary: "₹30K per month", type: "On-Site", role: "Internship" },
  { id: 5, title: "Backend Developer", company: "Infosys", location: "Pune", salary: "₹12 LPA", type: "Remote", role: "Full-time" },
  { id: 6, title: "Cyber Security Analyst", company: "Cisco", location: "Delhi", salary: "₹14 LPA", type: "On-Site", role: "Full-time" },
];

const BrowseJobs = () => {
  const [filters, setFilters] = useState({
    location: "",
    company: "",
    salary: "",
    type: "",
    role: "",
  });

  const [appliedJobs, setAppliedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedJobs")) || [];
  });

  useEffect(() => {
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
  }, [appliedJobs]);

  const handleApply = (job) => {
    alert(`Applied for ${job.title} at ${job.company}. Good Luck!`);
    setAppliedJobs([...appliedJobs, job]);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobData.filter((job) => {
    return (
      (filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.company === "" || job.company.toLowerCase().includes(filters.company.toLowerCase())) &&
      (filters.salary === "" || job.salary.toLowerCase().includes(filters.salary.toLowerCase())) &&
      (filters.type === "" || job.type.toLowerCase() === filters.type.toLowerCase()) &&
      (filters.role === "" || job.role.toLowerCase() === filters.role.toLowerCase())
    );
  });

  return (
    <div className="browse-jobs-container">
      <h1>Browse Jobs</h1>
      <div className="filters">
        <input type="text" name="location" placeholder="Location" onChange={handleFilterChange} />
        <input type="text" name="company" placeholder="Company Name" onChange={handleFilterChange} />
        <input type="text" name="salary" placeholder="Salary (e.g. ₹10 LPA)" onChange={handleFilterChange} />
        <select name="type" onChange={handleFilterChange}>
          <option value="">Job Type</option>
          <option value="Remote">Remote</option>
          <option value="On-Site">On-Site</option>
        </select>
        <select name="role" onChange={handleFilterChange}>
          <option value="">Role Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2>{job.title}</h2>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Role:</strong> {job.role}</p>
              <button className="apply-btn" onClick={() => handleApply(job)}>Apply Now</button>
            </div>
          ))
        ) : (
          <p className="no-jobs">No jobs match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
