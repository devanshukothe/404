import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CheatingList from "./CheatingList";

const CheatingForm = () => {
  const [formData, setFormData] = useState({
    collegeRegNo: "",
    reason: "",
    proofUrl: "",
    date: "",
    examination: "",
    invigilatorCollegeId: "",
    subject: "",
    semester: "",
  });

  const placeholders = {
    collegeRegNo: "Enter student's registration number",
    reason: "Describe the reason for reporting",
    proofUrl: "Provide a link to proof (if available)",
    date: "Select the date of the incident",
    examination: "Enter the name of the examination",
    invigilatorCollegeId: "Enter your college ID",
    subject: "Enter the subject name",
    semester: "Enter the semester (e.g., 4th, 6th)",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://your-api-url.com/cheating-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit the report");
      }
      alert("Cheating report submitted successfully");
      setFormData({
        collegeRegNo: "",
        reason: "",
        proofUrl: "",
        date: "",
        examination: "",
        invigilatorCollegeId: "",
        subject: "",
        semester: "",
      });
    } catch (error) {
      console.error("Error submitting the report:", error);
      alert("Submission failed: " + error.message);
    }
  };

  return (
    <>
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h2>Report Cheating</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div className="form-group mb-3" key={key}>
                <label className="form-label" htmlFor={key}>
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={key}
                  name={key}
                  placeholder={placeholders[key]}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary w-100">
              Submit Report
            </button>
          </form>
        </div>
      </div>
      
    </div>
    <CheatingList />
    </>
 );
};

export default CheatingForm;
