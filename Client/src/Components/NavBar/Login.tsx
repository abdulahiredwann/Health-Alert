import { useEffect, useState } from "react";
import LoginPatient from "../Patient/LoginPatient";

import LoginAdmin from "../Admin/AdminLogin";
import LoginDoctor from "../Doctor/LoginDoctor";

function Login() {
  const [loginType, setLoginType] = useState("patient");
  useEffect(() => {}, [loginType]);

  const renderLoginForm = () => {
    switch (loginType) {
      case "doctor":
        return <LoginDoctor />;

      case "admin":
        return <LoginAdmin />;

      default:
        return <LoginPatient />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        {renderLoginForm()}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            className={`btn btn-outline ${
              loginType === "patient" ? "btn-active" : ""
            }`}
            onClick={() => setLoginType("patient")}
          >
            Patient Login
          </button>
          <button
            className={`btn btn-outline ${
              loginType === "doctor" ? "btn-active" : ""
            }`}
            onClick={() => setLoginType("doctor")}
          >
            Doctor Login
          </button>
          <button
            className={`btn btn-outline ${
              loginType === "admin" ? "btn-active" : ""
            }`}
            onClick={() => setLoginType("admin")}
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
