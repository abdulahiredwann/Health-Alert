import { useEffect, useRef, useState } from "react";
import api from "../../Services/api";
import toast, { Toaster } from "react-hot-toast";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

interface Patient {
  fullName: string;
  username: string;
  _id: string;
}

function SearchPatient() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [listPatient, setListPatient] = useState<Patient[]>([]);
  const [filteredPatient, setFilteredPatient] = useState<Patient[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const search = async () => {
      try {
        const response = await api.get<Patient[]>("/patient/list");
        setListPatient(response.data);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    search();
  }, []);

  useEffect(() => {
    if (name.trim() === "") {
      setFilteredPatient([]); // Clear list if name is empty
      setShowDropdown(false);
    } else {
      const filtered = listPatient.filter((patient) =>
        patient.username.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredPatient(filtered);
      setShowDropdown(filtered.length > 0);
    }
  }, [name, listPatient]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Toaster />
      <div className="relative w-full max-w-xs">
        <form className="flex items-center">
          <CiSearch className="absolute right-3 text-gray-500 text-2xl" />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Search by Patient Name"
            className="input input-bordered input-primary w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </form>
        {showDropdown && (
          <ul
            ref={dropdownRef}
            className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-w-xs w-full"
          >
            {filteredPatient.map((patient) => (
              <li
                key={patient._id}
                onClick={() => {
                  navigate(`/doctor/dashboard/${patient.username}`);
                  setShowDropdown(false); // Hide dropdown after selection
                }}
                className="cursor-pointer p-2 hover:bg-gray-100 flex items-center justify-between"
              >
                <div className="avatar placeholder">
                  <div className="bg-cyan-700 text-neutral-content w-12 ">
                    <span className="text-3xl">{patient.fullName[0]}</span>
                  </div>
                </div>
                <span>{patient.fullName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default SearchPatient;
