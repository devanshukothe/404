import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/faculty" element={<FacultyDashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
