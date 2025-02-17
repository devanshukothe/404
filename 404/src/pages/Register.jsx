import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "email" : email, "password" : password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Registration Success:", data);
        navigate("/login"); // Redirect to login page after registration
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <a href="/login" className="text-decoration-none">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;