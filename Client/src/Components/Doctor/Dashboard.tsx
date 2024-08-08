import { useParams } from "react-router-dom";
import SearchPatient from "./SearchPatient";
import PatientDeltais from "./PatientDeltais";
import useVaildation from "../../hooks/useValidation";

function Dashboard() {
  const { username } = useParams();
  useVaildation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-screen">
      {/* Left Column: Search Component */}
      <div className="md:col-span-1 flex  justify-center p-4">
        <div className="w-full">{<SearchPatient></SearchPatient>}</div>
      </div>

      {/* Right Column: Welcome and Patient Details */}
      <div className="md:col-span-2 flex flex-col">
        {/* Patient Details */}
        <div className=" p-4 flex-grow">
          <PatientDeltais username={username}></PatientDeltais>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
