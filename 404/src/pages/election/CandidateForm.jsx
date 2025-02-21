import React, { useState } from "react";

const CandidateForm = () => {
  const [formData, setFormData] = useState({
    manifesto: "",
    proposals: "",
    photo: null,
  });
  const [uploading, setUploading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let photoURL = "";
      if (formData.photo) {
        photoURL = URL.createObjectURL(formData.photo); // Temporary for testing
      }

      const response = await fetch("https://404-server-production.up.railway.app/election/apply_as_candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access_token": localStorage.getItem("access_token")
        },
        body: JSON.stringify({
          electionId: 1,
          manifesto: formData.manifesto,
          proposals: formData.proposals,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Candidate registered successfully!");
        setFormData({ manifesto: "", proposals: "", photo: null });
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error registering candidate: ", error);
      alert("Failed to register. Try again.");
    }

    setUploading(false);
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg p-4 rounded-4" style={{ maxWidth: "500px", width: "100%", border: "none" }}>
        <h2 className="text-center mb-4 text-primary fw-bold">Candidate Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Manifesto</label>
            <textarea name="manifesto" className="form-control" value={formData.manifesto} onChange={handleChange} required style={{ minHeight: "100px" }} />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Proposals</label>
            <input type="text" name="proposals" className="form-control" value={formData.proposals} onChange={handleChange} required />
          </div>
         
          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={uploading} style={{ transition: "0.3s" }}>
            {uploading ? "Uploading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
