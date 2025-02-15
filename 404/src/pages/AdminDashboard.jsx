import React, { useState, useEffect } from "react";
import { db, collection, getDocs, doc, setDoc } from "../services/firebase";

function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [electionResults, setElectionResults] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidatesCollection = collection(db, "candidates");
      const snapshot = await getDocs(candidatesCollection);
      setCandidates(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCandidates();
  }, []);

  const declareResults = async () => {
    const votesCollection = collection(db, "votes");
    const snapshot = await getDocs(votesCollection);
    const voteCounts = {};
    snapshot.docs.forEach(doc => {
      const { candidateId } = doc.data();
      voteCounts[candidateId] = (voteCounts[candidateId] || 0) + 1;
    });
    setElectionResults(Object.entries(voteCounts));
  };

  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      <h3>Manage Elections</h3>
      <button onClick={declareResults}>Declare Results</button>
      <h3>Election Results</h3>
      {electionResults.map(([id, count]) => (
        <p key={id}>Candidate {id}: {count} votes</p>
      ))}
    </div>
  );
}

export default AdminDashboard;