import { useSelector } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

export const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="max-w-2xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-4 border p-8 shadow-lg">
        <img
          src={currentUser.profilePicture}
          alt="user profile pic"
          className="w-[5rem] rounded-full border-2 border-black"
        />
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username..."
            defaultValue={currentUser.username}
            className="border border-black bg-gray-100 px-2 py-2 rounded-md w-[20rem]"
          />
          <input
            type="email"
            placeholder="Email..."
            defaultValue={currentUser.email}
            className="border border-black bg-gray-100 px-2 py-2 rounded-md w-[20rem]"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              className="border border-black bg-gray-100 px-2 py-2 rounded-md w-[20rem]"
            />
            <button
              onClick={() => setShowPassword((showPassword) => !showPassword)}
              className="absolute top-2.5 text-xl right-2"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <button className="border border-black py-2 hover:bg-gray-100">
            Update Profile
          </button>
          <div className="flex justify-between text-red-600">
            <button className="hover:underline">Sign Out</button>
            <button className="hover:underline">Delete User</button>
          </div>
        </div>
      </div>
    </div>
  );
};
