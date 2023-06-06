import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaCertificate, FaTags } from "react-icons/fa";
const Header_Store = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  return (
    <div className="bg-white rounded-lg shadow-lg card">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-1/2">
          <div className="relative">
            <img
              src="../../../../public/dish.png"
              alt="Imagen de perfil"
              className="mx-auto mb-4 w-44 h-44 rounded-full"
            />
          </div>
          <h3 className="mb-4 text-2xl font-bold text-center">
            Bienvenido A mi tienda
          </h3>
          <div className="mb-4 border-b-2 border-gray-300"></div>
          <p className="mb-4">
            Descripción de la promoción que destaca sus beneficios principales.
          </p>
          <p className="text-sm italic text-gray-500">
            En nuestro sitio, te ofrecemos la oportunidad de explorar una amplia
            gama de productos y servicios disponibles para el intercambio. Si
            estás buscando nuevas opciones para intercambiar tus bienes por
            otros que sean de tu interés, has llegado al lugar adecuado. Nuestra
            plataforma te brinda la posibilidad de descubrir el objeto perfecto
            para realizar un emocionante trueque. !
          </p>
          <div className="flex items-center mt-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  onClick={() => handleStarClick(index)}
                  className={`cursor-pointer ${index < rating ? "text-yellow-500" : "text-gray-500"
                    }`}
                >
                  {index < rating ? (
                    <AiFillStar size={24} />
                  ) : (
                    <AiOutlineStar size={24} />
                  )}
                </span>
              ))}
              <span className="ml-2 text-gray-500">({rating.toFixed(1)})</span>
            </div>
            <div className="flex items-center">
              <FaCertificate className="text-2xl text-green-500" />
              <span className="ml-2 text-sm text-gray-500">
                Certificación de calidad
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center p-6 md:w-1/2">
          <img
            src="../../../../public/Store.svg"
            alt="Imagen promocional"
            className="w-full h-auto rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Header_Store;
