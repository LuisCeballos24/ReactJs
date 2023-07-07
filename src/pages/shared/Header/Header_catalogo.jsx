import React from "react";
import { RiSearch2Line } from "react-icons/ri";

const Header_catalogo = () => {
  return (
    <header>
      {/* Title and search */}
      <div
        id="search"
        className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between md:items-center"
      >
        <div>
          {/* <p className="text-gray-500">07 octubre 2022</p> */}
          {/* <h2 className="text-2xl text-gray-900">Novedades </h2> */}
        </div>
        <form className="ml-auto">
          {" "}
          {/* Utilizamos la clase ml-auto para mover el formulario hacia la izquierda */}
          <div className="relative top-14 w-full">
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
        {/* ... */}

        <a
          href="#"
          className="relative py-2 pr-4 before:w-1/2 before:h-[2px] before:absolute before:bg-[#E89440] before:left-0 before:rounded-full before:-bottom-[1px] text-[#E89440]"
        >
          Venta
        </a>
        <a href="#" className="py-2 pr-4">
          Intercambio
        </a>
        <a href="#" className="py-2 pr-4">
          Subasta
        </a>
        <a href="#" className="py-2">
          Comentarios
        </a>
      </nav>
    </header>
  );
};

export default Header_catalogo;
