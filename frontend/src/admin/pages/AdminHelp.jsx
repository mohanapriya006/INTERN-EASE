import React, { useState } from "react";
import "../styles/AdminPages.css";

const AdminHelp = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "How do I reset a user's password?", answer: "Go to Admin Settings → Users → Reset Password." },
    { question: "How can I view internship applications?", answer: "Navigate to Manage Internships → Applications." },
    { question: "How do I add a new job posting?", answer: "Go to Manage Jobs → Add New Job and fill in the details." },
    { question: "How to block a suspicious user?", answer: "Go to Manage Users → Select user → Click 'Block'." },
    { question: "How can I send bulk emails?", answer: "Use the Bulk Email option under Notifications." },
    { question: "How do I add a new admin account?", answer: "Go to Admin Settings → Add Admin → Fill form." },
    { question: "How do I delete an old internship listing?", answer: "Go to Manage Internships → Select → Delete." },
    { question: "How can I access the database?", answer: "Access the database via the Admin Panel → Database." },
    { question: "How do I export user data?", answer: "Use the Export option under Users Management." },
    { question: "How to customize email templates?", answer: "Navigate to Email Templates → Edit Template." },
    { question: "How do I update company details?", answer: "Go to Settings → Company Info → Edit." },
    { question: "How do I monitor site analytics?", answer: "Access the Analytics section from the dashboard." },
    { question: "How do I clear cache data?", answer: "Go to Admin Settings → Clear Cache." },
    { question: "How to manage subscriptions?", answer: "Navigate to Subscriptions → Manage Plans." },
    { question: "How to report a bug?", answer: "Go to Support → Report Issue." },
    { question: "How can I view transaction history?", answer: "Go to Payments → View History." },
    { question: "How do I manage push notifications?", answer: "Navigate to Notifications → Push Settings." },
    { question: "How to enable two-factor authentication?", answer: "Go to Security → 2FA → Enable." },
    { question: "How do I manage GDPR compliance?", answer: "Navigate to Privacy → GDPR Settings." },
    { question: "How to add new categories?", answer: "Go to Manage Categories → Add New → Save." }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container">
      <h2>Admin Help & FAQs</h2>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <h3>{faq.question}</h3>
              <span>{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHelp;
