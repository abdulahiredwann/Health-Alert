import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import api from "../../Services/api";
import MedicineModal from "./MedicineModal";

export interface Medicine {
  _id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date: string; // ISO date strings
  end_date: string; // ISO date strings
}

function Dashboard() {
  const [currentMedicine, setCurrentMedicine] = useState<Medicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    const fetchMedicine = async (username: string) => {
      if (username) {
        try {
          const response = await api.get(
            `/patient/currentmedicine/${username}`
          );
          console.log("Fetched medicines:", response.data.medications); // Log fetched data
          setCurrentMedicine(response.data.medications);
        } catch (error) {
          toast.error("Something went wrong");
        }
      } else {
        toast.error("Username not found!");
      }
    };
    fetchMedicine(username || "");
  }, [username]);

  const calculateProgress = (start: Date, end: Date): number => {
    const currentDate = new Date();
    if (end < start) {
      console.warn("End date is before start date");
      return 0;
    }

    const totalDuration = end.getTime() - start.getTime();
    const elapsedDuration = currentDate.getTime() - start.getTime();

    // Calculate progress percentage
    return Math.min(Math.max((elapsedDuration / totalDuration) * 100, 0), 100);
  };

  const handleSeeDetails = (medicine: Medicine) => {
    console.log("Selected medicine:", medicine);
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMedicine(null);
  };

  return (
    <div className="p-2">
      <h1 className="text-2xl text-center font-bold mb-4">Current Medicine</h1>
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-4">
        {currentMedicine.map((medicine) => {
          const startDate = new Date(medicine.start_date);
          const endDate = new Date(medicine.end_date);
          const progress = calculateProgress(startDate, endDate);

          return (
            <div
              key={medicine._id}
              className="card bg-base-100 shadow-xl flex-1 min-w-[300px]"
            >
              <div className="card-body">
                <h2 className="card-title text-xl font-semibold">
                  {medicine.name}
                </h2>
                <p>{medicine.frequency}</p>
                <p className="mt-2 text-sm">Progress: {progress.toFixed(2)}%</p>

                <div className="card-actions justify-between mt-4">
                  <progress
                    className="progress progress-primary w-56"
                    value={progress}
                    max="100"
                  ></progress>
                  <button
                    className="btn btn-outline"
                    onClick={() => handleSeeDetails(medicine)}
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && selectedMedicine && (
        <MedicineModal medicine={selectedMedicine} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Dashboard;
