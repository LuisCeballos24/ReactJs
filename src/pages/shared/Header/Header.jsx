import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const Header = () => {
  return (
    <header>
      {/* Title and search */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <div></div>
        <form>
          <div className="relative w-full">
            <RiSearch2Line className="absolute left-3 top-1/2 text-gray-900 -translate-y-1/2" />
            <input
              type="text"
              className="py-2 pr-4 pl-10 w-full text-gray-900 bg-white rounded-lg outline-none border  border-[#E89440]"
              placeholder="Search"
            />
          </div>
        </form>
      </div>
      {/* Tabs */}
      <nav className="flex justify-between items-center mb-6 text-gray-900 border-b md:gap-8 md:justify-start">
        <a
          href="#"
          className="relative py-2 pr-4 before:w-1/2 before:h-[2px] before:absolute before:bg-[#E89440] before:left-0 before:rounded-full before:-bottom-[1px] text-[#E89440]"
        >
          Hot dishes
        </a>
        <a href="#" className="py-2 pr-4">
          Cold dishes
        </a>
        <a href="#" className="py-2 pr-4">
          Soup
        </a>
        <a href="#" className="py-2">
          Grill
        </a>
      </nav>
    </header>
  );
};

export default Header;
