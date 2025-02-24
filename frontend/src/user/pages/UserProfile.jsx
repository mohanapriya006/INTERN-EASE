import React, { useState, useEffect } from "react";
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("userData")) || {
      name: "Guest User",
      age: "",
      qualification: "",
      pronouns: "",
      description: "",
      phone: "",
      email: "Not Provided",
      linkedin: "",
      leetcode: "",
      github: "",
    };
  });

  const [isEditing, setIsEditing] = useState(false);

  const [appliedJobs, setAppliedJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedJobs")) || [];
  });

  const [appliedInternships, setAppliedInternships] = useState(() => {
    return JSON.parse(localStorage.getItem("appliedInternships")) || [];
  });

  const [learningCertificates, setLearningCertificates] = useState(() => {
    return JSON.parse(localStorage.getItem("learningCertificates")) || [];
  });

  const [acquiredCertificates, setAcquiredCertificates] = useState(() => {
    return JSON.parse(localStorage.getItem("acquiredCertificates")) || [];
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    localStorage.setItem("userData", JSON.stringify(user));
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-pic" />

        {isEditing ? (
          <div className="edit-profile">
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" />
            <input type="text" name="age" value={user.age} onChange={handleChange} placeholder="Age" />
            <input type="text" name="qualification" value={user.qualification} onChange={handleChange} placeholder="Qualification" />
            <input type="text" name="pronouns" value={user.pronouns} onChange={handleChange} placeholder="Pronouns" />
            <textarea name="description" value={user.description} onChange={handleChange} placeholder="Describe yourself"></textarea>
            <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" />
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" />
            <input type="text" name="linkedin" value={user.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
            <input type="text" name="leetcode" value={user.leetcode} onChange={handleChange} placeholder="LeetCode Profile" />
            <input type="text" name="github" value={user.github} onChange={handleChange} placeholder="GitHub Profile" />

            <div className="button-container">
              <button className="save-btn" onClick={saveProfile}>Save</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <>
            <h1>{user.name}</h1>
            <p><strong>Age:</strong> {user.age || "N/A"}</p>
            <p><strong>Qualification:</strong> {user.qualification || "N/A"}</p>
            <p><strong>Pronouns:</strong> {user.pronouns || "N/A"}</p>
            <p className="bio"><strong>About:</strong> {user.description || "Tell us about yourself"}</p>
            <p><strong>📞 Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>📧 Email:</strong> {user.email}</p>
            <p><strong>🔗 LinkedIn:</strong> <a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin || "N/A"}</a></p>
            <p><strong>💻 LeetCode:</strong> <a href={user.leetcode} target="_blank" rel="noopener noreferrer">{user.leetcode || "N/A"}</a></p>
            <p><strong>🚀 GitHub:</strong> <a href={user.github} target="_blank" rel="noopener noreferrer">{user.github || "N/A"}</a></p>

            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>

      {/* Applied Jobs Section */}
      <div className="applied-section">
        <h2>Applied Jobs</h2>
        {appliedJobs.length > 0 ? (
          <div className="job-list">
            {appliedJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <p><strong>Company:</strong> {job.company}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No jobs applied yet.</p>
        )}
      </div>

      {/* Applied Internships Section */}
      <div className="applied-section">
        <h2>Applied Internships</h2>
        {appliedInternships.length > 0 ? (
          <div className="job-list">
            {appliedInternships.map((internship, index) => (
              <div key={index} className="job-card">
                <h3>{internship.title}</h3>
                <p><strong>Company:</strong> {internship.company}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">No internships applied yet.</p>
        )}
      </div>

      {/* Certificates Section */}
      <div className="applied-section">
        <h2>Certificates - Enrolled & Acquired</h2>
        
        <h3>📖 Learning</h3>
        {learningCertificates.length > 0 ? (
          <ul>
            {learningCertificates.map((cert, index) => <li key={index}>{cert}</li>)}
          </ul>
        ) : <p className="no-data">No courses enrolled.</p>}
        
        <h3>🏆 Acquired</h3>
        {acquiredCertificates.length > 0 ? (
          <ul>
            {acquiredCertificates.map((cert, index) => <li key={index}>{cert}</li>)}
          </ul>
        ) : <p className="no-data">No certificates acquired yet.</p>}
      </div>
    </div>
  );
};

export default UserProfile;
