import { TiThMenuOutline } from "react-icons/ti";
import { LuLogIn } from "react-icons/lu";
import Logo from "../../../public/logo.png";
const Navbar = () => {
  return (
    <div className="navbar ">
      <div className="flex-none">
        <details className="dropdown">
          <summary className="btn bg-white">
            {" "}
            <TiThMenuOutline size={"25"} />
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Contact</a>
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
        <a className="text-lg">ABD tech</a>
        <div className="">
          <a href="/" className="hidden lg:inline-block px-4 text-base">
            Home
          </a>
          <a href="/" className="hidden lg:inline-block px-4 text-base">
            About Us
          </a>
          <a href="/" className="hidden lg:inline-block px-4 text-base">
            Contact
          </a>
        </div>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <LuLogIn size={25} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
