import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { AiFillStar } from "react-icons/ai";
import { FaCertificate } from "react-icons/fa";
const Header_Store = () => {
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-16 p-8 md:grid-cols-3 lg:grid-cols-1 lg:gap-[30px]">
      <div className="flex items-center p-6 text-left text-gray-300 bg-gray-200 rounded-xl border transition border-grey-300">
        <div className="w-1/2"></div>
        <div className="relative w-1/2">
          <div className="absolute rounded-bl-2xl transform w-[920px] rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle-2 left-[-640px]"></div>
          <div className="absolute rounded-bl-2xl transform w-[900px] rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle left-[-640px]">
            <div className="p-10 mb-4">
              <h2 className="text-3xl font-bold text-gray-50">
                Bienvenido A mi tienda
              </h2>
            </div>
            <p className="flex flex-1 order-1 p-8 text-gray-100 lg:-order-1">
              En nuestro sitio, te ofrecemos la oportunidad de explorar una
              amplia gama de productos y servicios disponibles para el
              intercambio. Si estás buscando nuevas opciones para intercambiar
              tus bienes por otros que sean de tu interés, has llegado al lugar
              adecuado. Nuestra plataforma te brinda la posibilidad de descubrir
              el objeto perfecto para realizar un emocionante trueque. !
            </p>
            <div className="flex items-center mt-4">
              <div className="flex items-center mr-4">
                <FaCertificate className="text-2xl text-green-500" />
                <span className="ml-2 text-sm text-gray-500">
                  Certificación de calidad
                </span>
              </div>
              <div className="flex items-center">
                <AiFillStar size={24} className="text-yellow-500" />
                <AiFillStar size={24} className="text-yellow-500" />
                <AiFillStar size={24} className="text-yellow-500" />
                <AiFillStar size={24} className="text-yellow-500" />
                <AiFillStar size={24} className="text-gray-500" />
                <span className="ml-2 text-gray-500">(4.0)</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-80">
            <img
              id="Promo"
              src="../../../../public/Store.svg"
              alt=""
              className="object-cover w-full h-full rounded-xl promo-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header_Store;
