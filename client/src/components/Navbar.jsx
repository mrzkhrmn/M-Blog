import { Link, NavLink } from "react-router-dom";
import { Search } from "./Search";
import { FaSearch } from "react-icons/fa";

export const Navbar = () => {
  const activeNavClass = "border border-black px-3 py-1 transition-all";
  const navClass =
    "px-3 py-1  border border-transparent hover:border-b-black transition duration-200";

  return (
    <nav className="flex items-center px-20 py-10 shadow-lg">
      <div className="flex flex-1 justify-center">
        <Link to={"/"} className=" mr-auto flex items-center gap-6">
          <h1 className="text-xl font-thin border border-black flex gap-1 items-center">
            <div>
              <span className="text-2xl font-semibold text-gray-600 p-1">
                M
              </span>
              &apos;s
            </div>
            <span className="text-white bg-black p-1">Blog</span>
          </h1>
        </Link>
      </div>
      <div className="flex gap-6 uppercase tracking-widest">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? activeNavClass : navClass)}
        >
          Home
        </NavLink>
        <NavLink
          to={"/about"}
          className={({ isActive }) => (isActive ? activeNavClass : navClass)}
        >
          About
        </NavLink>
        <NavLink
          to={"/projects"}
          className={({ isActive }) => (isActive ? activeNavClass : navClass)}
        >
          Projects
        </NavLink>
      </div>
      <div className="flex flex-1 justify-center">
        <div className=" ml-auto flex items-center gap-6">
          <Search />
          <NavLink
            to={"/login"}
            className="text-lg uppercase px-6 py-2 border border-black rounded-full hover:bg-black/5 transition-all"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
