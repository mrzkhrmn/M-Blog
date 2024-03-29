import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { OAuth } from "../components/OAuth";

export const Signin = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleFormDataChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(signInStart());
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
        dispatch(signInFailure(data.error));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
      console.log(error.message);
    }
  }

  return (
    <div className="flex flex-col max-w-md mx-auto justify-center border shadow-lg py-16 my-20 rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-20">
        <div className="flex flex-col">
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            type="email"
            placeholder="Email..."
            className="py-2 px-4 bg-transparent border rounded-full outline-none"
            onChange={handleFormDataChange}
          />
        </div>
        <div className="flex flex-col relative">
          <label htmlFor="email">Your password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password..."
            className="py-2 px-4 bg-transparent border rounded-full outline-none"
            onChange={handleFormDataChange}
          />
          <button
            className="absolute right-8 top-9"
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            type="button"
          >
            {showPassword ? (
              <FaRegEye className="absolute text-lg" />
            ) : (
              <FaRegEyeSlash className="absolute text-lg" />
            )}
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="border border-black text-black w-full mt-6 py-2 rounded-lg hover:bg-gray-100"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          <OAuth />
          <p>
            Dont you have an account?{" "}
            <Link to={"/signup"} className="text-blue-500 hover:underline">
              Sign up now!
            </Link>
          </p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};
