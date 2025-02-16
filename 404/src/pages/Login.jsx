import React, { useState } from "react";
import { auth, db } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
// import loginImage from "../assets/loginImage"; // Add an image in /assets

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser, setRole } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const roles = ["student", "faculty"];
      let userRole = null;

      for (const role of roles) {
        const userDoc = await getDoc(doc(db, role, userId));

        if (userDoc.exists()) {
          userRole = role;
          break;
        }
      }

      if (userRole) {
        setUser(userCredential.user);
        setRole(userRole);
        localStorage.setItem("role", userRole);
        navigate(`/${userRole}`, { replace: true });
      } else {
        setError("User role not found. Please contact support.");
      }
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        {/* <Col md={6} className="d-none d-md-block">
          <img src={loginImage} alt="Login" className="img-fluid rounded shadow" />
        </Col> */}

        <Col md={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4 text-primary">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
