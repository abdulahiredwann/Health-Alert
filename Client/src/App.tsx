import "./App.css";
import Admin from "./Components/Admin/Admin";
import AdminLogin from "./Components/Admin/AdminLogin";
import CreateDoctor from "./Components/Admin/CreateDoctor";
import CreatePatient from "./Components/Admin/CreatePatient";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPatient from "./Components/Patient/LoginPatient";
import Dashboard from "./Components/Patient/Dashboard";
import Login from "./Components/NavBar/Login";
function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          {" "}
          <NavBar></NavBar>
          <Routes>
            <Route
              path="/adminlogin"
              element={<AdminLogin></AdminLogin>}
            ></Route>
            <Route path="/admin" element={<Admin></Admin>}></Route>
            <Route
              path="/admin/createdoctor"
              element={<CreateDoctor></CreateDoctor>}
            ></Route>
            <Route
              path="/admin/createpatient"
              element={<CreatePatient></CreatePatient>}
            ></Route>
            <Route
              path="/patient/login"
              element={<LoginPatient></LoginPatient>}
            ></Route>
            <Route
              path="/patient/dashboard"
              element={<Dashboard></Dashboard>}
            ></Route>
            <Route path="/login" element={<Login></Login>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
