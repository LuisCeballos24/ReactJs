import React, { useState, useEffect } from "react";
import {
  RiHome6Line,
  RiPercentLine,
  RiPieChartLine,
  RiMailLine,
  RiNotification3Line,
  RiSettings4Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";

const Sidebar = (props) => {
  const { showMenu } = props;
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVertical(true);
      } else {
        setIsVertical(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`bg-[#285e7d] ${showMenu ? "left-0" : "-left-full"} ${
        isVertical
          ? "bg-[#285e7d] fixed mt-8 z-50 top-0 h-[90px]  translate-x-[400px] lg:left-16  w-[820px] flex  flex-col justify-between py-4 rounded-lg rounded-br-xl transition-all "
          : "  fixed lg:left-0 top-0 w-22 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all"
      } `}
    >
      <div className={` ${isVertical ? "flex" : " "}  `}>
        <ul
          className={` ${isVertical ? "flex justify-center pl-6" : " pl-4"}  `}
        >
          <li className="flex justify-between items-center my-4">
            <h1
              className={` ${
                isVertical
                  ? "mx-10 text-2xl font-bold text-center text-gray-300 uppercase"
                  : "p-4 my-6 text-2xl font-bold text-center text-gray-300 uppercase"
              }  `}
            >
              <img
                className="mt-0 mb-4 w-12 h-12"
                src="../../../public/imagen-445-removebg-preview.png"
                alt="Logo"
              />
            </h1>
          </li>
          <li className="p-4  bg-[#285e7d] rounded-tl-xl rounded-bl-xl">
            <a
              href="/"
              className="bg-[#EA8337] p-4 flex justify-center rounded-xl text-white"
            >
              <RiHome6Line className="text-xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors hover:bg-[#285e7d] group">
            <a
              href="#"
              className="group-hover:bg-[#EA8337]  p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiPercentLine className="text-xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors hover:bg-[#285e7d] group">
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiPieChartLine className="text-xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors hover:bg-[#285e7d] group">
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiMailLine className="text-2xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors  hover:bg-[#285e7d] group">
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiNotification3Line className="text-2xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors hover:bg-[#285e7d] group">
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiSettings4Line className="text-xl" />
            </a>
          </li>
          <li
            className={` ${
              isVertical
                ? "hover:bg-[#285e7d]  p-4 rounded-tl-xl rounded-bl-xl group transition-colors"
                : "hidden"
            }  `}
          >
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiLogoutCircleRLine className="text-2xl" />
            </a>
          </li>
        </ul>{" "}
      </div>
      <div>
        <ul className={` ${isVertical ? "hidden" : "pl-4"}  `}>
          <li className="hover:bg-[#285e7d]  p-4 rounded-tl-xl rounded-bl-xl group transition-colors">
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiLogoutCircleRLine className="text-2xl" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

{
  /*  <div */
}
{
  /*       className={`bg-[#285e7d] fixed  lg:left-0 top-0 w-22 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-all ${ */
}
{
  /*         showMenu ? "left-0" : "-left-full" */
}
{
  /*       } ${isVertical ? "vertical" : ""}`} */
}
{
  /*     > */
}
{
  /*       <div> */
}
{
  /*         <ul className="pl-4"> */
}
{
  /*           <li className="flex justify-center items-center my-4"> */
}
{
  /*             <h1 className="my-5 text-2xl font-bold text-center text-gray-300 uppercase"> */
}
{
  /*               <img */
}
{
  /*                 className="w-12 h-12" */
}
{
  /*                 src="../../../public/imagen-445-removebg-preview.png" */
}
{
  /*                 alt="Logo" */
}
{
  /*               /> */
}
{
  /*             </h1> */
}
{
  /*           </li> */
}
{
  /*           <li className="p-4 pl-4 bg-[#285e7d] rounded-tl-xl rounded-bl-xl"> */
}
{
  /*             <a */
}
{
  /*               href="#" */
}
{
  /*               className="bg-[#EA8337] p-4 flex justify-center rounded-xl text-white" */
}
{
  /*             > */
}
{
  /*               <RiHome6Line className="text-xl" /> */
}
{
  /*             </a> */
}
{
  /*           </li> */
}
{
  /*           <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors hover:bg-[#285e7d] group"> */
}
{
  /*             <a */
}
{
  /*               href="#" */
}
{
  /*               className="group-hover:bg-[#EA8337]  p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors" */
}
{
  /*             > */
}
{
  /*               <RiPercentLine className="text-xl" /> */
}
{
  /*             </a> */
}
{
  /*           </li> */
}
{
  /*           <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors hover:bg-[#285e7d] group"> */
}
{
  /*             <a */
}
{
  /*               href="#" */
}
{
  /*               className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors" */
}
{
  /*             > */
}
{
  /*               <RiPieChartLine className="text-xl" /> */
}
{
  /*             </a> */
}
{
  /*           </li> */
}
{
  /*           <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors hover:bg-[#285e7d] group"> */
}
{
  /*             <a */
}
{
  /*               href="#" */
}
{
  /*               className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors" */
}
{
  /*             > */
}
{
  /*               <RiMailLine className="text-2xl" /> */
}
{
  /*             </a> */
}
{
  /*           </li> */
}
{
  /*           <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors  hover:bg-[#285e7d] group"> */
}
{
  /*             <a */
}
{
  /*               href="#" */
}
{
  /*               className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors" */
}
{
  /*             > */
}
{
  /*               <RiNotification3Line className="text-2xl" /> */
}
{
  /*             </a> */
}
{
  /*           </li> */
}
{
  /*           <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors hover:bg-[#285e7d] group"> */
}
{
  /*             <a */
}
{
  /*               href="#" */
}
{
  /*               className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors" */
}
{
  /*             > */
}
{
  /*               <RiSettings4Line className="text-xl" /> */
}
{
  /*             </a> */
}
{
  /*           </li> */
}
{
  /*         </ul> */
}
{
  /*       </div> */
}
{
  /*       <div> */
}
{
  /*         <ul className="pl-4"> */
}
{
  /*           <li className="hover:bg-[#285e7d]  p-4 rounded-tl-xl rounded-bl-xl group transition-colors"> */
}
{
  /*             <a */
}
{
  /*               href="#" */
}
{
  /*               className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors" */
}
{
  /*             > */
}
{
  /*               <RiLogoutCircleRLine className="text-2xl" /> */
}
{
  /*             </a> */
}
{
  /*           </li> */
}
{
  /*         </ul> */
}
{
  /*       </div> */
}
{
  /*     </div> */
}
{
  /*   ); */
}
{
  /* }; */
}
