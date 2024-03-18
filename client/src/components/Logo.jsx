import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to={"/"} className=" mr-auto flex items-center gap-6">
      <h1 className="text-xl font-thin border border-black flex gap-1 items-center">
        <div>
          <span className="text-2xl font-semibold text-gray-600 p-1">M</span>
          &apos;s
        </div>
        <span className="text-white bg-black p-1">Blog</span>
      </h1>
    </Link>
  );
};
