import React from "react";
import { RiHome6Line } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="bg-[#1F1D2B] fixed left-0 top-0 w-28 h-full ">
      <h1 className="my-5 text-4xl font-bold text-center text-gray-300 uppercase">
        Logo
      </h1>
      <ul className="pl-4 bg-green-400">
        <li className="p-4 bg-red-400 rounded-tl-xl rounded-bl-xl">
          <a href="#" className="block p-4 bg-blue-500 rounded-xl">
            <RiHome6Line className="text-xl text-center" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
