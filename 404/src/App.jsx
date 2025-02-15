import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

function PrivateRoute({ children, allowedRoles }) {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student" element={<PrivateRoute allowedRoles={["student"]}><StudentDashboard /></PrivateRoute>} />
          <Route path="/faculty" element={<PrivateRoute allowedRoles={["faculty"]}><FacultyDashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute allowedRoles={["admin"]}><AdminDashboard /></PrivateRoute>} />
          <Route path="/parent" element={<PrivateRoute allowedRoles={["parent"]}><ParentDashboard /></PrivateRoute>} />
          <Route path="/staff" element={<PrivateRoute allowedRoles={["staff"]}><StaffDashboard /></PrivateRoute>} />
          <Route path="/doctor" element={<PrivateRoute allowedRoles={["doctor"]}><DoctorDashboard /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
