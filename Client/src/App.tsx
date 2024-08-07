import "./App.css";
import Admin from "./Components/Admin/Admin";
import AdminLogin from "./Components/Admin/AdminLogin";
import CreateDoctor from "./Components/Admin/CreateDoctor";
import CreatePatient from "./Components/Admin/CreatePatient";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPatient from "./Components/Patient/LoginPatient";
import Dashboard from "./Components/Patient/Dashboard";
import DoctorDashboard from "./Components/Doctor/Dashboard";
import Login from "./Components/NavBar/Login";
import LoginDoctor from "./Components/Doctor/LoginDoctor";
import { AuthProvider } from "./Services/Auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <NavBar />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/createdoctor" element={<CreateDoctor />} />
            <Route path="/admin/createpatient" element={<CreatePatient />} />

            <Route
              path="/patient/dashboard/:username?"
              element={<Dashboard />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/doctor/login" element={<LoginDoctor />} />
            <Route
              path="/doctor/dashboard/:username?"
              element={<DoctorDashboard />}
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
