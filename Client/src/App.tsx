import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admin/Admin";
import CreateDoctor from "./Components/Admin/CreateDoctor";
import CreatePatient from "./Components/Admin/CreatePatient";
import DoctorDashboard from "./Components/Doctor/Dashboard";
import Login from "./Components/NavBar/Login";
import NavBar from "./Components/NavBar/NavBar";
import Dashboard from "./Components/Patient/Dashboard";
import { AuthProvider } from "./Services/Auth";
import MyProfile from "./Components/Patient/MyProfile";

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
            <Route path="/patient/profile/:username?" element={<MyProfile />} />
            <Route path="/login" element={<Login />} />
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
