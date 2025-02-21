import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import { useAuth } from "./context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import CandidateForm from "./pages/election/CandidateForm";
import StudentProfile from "./pages/profiles/StudentProfile";
import SubmitComplaint from "./pages/profiles/complaints/SubmitComplaint";
import CheatingForm from "./pages/cheating/CheatingForm";

function PrivateRoute({ children, allowedRoles }) {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Home />} />
        <Route path="/candidate" element={<CandidateForm />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/complaint" element={<SubmitComplaint />} />
        <Route path="/cheating" element={<CheatingForm />} />
        {/* Private Routes */}
        <Route path="/faculty" element={
          <PrivateRoute allowedRoles={["faculty"]}>
            <FacultyDashboard />
          </PrivateRoute>
        }/>

        <Route path="/admin" element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }/>

        <Route path="/parent" element={
          <PrivateRoute allowedRoles={["parent"]}>
            <ParentDashboard />
          </PrivateRoute>
        }/>

        <Route path="/staff" element={
          <PrivateRoute allowedRoles={["staff"]}>
            <StaffDashboard />
          </PrivateRoute>
        }/>

        <Route path="/doctor" element={
          <PrivateRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          </PrivateRoute>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
