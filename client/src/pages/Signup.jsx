import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export const Signup = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function handleFormDataChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.error) {
        console.log(data.error);
        return setErrorMessage(data.error);
      }
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col max-w-md mx-auto justify-center border shadow-lg py-6 mt-20 rounded-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-20">
        <div className="flex flex-col">
          <label htmlFor="username">Your username</label>
          <input
            id="username"
            type="text"
            placeholder="Username..."
            className="py-2 px-4 bg-transparent border rounded-full w-full outline-none"
            onChange={handleFormDataChange}
          />
        </div>
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
            className="bg-blue-400 text-white text-lg w-full mt-6 py-2 rounded-lg hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </button>
          <p>
            You already have an account?{" "}
            <Link className="text-blue-500 hover:underline">Sign in</Link>
          </p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
      </form>
    </div>
  );
};
