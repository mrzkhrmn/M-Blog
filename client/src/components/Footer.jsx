import { Logo } from "./Logo";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className=" py-6 absolute w-full bottom-0 border-t border-black/20">
      <div className="flex justify-between px-20 ">
        <Logo />{" "}
        <div className="flex items-center gap-8">
          <div>
            <h3 className="text-gray-600 text-lg uppercase mb-4">About</h3>
            <div className="flex flex-col gap-2 text-gray-500">
              <p className="hover:underline cursor-pointer">About Me</p>
              <p className="hover:underline cursor-pointer">Projects</p>
            </div>
          </div>
          <div>
            <h3 className="text-gray-600 text-lg uppercase mb-4">Follow us</h3>
            <div className="flex flex-col gap-2 text-gray-500">
              <p className="hover:underline cursor-pointer">Github</p>
              <p className="hover:underline cursor-pointer">Linkedin</p>
            </div>
          </div>
          <div>
            <h3 className="text-gray-600 text-lg uppercase mb-4">Legal</h3>
            <div className="flex flex-col gap-2 text-gray-500">
              <p className="hover:underline cursor-pointer">Privacy Policy</p>
              <p className="hover:underline cursor-pointer">
                Terms & Conditions
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-20 pt-4 mt-4">
        <p className="text-gray-500 ">&copy; 2024 M&apos;s Blog</p>
        <div className="text-2xl text-gray-500 flex gap-8">
          <FaGithub /> <FaInstagram /> <FaLinkedin />
        </div>
      </div>
    </footer>
  );
};
