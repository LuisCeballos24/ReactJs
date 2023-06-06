import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaCertificate, FaTags, FaStore } from "react-icons/fa";
import { features } from "../../../data.jsx";

const Card_p = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [triangle2Display, setTriangle2Display] = useState("block");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth < 1400) {
        setTriangle2Display("none");
      } else {
        setTriangle2Display("block");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { title, subtitle, image, items } = features;
  const triangle1Width = windowWidth >= 1280 ? 920 : 600;

  return (
    <div className="bg-white rounded-lg shadow-lg card">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 md:w-1/2">
          <div className="relative">
            <img
              src="../../../../public/dish.png"
              alt="Imagen de perfil"
              className="mx-auto mb-4 w-24 h-24 rounded-full"
            />
            <div className="relative py-1 my-10 mt-11">
              <div className="relative">
                <div className="absolute top-1/2 left-1/2 w-4/5 h-0.5 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="flex absolute top-1/2 left-1/2 justify-center items-center w-10 h-10 bg-white rounded-full border-2 border-gray-300 transform -translate-x-1/2 -translate-y-1/2">
                  <FaStore className="text-lg text-gray-500" />
                </div>
              </div>
            </div>
            <h3 className="mb-5 text-2xl font-bold text-center">
              Título de la promoción
            </h3>
          </div>

          <div className="mb-4 border-b-2 border-gray-300"></div>
          <p className="mb-4">
            Descripción de la promoción que destaca sus beneficios principales.
          </p>
          <p className="text-sm italic text-gray-500">
            Detalles adicionales de la promoción, fechas, condiciones, etc.
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
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 w-4/5 h-0.5 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="flex absolute top-1/2 left-1/2 justify-center items-center w-10 h-10 bg-white rounded-full border-2 border-gray-300 transform -translate-x-1/2 -translate-y-1/2">
              <FaTags className="text-lg text-gray-500" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <img
                src="../../../../public/Store.svg"
                alt="Imagen promocional 1"
                className="w-full h-auto rounded-lg shadow"
              />
              <h4 className="mt-2 text-lg font-bold">Título de la imagen 1</h4>
              <p className="text-sm text-gray-500">Descuento: 20%</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="../../../../public/Store.svg"
                alt="Imagen promocional 2"
                className="w-full h-auto rounded-lg shadow"
              />
              <h4 className="mt-2 text-lg font-bold">Título de la imagen 2</h4>
              <p className="text-sm text-gray-500">Descuento: 15%</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="../../../../public/Store.svg"
                alt="Imagen promocional 3"
                className="w-full h-auto rounded-lg shadow"
              />
              <h4 className="mt-2 text-lg font-bold">Título de la imagen 3</h4>
              <p className="text-sm text-gray-500">Descuento: 10%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card_p;
