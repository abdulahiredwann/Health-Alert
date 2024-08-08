// Navbar.tsx
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { TiThMenuOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Logo from "../../../public/logo.png";
import api from "../../Services/api";
import { useAuth } from "../../Services/Auth"; // Adjust import as needed

interface User {
  fullName: string;
  username: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated) {
        try {
          const response = await api.get(`/users`);
          setUser(response.data);
        } catch (err) {
          console.error(err);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();
  }, [isAuthenticated, setIsAuthenticated]);

  const logout = () => {
    localStorage.removeItem("x-auth-token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const getInitials = (fullName: string) => {
    const names = fullName.split(" ");
    return names.length > 1 ? `${names[0][0]}${names[1][0]}` : `${names[0][0]}`;
  };
  return (
    <div className="navbar  bg-gray-800 text-white">
      <div className="flex-none">
        <details className="dropdown">
          <summary className="btn bg-gray-800 text-white ">
            <TiThMenuOutline size={25} />
          </summary>
          <ul className="menu   bg-gray-800 text-white dropdown-content  rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a href="/about" className="hover:bg-white hover:text-black">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:bg-white hover:text-black">
                Contact
              </a>
            </li>
          </ul>
        </details>
        <img
          style={{ width: "40px", marginRight: "10px" }}
          src={Logo}
          alt="Logo"
        />
      </div>
      <div className="flex-1">
        <a className="text-lg">ABD Tech</a>
        <div>
          <a
            href="/"
            className=" hover:text-gray-400 hidden lg:inline-block px-3 text-base"
          >
            Home
          </a>
          <a
            href="/about"
            className=" hover:text-gray-400  hidden lg:inline-block px-3 text-base"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="hover:text-gray-400  hidden lg:inline-block px-3 text-base"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="flex-none">
        {isAuthenticated ? (
          <details className="dropdown">
            <summary className="flex items-center cursor-pointer">
              <div className="w-12 h-12 bg-gray-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {user ? getInitials(user.fullName) : "U"}
              </div>
              <span className="ml-2  hidden md:inline-block">
                {user?.fullName}
              </span>
            </summary>
            <ul className="menu  bg-gray-800 text-white dropdown-content  rounded-box z-10 w-52 p-2 shadow-lg mt-2 absolute right-0">
              <li>
                <a
                  href={`/patient/profile/${user?.username}`}
                  className=" hover:bg-white hover:text-black flex items-center space-x-2"
                >
                  <CgProfile size={20} />
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <button
                  onClick={logout}
                  className=" hover:bg-white hover:text-black flex items-center space-x-2 w-full text-left"
                >
                  <LuLogOut size={25} />
                  <span>Log Out</span>
                </button>
              </li>
            </ul>
          </details>
        ) : (
          <a href="/login">
            <button className="btn btn-square btn-ghost text-white">
              <LuLogIn size={25} />
            </button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
