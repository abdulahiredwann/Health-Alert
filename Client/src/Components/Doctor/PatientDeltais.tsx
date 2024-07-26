import { useEffect, useState } from "react";
import api from "../../Services/api";
import toast from "react-hot-toast";
import AddMedicine from "./AddMedicine";

interface Props {
  username?: string;
}

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  start_date: Date;
  end_date: Date;
  notes: string;
}

function PatientDeltais({ username }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [currentMedicine, setCurrentMedicine] = useState<Medicine[]>([]);

  useEffect(() => {
    const getMedicine = async () => {
      try {
        if (username && username?.length >= 1) {
          const response = await api.get(
            `/patient/currentmedicine/${username}`
          );
          setCurrentMedicine(response.data.medications);
        }
      } catch (err) {
        toast.error("Something Wrong");
      }
    };
    getMedicine();
  }, [username]);
  return (
    <>
      <div>
        <button className="btn btn-outline" onClick={openModal}>
          Add Medicine
        </button>

        {isModalOpen && <AddMedicine closeModal={closeModal} />}
        <h2 className="text-center text-nowrap text-2xl font-bold text-gray-800 mb-6">
          Current Medication
        </h2>
        <div className="overflow-x-auto">
          <table className="table w-full bg-white border border-gray-200 rounded-lg shadow-md">
            {/* head */}
            <thead className="bg-blue-600">
              <tr>
                <th className="hidden md:table-cell"></th>
                <th>Name</th>
                <th className="hidden md:table-cell">Dosage</th>
                <th className="hidden md:table-cell">Frequency</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th className="hidden md:table-cell">Note</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {currentMedicine.map((current, index) => (
                <tr key={current.name}>
                  <td className="hidden md:table-cell">{index + 1}</td>
                  <td>{current.name}</td>
                  <td className="hidden md:table-cell">{current.dosage}</td>
                  <td className="hidden md:table-cell">{current.frequency}</td>
                  <td>{new Date(current.start_date).toDateString()}</td>
                  <td>{new Date(current.end_date).toDateString()}</td>
                  <td className="hidden md:table-cell">{current.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default PatientDeltais;
