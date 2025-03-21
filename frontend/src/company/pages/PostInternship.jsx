import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/PostInternship.css';

const PostInternship = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    stipend: '',
    type: 'Remote',
    startDate: '',
    endDate: '',
    description: '',
    requirements: '',
    applicationDeadline: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return '';
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    
    // Calculate the difference in months
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();
    
    return months.toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      const token = localStorage.getItem("token"); // Get token
  
      if (!token) {
        setError("You are not authenticated! Please log in.");
        setIsLoading(false);
        return;
      }
  
      const duration = calculateDuration();
  
      const internshipData = {
        ...formData,
        duration,
        postedOn: new Date().toISOString(),
        status: 'Active'
      };
  
      await axios.post('http://localhost:5000/api/internships/create', internshipData, {
        headers: {
          Authorization: `Bearer ${token}` // Send token in headers
        }
      });
  
      setSuccess('Internship posted successfully!');
      setFormData({
        title: '',
        company: '',
        location: '',
        stipend: '',
        type: 'Remote',
        startDate: '',
        endDate: '',
        description: '',
        requirements: '',
        applicationDeadline: ''
      });
  
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post internship. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="dashboard-container">
      {/* Sidebar - Using the same sidebar as CompanyDashboard */}
      <nav className="sidebar">
        <h2 className="brand">
                    <span style={{ color: "white" }}>Intern</span> 
                    <span className="blue">@</span>
                    <span style={{ color: "white" }}>Ease</span>
                </h2>
        <ul className="menu">
          <li><Link to="/company-dashboard">Dashboard</Link></li>
          <li><Link to="/post-internship" className="active">Post Internship</Link></li>
         <li><Link to="/view-applications">View Applications</Link></li>
          <li><Link to="/interview-scheduling">Interview Scheduling</Link></li>
          <li><Link to="/reports-analytics">Reports & Analytics</Link></li>
          
          <li><Link to="/logout" className="logout">Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
      

        
        <div className="post-internship-container">
          <h1>Post a New Internship</h1>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <form onSubmit={handleSubmit} className="internship-form">
            <div className="form-group">
              <label htmlFor="title">Internship Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="e.g. Web Development Intern" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                placeholder="Your company name" 
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  placeholder="e.g. Bangalore" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="stipend">Stipend</label>
                <input 
                  type="text" 
                  id="stipend" 
                  name="stipend" 
                  value={formData.stipend} 
                  onChange={handleChange} 
                  placeholder="e.g. ₹25K/month" 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Internship Type</label>
                <select 
                  id="type" 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  required
                >
                  <option value="Remote">Remote</option>
                  <option value="On-Site">On-Site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="applicationDeadline">Application Deadline</label>
                <input 
                  type="date" 
                  id="applicationDeadline" 
                  name="applicationDeadline" 
                  value={formData.applicationDeadline} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input 
                  type="date" 
                  id="startDate" 
                  name="startDate" 
                  value={formData.startDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input 
                  type="date" 
                  id="endDate" 
                  name="endDate" 
                  value={formData.endDate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Internship Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Describe the internship role, responsibilities, etc." 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="requirements">Requirements</label>
              <textarea 
                id="requirements" 
                name="requirements" 
                value={formData.requirements} 
                onChange={handleChange} 
                placeholder="Skills, qualifications, or experience required" 
                required 
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? 'Posting...' : 'Post Internship'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostInternship;