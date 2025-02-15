import React, { useState } from "react";
import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [fullName, setFullName] = useState("");
  const [collegeRegNo, setCollegeRegNo] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [yearBranch, setYearBranch] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userData = {

        role,
        createdAt: new Date()
      };

      if (role === "student") {
        userData.fullName = fullName;
        userData.collegeRegNo = collegeRegNo;
        userData.parentEmail = parentEmail;
        userData.parentPhone = parentPhone;
        userData.yearBranch = yearBranch;
      }

      await setDoc(doc(db, role, userId), userData);
      console.log(userData);
      navigate(`/${role}`);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {role === "student" && (
          <>
            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <input type="text" placeholder="College Registration No" value={collegeRegNo} onChange={(e) => setCollegeRegNo(e.target.value)} required />
            <input type="email" placeholder="Parent's Email" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required />
            <input type="text" placeholder="Parent's Phone" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required />
            <input type="text" placeholder="Year & Branch" value={yearBranch} onChange={(e) => setYearBranch(e.target.value)} required />
          </>
        )}
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="admin">Admin</option>
          <option value="parent">Parent</option>
          <option value="staff">Staff</option>
          <option value="doctor">Doctor</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;