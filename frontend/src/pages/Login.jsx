

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import axios from 'axios';
import '../styles/Login.css';

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (type) => {
    setLoginType(type);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loginType === 'admin') {
      if (email === 'admin@internease.com' && password === 'admin123') {
        alert('Admin login successful!');
        navigate('/admin-dashboard');
      } else {
        alert('Invalid admin credentials!');
      }
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        userType: loginType,
        email,
        password
      });
      alert(response.data.message);

      if (loginType === 'company') {
        navigate('/company-dashboard');
      } else {
        navigate('/user-dashboard');
      }
      
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed!');
    }
  };

  return (
    <div className="login-container">
      <header className="header">Intern<span>@</span>Ease</header>
      <div className="login-content">
        <h1>Welcome to Intern@Ease</h1>
        <p className="tagline">Bridging the gap between talent and opportunity</p>
        <p className="sub-tagline">Your gateway to meaningful internship experiences</p>
        <div className="login-buttons">
          <button onClick={() => handleLogin('user')}>User Login</button>
          <button onClick={() => handleLogin('company')}>Company Login</button>
          <button onClick={() => handleLogin('admin')}>Admin Login</button>
        </div>
        <p className="signup-link">Don't have an account? <span onClick={() => navigate('/signup')}>Sign Up</span></p>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={() => setShowModal(false)}><X size={24} /></button>
            <h2>{loginType.charAt(0).toUpperCase() + loginType.slice(1)} Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
