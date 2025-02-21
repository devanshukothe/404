import React, { useEffect, useState } from "react";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch(
          "https://404-server-production.up.railway.app/election/candidates",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              access_token: localStorage.getItem("access_token"),
            },
            body: JSON.stringify({ electionId: 1 }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch candidates");
        }
        const data = await response.json();
        setCandidates(data["candidates"]);
      } catch (error) {
        console.error("Error fetching candidates:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div className="container mt-5">
     
<div>
      {loading && <p className="text-center">Loading candidates...</p>}
      {error && <p className="text-center text-danger">{error}</p>}

      {!loading && !error && candidates.length > 0 ? (
        <div className="row justify-content-center">
          {candidates.map((candidate) => (
            <div key={candidate._id || candidate.id} className="col-md-6 mb-4">
              <div className="border p-4 rounded-4 shadow-lg bg-#2d2e30 text-light">
                {/* Candidate Header */}
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={candidate.photo_url || "https://via.placeholder.com/120"}
                    alt={candidate.fullName}
                    className="rounded-circle border border-secondary"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div className="ms-3">
                    <h4 className="mb-0 fw-bold">{candidate.fullName}</h4>
                    <p className="text-muted">{candidate.position}</p>
                  </div>
                </div>

                {/* Candidate Details */}
                <div className="small">
                  <p><strong>Manifesto:</strong> {candidate.manifesto}</p>
                  <p><strong>Proposals:</strong> {Array.isArray(candidate.proposals) ? candidate.proposals.join(", ") : candidate.proposals}</p>
                </div>

                {/* Button Section */}
                <div className="text-center mt-3">
                  <button className="btn btn-primary w-100">View Profile</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p className="text-center">No candidates have registered yet.</p>
      )}
      </div>
    </div>
  );
};

export default CandidateList;
