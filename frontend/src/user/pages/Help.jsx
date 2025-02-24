import React, { useState } from "react";
import "../styles/Help.css";

const Help = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "general", // Default option
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulating a submission process
    console.log("Form submitted:", formData);
    
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000); // Hide message after 5 sec

    // Reset form
    setFormData({
      name: "",
      email: "",
      issueType: "general",
      message: "",
    });
  };

  return (
    <div className="help-container">
      <h1>Help & Support</h1>
      <p>If you have any issues, complaints, or need to report a scam, fill out the form below.</p>

      <form onSubmit={handleSubmit} className="help-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Issue Type:</label>
        <select name="issueType" value={formData.issueType} onChange={handleChange}>
          <option value="general">General Inquiry</option>
          <option value="complaint">Complaint</option>
          <option value="scamReport">Report a Scam</option>
        </select>

        <label>Message:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} required />

        <button type="submit">Submit</button>
      </form>

      {submitted && <p className="success-message">Thank you! Your request has been received.</p>}

      <div className="contact-info">
        <h2>Contact Us</h2>
        <p>📧 Email: <a href="mailto:support@intern-ease.com">support@intern-ease.com</a></p>
        <p>📞 Phone: +91 98765 43210</p>
      </div>
    </div>
  );
};

export default Help;
