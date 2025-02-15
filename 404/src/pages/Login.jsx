import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, db, getDoc, doc } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "students", userId)) ||
                      await getDoc(doc(db, "faculties", userId)) ||
                      await getDoc(doc(db, "admins", userId)) ||
                      await getDoc(doc(db, "parents", userId)) ||
                      await getDoc(doc(db, "staff", userId)) ||
                      await getDoc(doc(db, "doctors", userId));

      if (userDoc.exists()) {
        const role = userDoc.data().role;
        
        // Navigate based on role
        navigate(`/${role}`);
      } else {
        console.error("User role not found");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
