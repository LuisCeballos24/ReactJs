import React, { useState, useEffect } from "react";
import {
  RiHome6Line,
  RiPercentLine,
  RiPieChartLine,
  RiMailLine,
  RiNotification3Line,
  RiSettings4Line,
  RiLogoutCircleRLine,
  RiStore3Line,
} from "react-icons/ri";
import { auth } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { changeShowStore } from "../Landing/Home_page_user";

const Sidebar = (props) => {
  const { showMenu } = props;
  const [isVertical, setIsVertical] = useState(false);
  const navigate = useNavigate();
  const [estadoHijo, setEstadoHijo] = useState(false);

  const handleChange = () => {
    const nuevoEstado = !estadoHijo;
    setEstadoHijo(nuevoEstado);
    props.onCambioEstado(nuevoEstado);
  };

  const toggleStoreHandler = () => {
    console.log("Paso ");
    changeShowStore();
  };

  const handleLogout = async () => {
    try {
      // Cerrar sesión del usuario
      await auth.signOut();

      // Redirigir a la página de inicio de sesión u otra página deseada
      navigate("/"); // Reemplaza "/login" con la ruta a la que deseas redirigir después del cierre de sesión
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        // setIsVertical(true);
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
          ? "bg-[#285e7d] fixed mt-8 z-50 top-0 h-[98px]  translate-x-[400px] lg:left-16  w-[820px] flex  flex-col justify-between py-4 rounded-lg rounded-br-xl transition-opacity "
          : "  fixed lg:left-0 top-0 w-22 h-full flex flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-50 transition-opacity"
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
                href="/"
                className="mt-0 mb-4 w-12 h-12"
                src="../../../public/imagen-445-removebg-preview.png"
                alt="Logo"
              />
            </h1>
          </li>
          <li className="p-4 rounded-tl-xl rounded-bl-xl group">
            <a
              href="#"
              onClick={handleChange}
              className="  text-[#EA8337]  group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-white  group-hover:text-white"
            >
              <RiHome6Line className="text-xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors group">
            <a
              onClick={handleChange}
              href="#"
              className="group-hover:bg-[#EA8337]  p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiStore3Line className="text-xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors group">
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiPieChartLine className="text-xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors group">
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiMailLine className="text-2xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors group">
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
            >
              <RiNotification3Line className="text-2xl" />
            </a>
          </li>
          <li className="p-4 pl-4 rounded-tl-xl rounded-bl-xl transition-colors group">
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
                ? "  p-4 rounded-tl-xl rounded-bl-xl group transition-colors"
                : "hidden"
            }  `}
          >
            <a
              href="#"
              className="group-hover:bg-[#EA8337] p-4 flex justify-center rounded-xl text-[#EA8337] group-hover:text-white transition-colors"
              onClick={handleLogout}
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
              onClick={handleLogout}
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
