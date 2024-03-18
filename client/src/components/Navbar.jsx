import { Link, NavLink } from "react-router-dom";
import { Search } from "./Search";
import { Logo } from "./Logo";
import { Avatar, Dropdown } from "flowbite-react";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const activeNavClass = "border border-black px-3 py-1 transition-all";
  const navClass =
    "px-3 py-1  border border-transparent hover:border-b-black transition duration-200";

  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="flex items-center px-20 py-10 shadow-lg">
      <div className="flex flex-1 justify-center">
        <Logo />
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
        <div className=" ml-auto flex items-center gap-4">
          <Search />
          {currentUser ? (
            <div>
              <Dropdown
                color={"transparent"}
                label={
                  <Avatar alt="user" img={currentUser.profilePicture} rounded />
                }
                arrowIcon={false}
              >
                <Dropdown.Header>
                  <span className="block text-sm">@{currentUser.username}</span>
                  <span className="block truncate text-sm font-medium">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to={"/dashboard?tab=profile"}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            <NavLink
              to={"/login"}
              className="text-lg uppercase px-6 py-2 border border-black rounded-full hover:bg-black/5 transition-all"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
