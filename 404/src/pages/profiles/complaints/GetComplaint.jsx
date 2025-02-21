import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GetComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    const fetchComplaints = async () => {
      if (!accessToken) {
        setError("Access token is required. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch("http://192.168.1.5:8000/complaints/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "access_token": accessToken,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch complaints");
        }
        const data = await response.json();
        setComplaints(data.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, [accessToken]);

  return (
    <div className="container mt-4">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white text-center">
          <h2>Complaints List</h2>
        </div>
        <div className="card-body">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-danger text-center">{error}</p>}
          {!loading && !error && complaints.length > 0 ? (
            <div className="row">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="col-md-6 mb-3">
                  <div className="card border-primary">
                    <div className="card-body">
                      <p className="card-text fs-4">{complaint.complaint}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No complaints found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetComplaint;
