import React, { useState, useEffect } from "react";
import { db, auth } from "../services/firebase";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidatesCollection = collection(db, "candidates");
      const snapshot = await getDocs(candidatesCollection);
      setCandidates(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCandidates();
  }, []);

  const voteForCandidate = async (candidateId) => {
    if (!hasVoted) {
      await setDoc(doc(db, "votes", auth.currentUser.uid), { candidateId });
      setHasVoted(true);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.clear();  // Clears any stored tokens or user data
      sessionStorage.clear(); // Clears session storage if used
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      <h2>Welcome, {user?.email} to Student Dashboard</h2>
      <button onClick={handleLogout} style={{ background: "red", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
        Logout
      </button>
      <h3>Election Candidates</h3>
      {candidates.map((candidate) => (
        <div key={candidate.id}>
          <p>{candidate.name} - {candidate.position}</p>
          <button onClick={() => voteForCandidate(candidate.id)} disabled={hasVoted}>Vote</button>
        </div>
      ))}
    </div>
  );
}

export default StudentDashboard;
