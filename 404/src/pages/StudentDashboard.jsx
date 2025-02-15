import React, { useState, useEffect } from "react";
import { db, auth, collection, getDocs, doc, setDoc } from "../services/firebase";

function StudentDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

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

  return (
    <div>
      <h2>Welcome to Student Dashboard</h2>
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