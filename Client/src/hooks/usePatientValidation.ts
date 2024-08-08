import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";

interface Props {
  username: string | null;
}

const usePatientValidation = ({ username }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("x-auth-token");
        if (!token) throw new Error("No Token found");

        // Ensure the endpoint matches the one defined in your backend
        const response = await api.get(`/validate/patient/${username}`, {
          headers: { "x-auth-token": token },
        });
        console.log("Response:", response); // Check response from API

        if (!response.data.validTeacher) throw new Error("Invalid Token");
      } catch (err) {
        console.error(err); // Log any errors for debugging
        navigate("/login"); // Redirect to login page if token is invalid
      }
    };

    if (username) {
      verifyToken();
    }
  }, [navigate, username]); // Add `username` to the dependency array
};

export default usePatientValidation;
