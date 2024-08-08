import { useNavigate } from "react-router-dom";
import useVaildation from "../../hooks/useValidation";

function Admin() {
  const navigate = useNavigate();
  useVaildation();
  return (
    <div className="flex items-center justify-center max-h-screen h-screen">
      <div className="space-x-4">
        <button
          className="btn btn-outline"
          onClick={() => {
            navigate("/admin/createpatient");
          }}
        >
          Create Patient
        </button>
        <button
          className="btn btn-outline"
          onClick={() => {
            navigate("/admin/createdoctor");
          }}
        >
          Create Doctor
        </button>
      </div>
    </div>
  );
}

export default Admin;
