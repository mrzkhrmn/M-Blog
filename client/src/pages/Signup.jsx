import { Link } from "react-router-dom";

export const Signup = () => {
  return (
    <div className="flex flex-col max-w-md mx-auto justify-center border shadow-lg py-6 mt-20 rounded-lg">
      <div className="flex flex-col gap-6 px-20">
        <div className="flex flex-col">
          <label htmlFor="username">Your username</label>
          <input
            id="username"
            type="text"
            placeholder="Username..."
            className="py-2 px-4 bg-transparent border rounded-full w-full outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Your email</label>
          <input
            id="email"
            type="email"
            placeholder="Email..."
            className="py-2 px-4 bg-transparent border rounded-full outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Your password</label>
          <input
            id="password"
            type="password"
            placeholder="Password..."
            className="py-2 px-4 bg-transparent border rounded-full outline-none"
          />
        </div>
      </div>
      <div className="px-20 flex flex-col gap-4">
        <button className="bg-blue-400 text-white text-lg w-full mt-6 py-2 rounded-lg hover:bg-blue-500">
          Signup
        </button>
        <p>
          You already have an account?{" "}
          <Link className="text-blue-500 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};
