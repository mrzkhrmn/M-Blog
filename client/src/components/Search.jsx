import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

export const Search = () => {
  const [searchActive, setSearchActive] = useState(false);
  const searchInputRef = useRef(null);

  const searchActiveClass =
    "px-2 py-2 border-b-black border-b outline-none transition-all w-full";
  const searchInactiveClass =
    "px-2 py-2 border-b-transparent border-b outline-none transition-all w-full ";

  function toggleSearchBar() {
    setSearchActive((searchActive) => !searchActive);
    if (!searchActive) searchInputRef.current.focus();
  }

  return (
    <div className="flex items-center">
      <form
        className={
          searchActive
            ? "w-[300px] transition-all duration-200"
            : "w-0  transition-all duration-200"
        }
      >
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search..."
          className={searchActive ? searchActiveClass : searchInactiveClass}
          onBlur={() => setSearchActive(!searchActive)}
        />
      </form>
      <button
        onClick={toggleSearchBar}
        className={
          searchActive
            ? "px-3 py-3 transiton-all border-b border-black"
            : " bg-black/10 px-3 py-3 rounded-full transition-all"
        }
      >
        <FaSearch />
      </button>
    </div>
  );
};
