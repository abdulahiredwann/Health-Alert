import { useState } from "react";
import "./App.css";
import AdminLogin from "./Components/Admin/AdminLogin";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <div>
        {" "}
        <NavBar></NavBar>
        <AdminLogin></AdminLogin>
      </div>
    </>
  );
}

export default App;
