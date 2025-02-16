import React, { useState } from "react";
import { auth, db, storage } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (role === "faculty" && !email.endsWith("@sggs.ac.in")) {
      alert("Faculty must use an official college email (@sggs.ac.in)");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      let profilePhotoURL = "";
      if (profilePhoto) {
        const storageRef = ref(storage, `profilePhotos/${userId}`);
        await uploadBytes(storageRef, profilePhoto);
        profilePhotoURL = await getDownloadURL(storageRef);
      }

      const userData = {
        fullName,
        email,
        role,
        profilePhotoURL,
        createdAt: new Date(),
      };

      if (role === "student") {
        Object.assign(userData, { collegeRegNo, parentEmail, parentPhone, year, branch, club, position });
      }

      if (role === "faculty") {
        Object.assign(userData, { collegeId, phone, department, designation });
      }

      await setDoc(doc(db, role, userId), userData);
      console.log("User Registered:", userData);

      navigate(`/${role}`);
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>

              {/* Student Fields */}
              {role === "student" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">College Registration No</label>
                    <input type="text" className="form-control" value={collegeRegNo} onChange={(e) => setCollegeRegNo(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Parent's Email</label>
                    <input type="email" className="form-control" value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Parent's Phone</label>
                    <input type="text" className="form-control" value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Year</label>
                    <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)} required>
                      <option value="">Select Year</option>
                      <option value="FIRST YEAR">FIRST YEAR</option>
                      <option value="SECOND YEAR">SECOND YEAR</option>
                      <option value="THIRD YEAR">THIRD YEAR</option>
                      <option value="BTECH">BTECH</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Branch</label>
                    <input type="text" className="form-control" value={branch} onChange={(e) => setBranch(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Club</label>
                    <input type="text" className="form-control" value={club} onChange={(e) => setClub(e.target.value)} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Position</label>
                    <input type="text" className="form-control" value={position} onChange={(e) => setPosition(e.target.value)} required />
                  </div>
                </>
              )}

              {/* Faculty Fields */}
              {role === "faculty" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Faculty ID</label>
                    <input type="text" className="form-control" value={collegeId} onChange={(e) => setCollegeId(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Department</label>
                    <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Designation</label>
                    <input type="text" className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Profile Photo</label>
                <input type="file" className="form-control" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files[0])} />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
