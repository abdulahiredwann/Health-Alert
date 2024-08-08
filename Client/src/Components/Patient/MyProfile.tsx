import { CopyIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { MdEdit } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useParams } from "react-router-dom";
import api from "../../Services/api";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import useVaildation from "../../hooks/useValidation";

interface Profile {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  dateOfBirth: string | Date;
  password: string;
}

function MyProfile() {
  useVaildation();

  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);
  const openModalPassword = () => setIsModalOpenPassword(true);
  const closeModalPassword = () => setIsModalOpenPassword(false);
  const { username } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/users/profile/${username}`);
        const data = response.data;

        if (data.dateOfBirth) {
          data.dateOfBirth = new Date(data.dateOfBirth);
        }

        setProfile(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [username]);

  const handleCopy = () => {
    navigator.clipboard.writeText(profile?.username || "N/A");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  return (
    <>
      {isModalOpen && <EditProfile closeModal={closeModal} />}
      {isModalOpenPassword && (
        <ChangePassword closeModal={closeModalPassword}></ChangePassword>
      )}
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="space-y-4 p-6 bg-white shadow-lg rounded-lg w-full max-w-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 border-b pb-2">
            <div className="w-full md:w-1/3 font-semibold">Full Name</div>
            <div className="w-full md:w-2/3">
              <span className="py-1 px-3 text-lg font-medium">
                {profile?.fullName}
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 border-b pb-2">
            <div className="w-full md:w-1/3 font-semibold">Username</div>
            <div className="w-full md:w-2/3 flex items-center space-x-2">
              <code className="bg-gray-100 text-gray-800 py-1 px-2 rounded text-sm">
                {profile?.username}
              </code>
              <button
                onClick={handleCopy}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Copy value"
              >
                <CopyIcon />
              </button>
              {copied && (
                <span className="text-green-500 text-sm">Copied!</span>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 border-b pb-2">
            <div className="w-full md:w-1/3 font-semibold">Phone</div>
            <div className="w-full md:w-2/3">{profile?.phone}</div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 border-b pb-2">
            <div className="w-full md:w-1/3 font-semibold">Email</div>
            <div className="w-full md:w-2/3">
              <a
                href={`mailto:${profile?.email}`}
                className="text-blue-500 hover:underline"
              >
                {profile?.email}
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
            <div className="w-full md:w-1/3 font-semibold">Date of Birth</div>
            <div className="w-full md:w-2/3">
              {profile?.dateOfBirth
                ? profile.dateOfBirth instanceof Date
                  ? profile.dateOfBirth.toDateString()
                  : new Date(profile.dateOfBirth).toDateString()
                : "N/A"}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 mt-4">
            <button
              className="btn btn-outline btn-info flex items-center space-x-2"
              onClick={openModal}
            >
              <MdEdit />
              <span>Edit</span>
            </button>
            <button
              className="btn btn-outline btn-info flex items-center space-x-2"
              onClick={openModalPassword}
            >
              <RiLockPasswordFill />
              <span>Password</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
