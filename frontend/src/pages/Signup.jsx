import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure Axios is installed
import '../styles/Signup.css';

const Signup = () => {
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    phone: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const payload = userType === "user"
        ? { userType, name: formData.name, email: formData.email, password: formData.password, phone: formData.phone }
        : { userType, name: formData.name, email: formData.email, password: formData.password, phone: formData.phone, organization: formData.organization };

      const response = await axios.post('http://localhost:5000/api/auth/signup', payload);

      alert(response.data.message);
      navigate('/'); // Redirect to login page
    } catch (error) {
      alert("Signup failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="signup-container">
      <h1>Create An Account As</h1>
      <div className="user-type-toggle">
        <button 
          className={userType === 'user' ? 'active' : ''} 
          onClick={() => setUserType('user')}
        >
          User
        </button>
        <button 
          className={userType === 'company' ? 'active' : ''} 
          onClick={() => setUserType('company')}
        >
          Company
        </button>
      </div>

      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {userType === 'company' && (
          <div className="form-group">
            <label>Organization Name:</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p className="login-link">
        Already have an account? <span onClick={() => navigate('/')}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
