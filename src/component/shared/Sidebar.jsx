import React from "react";
import {
  RiHome6Line,
  RiPercentLine,
  RiPieChartLine,
  RiMailLine,
  RiNotificationLine,
  RiSettings4Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";

const Sidebar = (props) => {
  const { showMenu } = props;

  return (
    <div
      className={`bg-[#1F1D2B] fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl   z-50 ${
        showMenu ? "left-0" : "-left-full"
      }`}
    >
      <div>
        <ul className="pl-4">
          <li>
            <h1 className="my-5 text-2xl font-extrabold text-center text-gray-300 uppercase">
              Logo
            </h1>
          </li>
          <li className="p-4 bg-[#262837]  rounded-tl-xl rounded-bl-xl">
            <a
              href="#"
              className=" flex justify-center p-4 bg-[#ec7c62] rounded-xl text-white"
            >
              <RiHome6Line className="text-2xl text-center" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className=" group-hover:bg-[#ec7c6a] group-hover:text-white flex justify-center p-4 text-[#ec7c62] rounded-xl transition-colors"
            >
              <RiPercentLine className="text-2xl text-center" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className=" group-hover:bg-[#ec7c6a] group-hover:text-white flex justify-center p-4 text-[#ec7c62] rounded-xl transition-colors"
            >
              <RiPieChartLine className="text-2xl text-center" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className=" group-hover:bg-[#ec7c6a] group-hover:text-white flex justify-center p-4 text-[#ec7c62] rounded-xl transition-colors"
            >
              <RiMailLine className="text-2xl text-center" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className=" group-hover:bg-[#ec7c6a] group-hover:text-white flex justify-center p-4 text-[#ec7c62] rounded-xl transition-colors"
            >
              <RiNotificationLine className="text-2xl text-center" />
            </a>
          </li>
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className=" group-hover:bg-[#ec7c6a] group-hover:text-white flex justify-center p-4 text-[#ec7c62] rounded-xl transition-colors"
            >
              <RiSettings4Line className="text-2xl text-center" />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <ul className="pl-4">
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className=" group-hover:bg-[#ec7c6a] group-hover:text-white flex justify-center p-4 text-[#ec7c62] rounded-xl transition-colors"
            >
              <RiLogoutCircleRLine className="text-2xl text-center" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
