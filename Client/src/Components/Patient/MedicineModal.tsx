import React from "react";
import { Medicine } from "./Dashboard";

interface MedicineModalProps {
  medicine: Medicine;
  onClose: () => void;
}

const MedicineModal: React.FC<MedicineModalProps> = ({ medicine, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center  p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Medicine Details</h2>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-1/3">Name:</span>
            <span className="text-gray-600">{medicine.name}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-1/3">Dosage:</span>
            <span className="text-gray-600">{medicine.dosage}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-1/3">
              Frequency:
            </span>
            <span className="text-gray-600">{medicine.frequency}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-1/3">
              Start Date:
            </span>
            <span className="text-gray-600">
              {new Date(medicine.start_date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold text-gray-700 w-1/3">End Date:</span>
            <span className="text-gray-600">
              {new Date(medicine.end_date).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineModal;
