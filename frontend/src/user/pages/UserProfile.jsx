import React, { useState } from "react";
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
      {/* Profile Card */}
      <ProfileCard 
        user={user} 
        isEditing={isEditing} 
        handleChange={handleChange} 
        saveProfile={saveProfile} 
        setIsEditing={setIsEditing} 
      />

      {/* Applied Jobs */}
      <Section title="Applied Jobs" data={appliedJobs} emptyMsg="No jobs applied yet." />

      {/* Applied Internships */}
      <Section title="Applied Internships" data={appliedInternships} emptyMsg="No internships applied yet." />

      {/* Certificates */}
      <div className="applied-section">
        <h2>Certificates - Enrolled & Acquired</h2>
        
        <CertificateList title="📖 Learning" certificates={learningCertificates} emptyMsg="No courses enrolled." />
        <CertificateList title="🏆 Acquired" certificates={acquiredCertificates} emptyMsg="No certificates acquired yet." />
      </div>
    </div>
  );
};

export default UserProfile;

const ProfileCard = ({ user, isEditing, handleChange, saveProfile, setIsEditing }) => {
  return (
    <div className="profile-card">
      <img src="https://via.placeholder.com/150" alt="Profile" className="profile-pic" />

      {isEditing ? (
        <div className="edit-profile">
          <InputField name="name" value={user.name} onChange={handleChange} placeholder="Name" />
          <InputField name="age" value={user.age} onChange={handleChange} placeholder="Age" />
          <InputField name="qualification" value={user.qualification} onChange={handleChange} placeholder="Qualification" />
          <InputField name="pronouns" value={user.pronouns} onChange={handleChange} placeholder="Pronouns" />
          <textarea name="description" value={user.description} onChange={handleChange} placeholder="Describe yourself"></textarea>
          <InputField name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" />
          <InputField name="email" value={user.email} onChange={handleChange} placeholder="Email" />
          <InputField name="linkedin" value={user.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
          <InputField name="leetcode" value={user.leetcode} onChange={handleChange} placeholder="LeetCode Profile" />
          <InputField name="github" value={user.github} onChange={handleChange} placeholder="GitHub Profile" />

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
  );
};

const InputField = ({ name, value, onChange, placeholder }) => (
  <input 
    type="text" 
    name={name} 
    value={value} 
    onChange={onChange} 
    placeholder={placeholder} 
  />
);

const Section = ({ title, data, emptyMsg }) => (
  <div className="applied-section">
    <h2>{title}</h2>
    {data.length > 0 ? (
      <div className="job-list">
        {data.map((item, index) => (
          <div key={index} className="job-card">
            <h3>{item.title}</h3>
            <p><strong>Company:</strong> {item.company}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="no-data">{emptyMsg}</p>
    )}
  </div>
);

const CertificateList = ({ title, certificates, emptyMsg }) => (
  <div>
    <h3>{title}</h3>
    {certificates.length > 0 ? (
      <ul>
        {certificates.map((cert, index) => <li key={index}>{cert}</li>)}
      </ul>
    ) : <p className="no-data">{emptyMsg}</p>}
  </div>
);
