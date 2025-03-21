import React from "react";
import "../styles/Report.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaBriefcase, FaFileAlt, FaCalendarCheck, FaUserCheck, FaChartLine, FaTachometerAlt } from "react-icons/fa";

// Daily active users data
const barData = [
  { day: "Mon", users: 12 },
  { day: "Tue", users: 18 },
  { day: "Wed", users: 15 },
  { day: "Thu", users: 22 },
  { day: "Fri", users: 20 },
  { day: "Sat", users: 8 }
];

// Internship categories data
const pieData = [
  { name: "Engineering", value: 45 },
  { name: "Design", value: 20 },
  { name: "Marketing", value: 15 },
  { name: "Finance", value: 10 },
  { name: "HR", value: 10 }
];

const COLORS = ['#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

const Report = () => {
  const location = useLocation();
  
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2 className="brand">
          <span style={{ color: "white" }}>Intern</span> 
          <span className="blue">@</span>
          <span style={{ color: "white" }}>Ease</span>
        </h2>
        <ul className="menu">
          <li><Link to="/company-dashboard">Dashboard</Link></li>
          <li><Link to="/post-internship">Post Internship</Link></li>
          <li><Link to="/view-applications">View Applications</Link></li>
          <li><Link to="/interview-scheduling">Interview Scheduling</Link></li>
          <li><Link to="/reports-analytics" className={location.pathname === "/reports-analytics" ? "active" : ""}>Reports & Analytics</Link></li>
         
          <li><Link to="/logout" className="logout">Logout</Link></li>
        </ul>
      </nav>
      
      <div className="report-container">
        <div className="dashboard-title">
          <FaTachometerAlt size={24} />
          <h1>Company Dashboard</h1>
        </div>
        
        <div className="stats">
          <div className="card users">
            <FaUsers size={28} />
            <div>Registered Users</div>
            <span>146</span>
          </div>
          <div className="card internships">
            <FaBriefcase size={28} />
            <div>Internships Posted</div>
            <span>38</span>
          </div>
          <div className="card applications">
            <FaFileAlt size={28} />
            <div>Applications</div>
            <span>245</span>
          </div>
          <div className="card interviews">
            <FaCalendarCheck size={28} />
            <div>Interviews</div>
            <span>87</span>
          </div>
          <div className="card hires">
            <FaUserCheck size={28} />
            <div>Total Hires</div>
            <span>42</span>
          </div>
        </div>
        
        <div className="graphs-row">
          <div className="chart-container">
            <h2><FaChartLine style={{ marginRight: "8px" }} /> Daily Active Users</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData} barSize={25}>
                <XAxis dataKey="day" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip cursor={{ fill: 'rgba(136, 132, 216, 0.2)' }} />
                <Bar dataKey="users" fill="#3498db" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="pie-container">
            <h2><FaChartLine style={{ marginRight: "8px" }} /> Internship Categories</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="map-container">
          <h2>Company Location</h2>
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96909.49943823522!2d80.08322622195075!3d12.961960623245691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1742528470994!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;