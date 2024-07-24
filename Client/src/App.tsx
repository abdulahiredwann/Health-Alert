import "./App.css";
import Admin from "./Components/Admin/Admin";
import AdminLogin from "./Components/Admin/AdminLogin";
import CreateDoctor from "./Components/Admin/CreateDoctor";
import NavBar from "./Components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
