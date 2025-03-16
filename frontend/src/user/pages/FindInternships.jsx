// import React, { useState, useEffect } from "react";
// import "../styles/FindInternships.css";

// const FindInternships = () => {
//   const [internships, setInternships] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filters, setFilters] = useState({
//     title: "",
//     location: "",
//     company: "",
//     stipend: "",
//     type: "",
//     skills: "", // Added filter for skills
//     role: ""    // Added filter for roles
//   });
//   const [expandedCard, setExpandedCard] = useState(null);
//   const [appliedInternships, setAppliedInternships] = useState(() => {
//     return JSON.parse(localStorage.getItem("appliedInternships")) || [];
//   });

//   // Fetch internships from the database
//   useEffect(() => {
//     const fetchInternships = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/internships/all');
        
//         if (!response.ok) {
//           // Check what kind of content we're getting back
//           const contentType = response.headers.get('content-type');
//           if (contentType && contentType.includes('text/html')) {
//             const errorText = await response.text();
//             console.error('Server returned HTML instead of JSON:', errorText);
//             throw new Error(`API error: ${response.status}. Make sure your backend is running.`);
//           } else {
//             const errorData = await response.json();
//             throw new Error(errorData.message || `Server error: ${response.status}`);
//           }
//         }
        
//         const data = await response.json();
//         console.log("Fetched internships:", data); // Debug log
//         setInternships(data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching internships:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchInternships();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("appliedInternships", JSON.stringify(appliedInternships));
//   }, [appliedInternships]);

//   const handleApply = (internship) => {
//     // Check if user is logged in (you would implement this based on your auth system)
//     const isLoggedIn = localStorage.getItem('token') ? true : false;
    
//     if (!isLoggedIn) {
//       alert("Please log in to apply for internships");
//       // You could redirect to login page here
//       return;
//     }
    
//     alert(`Applied for ${internship.title} at ${internship.company}. Good Luck!`);
//     setAppliedInternships([...appliedInternships, internship]);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN');
//   };

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const toggleCardExpansion = (id) => {
//     if (expandedCard === id) {
//       setExpandedCard(null);
//     } else {
//       setExpandedCard(id);
//     }
//   };

//   // Extract keywords from text for filtering
//   const extractKeywords = (text) => {
//     if (!text) return [];
//     return text.toLowerCase().split(/[,.\s]+/).filter(word => word.length > 2);
//   };

//   const filteredInternships = internships.filter((internship) => {
//     // Extract keywords from requirements for skills filtering
//     const requirementKeywords = extractKeywords(internship.requirements);
//     const descriptionKeywords = extractKeywords(internship.description);
//     const allKeywords = [...requirementKeywords, ...descriptionKeywords];
    
//     return (
//       (filters.title === "" || internship.title.toLowerCase().includes(filters.title.toLowerCase())) &&
//       (filters.location === "" || internship.location.toLowerCase().includes(filters.location.toLowerCase())) &&
//       (filters.company === "" || internship.company.toLowerCase().includes(filters.company.toLowerCase())) &&
//       (filters.stipend === "" || internship.stipend.toLowerCase().includes(filters.stipend.toLowerCase())) &&
//       (filters.type === "" || internship.type.toLowerCase() === filters.type.toLowerCase()) &&
//       (filters.skills === "" || allKeywords.some(keyword => keyword.includes(filters.skills.toLowerCase()))) &&
//       (filters.role === "" || internship.title.toLowerCase().includes(filters.role.toLowerCase()) || 
//                              descriptionKeywords.some(keyword => keyword.includes(filters.role.toLowerCase())))
//     );
//   });

//   if (loading) return <div className="loading">Loading internships...</div>;
//   if (error) return (
//     <div className="error">
//       <p>Error: {error}</p>
//       <p>Please make sure your backend server is running and the API endpoint is correct.</p>
//     </div>
//   );

//   return (
//     <div className="find-internships-container">
//       <h1>Find Internships</h1>
//       <div className="filters">
//         <input type="text" name="title" placeholder="Job Title" onChange={handleFilterChange} />
//         <input type="text" name="location" placeholder="Location" onChange={handleFilterChange} />
//         <input type="text" name="company" placeholder="Company Name" onChange={handleFilterChange} />
//         <input type="text" name="stipend" placeholder="Stipend" onChange={handleFilterChange} />
//         <select name="type" onChange={handleFilterChange}>
//           <option value="">Internship Type</option>
//           <option value="Remote">Remote</option>
//           <option value="On-Site">On-Site</option>
//           <option value="Hybrid">Hybrid</option>
//         </select>
//         <input type="text" name="skills" placeholder="Skills (e.g. Python, React)" onChange={handleFilterChange} />
//         <input type="text" name="role" placeholder="Role (e.g. Developer, Designer)" onChange={handleFilterChange} />
//       </div>

//       <div className="internship-list">
//         {filteredInternships.length > 0 ? (
//           filteredInternships.map((internship) => (
//             <div key={internship._id} className="internship-card">
//               <h2>{internship.title}</h2>
//               <p><strong>Company:</strong> {internship.company}</p>
//               <p><strong>Location:</strong> {internship.location}</p>
//               <p><strong>Stipend:</strong> {internship.stipend}</p>
//               <p><strong>Type:</strong> {internship.type}</p>
//               <p><strong>Duration:</strong> {internship.duration}</p>
//               <p><strong>Start Date:</strong> {formatDate(internship.startDate)}</p>
//               <p><strong>Application Deadline:</strong> {formatDate(internship.applicationDeadline)}</p>
              
//               {expandedCard === internship._id && (
//                 <div className="expanded-content">
//                   <div className="description-section">
//                     <h3>Description</h3>
//                     <p>{internship.description}</p>
//                   </div>
//                   <div className="requirements-section">
//                     <h3>Requirements</h3>
//                     <p>{internship.requirements}</p>
//                   </div>
//                 </div>
//               )}
              
//               <div className="card-actions">
//                 <button 
//                   className="details-btn" 
//                   onClick={() => toggleCardExpansion(internship._id)}
//                 >
//                   {expandedCard === internship._id ? 'Show Less' : 'Show More'}
//                 </button>
//                 <button 
//                   className={`apply-btn ${appliedInternships.some(applied => applied._id === internship._id) ? 'applied' : ''}`}
//                   onClick={() => handleApply(internship)}
//                   disabled={appliedInternships.some(applied => applied._id === internship._id)}
//                 >
//                   {appliedInternships.some(applied => applied._id === internship._id) ? 'Applied' : 'Apply Now'}
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="no-internships">No internships match your criteria. Try adjusting your filters.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FindInternships;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/FindInternships.css";

const FindInternships = () => {
    const [internships, setInternships] = useState([]);
    const [filters, setFilters] = useState({ location: "", company: "", stipend: "", type: "" });

    useEffect(() => {
        axios.get("http://localhost:5000/api/internships/all")
            .then(response => {
                if (response.data.success) {
                    setInternships(response.data.data);
                }
            })
            .catch(error => console.error("Error fetching internships:", error));
    }, []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredInternships = internships.filter(internship =>
        (filters.location === "" || internship.location.toLowerCase().includes(filters.location.toLowerCase())) &&
        (filters.company === "" || internship.company.toLowerCase().includes(filters.company.toLowerCase())) &&
        (filters.stipend === "" || internship.stipend.includes(filters.stipend)) &&
        (filters.type === "" || internship.type.toLowerCase() === filters.type.toLowerCase())
    );

    return (
        <div className="find-internships-container">
            {/* Sidebar */}
            <nav className="sidebar">
                <h2 className="brand">
                    <span style={{ color: "white" }}>Intern</span> 
                    <span className="blue">@</span>
                    <span style={{ color: "white" }}>Ease</span>
                </h2>
                <ul className="menu">
                    <li><Link to="/user-dashboard">Dashboard</Link></li>
                    <li><Link to="/browse-jobs">Browse Jobs</Link></li>
                    <li><Link to="/find-internships" className="active">Find Internships</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                    <li><Link to="/course-and-certificates">Courses & Certificates</Link></li>
                    <li><Link to="/user-profile">User Profile</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    <li><Link to="/logout" className="logout">Logout</Link></li>
                </ul>
            </nav>
            
            {/* Main Content */}
            <div className="main-content">
                <header className="dashboard-header">
                    <div className="welcome-message">Find the Best Internship Opportunities</div>
                    
                </header>

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
                    {filteredInternships.length > 0 ? filteredInternships.map((internship) => (
                        <div key={internship._id} className="internship-card">
                            <h3>{internship.title}</h3>
                            <p><strong>Company:</strong> {internship.company}</p>
                            <p><strong>Location:</strong> {internship.location}</p>
                            <p><strong>Stipend:</strong> {internship.stipend}</p>
                            <p><strong>Type:</strong> {internship.type}</p>
                            <p><strong>Start Date:</strong> {new Date(internship.startDate).toLocaleDateString()}</p>
                            <p><strong>End Date:</strong> {new Date(internship.endDate).toLocaleDateString()}</p>
                            <p><strong>Duration:</strong> {internship.duration} months</p>
                            <p><strong>Description:</strong> {internship.description}</p>
                            <p><strong>Requirements:</strong> {internship.requirements}</p>
                            <button className="apply-btn">Apply Now</button>
                        </div>
                    )) : <p>No internships found.</p>}
                </div>
            </div>
        </div>
    );
};

export default FindInternships;
