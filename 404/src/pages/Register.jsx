import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [fullName, setFullName] = useState("");
  const [collegeRegNo, setCollegeRegNo] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [club, setClub] = useState("");
  const [position, setPosition] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (role === "faculty" && !email.endsWith("@sggs.ac.in")) {
      setError("Faculty must use an official college email (@sggs.ac.in)");
      return;
    }

    try {
      // If profile photo is selected, upload it and get the URL
      let profilePhoto = "";
      // if (profilePhoto) {
      //   // Example: Send the photo to the server or cloud and get the URL
      //   const formData = new FormData();
      //   formData.append("profilePhoto", profilePhoto);
      //   const uploadResponse = await fetch("http://localhost:5000/upload-photo", {
      //     method: "POST",
      //     body: formData,
      //   });
      //   const uploadData = await uploadResponse.json();
      //   profilePhoto = uploadData.photoURL; // Assuming the server returns the uploaded photo's URL
      // }

      const userData = {
        email,
        password,
        fullName,
        profilePhoto, // URL of uploaded profile photo
       
      };

      const newUser ={
        role,
        data:userData,
      }

      // Add student or faculty specific fields
      if (role === "student") {
        userData.collegeRegNo = collegeRegNo;
        userData.parentEmail = parentEmail;
        userData.parentPhone = parentPhone;
        userData.year = year;
        userData.branch = branch;
        userData.club = club;
        userData.position = position;
      }

      if (role === "faculty") {
        userData.collegeId = collegeId;
        userData.phone = phone;
        userData.department = department;
        userData.designation = designation;
      }

      // Send registration data as JSON
      const response = await fetch("https://404-server-production.up.railway.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registration Success:", data.message);
        navigate(`/${role}`);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Registration failed", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <motion.div 
      className="container mt-5" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}>
      
      <div className="row justify-content-center">
        <div className="col-md-20">
          <div className="card shadow-lg p-4 rounded-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: '10px' }}>
            <h2 className="text-center text-white mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label text-white">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Full Name</label>
                <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>

              {/* Student Fields */}
              {role === "student" && (
                <>
                  <div className="mb-3">
                    <label className="form-label text-white">College Registration No</label>
                    <input type="text" className="form-control" value={collegeRegNo} onChange={(e) => setCollegeRegNo(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Parent's Email</label>
                    <input type="email" className="form-control" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Parent's Phone</label>
                    <input type="text" className="form-control" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Year</label>
                    <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)} required>
                      <option value="">Select Year</option>
                      <option value="FIRST YEAR">FIRST YEAR</option>
                      <option value="SECOND YEAR">SECOND YEAR</option>
                      <option value="THIRD YEAR">THIRD YEAR</option>
                      <option value="BTECH">BTECH</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Branch</label>
                    <input type="text" className="form-control" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Club</label>
                    <input type="text" className="form-control" value={club} onChange={(e) => setClub(e.target.value)} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Position</label>
                    <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} required />
                  </div>
                </>
              )}

              {/* Faculty Fields */}
              {role === "faculty" && (
                <>
                  <div className="mb-3">
                    <label className="form-label text-white">Faculty ID</label>
                    <input type="text" className="form-control" value={collegeId} onChange={(e) => setCollegeId(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Phone Number</label>
                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Department</label>
                    <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-white">Designation</label>
                    <input type="text" className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label text-white">Profile Photo</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} />
              </div>

              <div className="mb-3">
                <label className="form-label text-white">Role</label>
                <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              <button type="submit" className="btn btn-danger w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;