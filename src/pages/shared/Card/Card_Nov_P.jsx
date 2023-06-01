import React from "react";

const Card = () => {
  return (
    <div className="grid-cols-1 gap-x-5 gap-16 p-8 md:grid-cols-4 lg:grid-cols-0">
      <div className="flex items-center p-6 text-left bg-gray-800 rounded-xl border transition border-grey-300">
        <div className="w-full md:w-1/2"></div>
        <div className="relative w-full md:w-1/2">
          <div className="absolute rounded-bl-2xl transform rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle-2 md:w-[920px] md:left-[-640px]"></div>
          <div className="absolute rounded-bl-2xl transform rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle md:w-[900px] md:left-[-640px]">
            <div className="p-10 mb-4">
              <h2 className="text-3xl font-bold text-gray-50">
                Bienvenido al Intercambio de Bienes
              </h2>
            </div>
            <p className="flex p-8 text-gray-100">
              En nuestro sitio, puedes explorar una amplia variedad de productos
              y servicios disponibles para el intercambio. Descubre nuevas
              oportunidades para intercambiar tus bienes por otros que sean de
              tu interés. ¡Encuentra el objeto perfecto para intercambiar y haz
              un trueque emocionante!
            </p>
          </div>

          <div className="relative w-full h-80">
            <img
              id="Promo"
              src="../../../../public/Business.svg"
              alt=""
              className="object-cover w-full h-full rounded-xl promo-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
//
// <div className="flex absolute justify-end bottom-[-27px] right-[-11px]">
//            {/* Boton de mostrar opciones*/}
//            <button className="flex p-2 rounded-lg" onClick={handleClickChange}>
//              <RiExchangeBoxLine className="text-xl bg-white hover:text-yellow-700 text-primary" />
//            </button>
//            <div
//              id="opciones"
//              className={`${
//                mostrarOpciones ? "" : "hidden"
//              } absolute right-0 py-5 mt-8 w-48 text-gray-800 bg-white rounded shadow-lg`}
//            >
//              {opciones.map((opcion, index) => (
//                <div
//                  key={index}
//                  className={`p-2 hover:border-gray-900 ${
//                    opcionAbierta === index ? "bg-[#286f6c] text-white" : ""
//                  }`}
//                  onClick={() => {
//                    handleAbrirOpcion(index);
//                    handleEliminarOpcion(index);
//                  }}
//                >
//                  {opcion}
//                </div>
//              ))}
//            </div>
//            {/* Resto del código */}
//            <button className="flex p-2 rounded-lg" onClick={handleClick}>
//              <BsCartPlus className="text-xl bg-white hover:text-green-500 text-primary" />
//            </button>
//          </div>
//
