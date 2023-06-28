import React, { useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaTags,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const Card_V = () => {
  const [isExpanded, setIsExpanded] = useState([]);

  const handleToggle = (index) => {
    const updatedIsExpanded = [...isExpanded];
    updatedIsExpanded[index] = !updatedIsExpanded[index];
    setIsExpanded(updatedIsExpanded);
  };

  const handleFavorite = (index) => {
    // Implementa la lógica para marcar/desmarcar como favorito el objeto de la lista en el índice dado
  };

  const handleSelectItem = (index) => {
    // Implementa la lógica para seleccionar/deseleccionar el objeto de la lista en el índice dado
  };

  const features = [
    {
      image: "../../../../public/dish.png",
      title: "Título de la promoción 1",
      description: "Descripción de la promoción 1",
      offer: "Oferta de la promoción 1",
      cvImage: "../../../../public/cv.webp",
    },
    {
      image: "../../../../public/dish.png",
      title: "Título de la promoción 2",
      description: "Descripción de la promoción 2",
      offer: "Oferta de la promoción 2",
      cvImage: "ruta-de-la-imagen-cv-2.jpg",
    },
    {
      image: "../../../../public/dish.png",
      title: "Título de la promoción 3",
      description: "Descripción de la promoción 3",
      offer: "Oferta de la promoción 3",
      cvImage: "ruta-de-la-imagen-cv-3.jpg",
    },
    // Agrega más objetos de promoción según sea necesario
  ];

  return (
    <div className="overflow-y-auto h-96 rounded-lg shadow-lg card">
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Contenedor 1 */}

        <div className="md:col-span-1">
          <div className="p-6 md:col-span-1">
            <div className="relative">
              <div className="relative py-1 my-10 mt-11">
                <div className="relative">
                  <div className="absolute top-1/2 left-1/2 w-4/5 h-0.5 bg-gray-300 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="flex absolute top-1/2 left-1/2 justify-center items-center w-10 h-10 bg-white rounded-full border-2 border-gray-300 transform -translate-x-1/2 -translate-y-1/2">
                    <FaTags className="text-lg text-gray-500" />
                  </div>
                </div>
              </div>
              <h3 className="mb-5 text-2xl font-bold text-center">
                Título de la promoción
              </h3>
              <img
                src="../../../../public/Store.svg"
                alt="Imagen de perfil"
                className="mx-auto mb-4 w-full h-44 bg-red-300"
              />
            </div>

            <div className="mb-4 border-b-2 border-gray-300"></div>
            <p className="mb-4">
              Descripción de la promoción que destaca sus beneficios
              principales.
            </p>
          </div>{" "}
        </div>
        {/* Contenedor 2 */}
        <div className="p-6 md:col-span-3">
          <div className="flex items-center mb-4">
            <FaTags className="text-lg text-gray-500" />
            <h4 className="ml-2 text-lg font-bold">Lista de promociones</h4>
          </div>

          {features.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center p-4 space-x-4 bg-white shadow-lg">
                <img
                  src={item.image}
                  alt="Imagen promocional"
                  className="w-24 h-24 rounded-full"
                />
                <div>
                  <h4 className="text-lg font-bold">{item.title}</h4>
                  <p>
                    <strong>Descripción:</strong>{" "}
                    {isExpanded[index]
                      ? item.description
                      : item.description.slice(0, 50) + "..."}
                  </p>
                  <p>
                    <strong>Oferta:</strong> ${item.offer}
                  </p>
                </div>
                <div className="flex-grow" />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleFavorite(index)}
                    className="text-gray-500"
                  >
                    <AiFillStar size={24} />
                  </button>
                  <button
                    onClick={() => handleSelectItem(index)}
                    className="text-gray-500"
                  >
                    {isExpanded[index] ? <FaTimes /> : <FaCheck />}
                  </button>
                </div>
              </div>
              {isExpanded[index] && (
                <div className="flex flex-col p-4 mt-4 bg-gray-100 rounded-lg shadow-inner">
                  <div className="flex items-center">
                    <img
                      src={item.cvImage}
                      alt="Imagen CV"
                      className="w-56 h-56"
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <p className="mr-1 text-sm font-bold text-gray-500">
                          Descripción:
                        </p>
                        <p className="text-sm">{item.description}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="mr-1 text-sm font-bold text-gray-500">
                          Oferta:
                        </p>
                        <p className="text-sm">${item.offer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleToggle(index)}
                  className="flex items-center text-sm text-gray-500"
                >
                  {isExpanded[index] ? (
                    <>
                      <span>Ocultar detalles</span>
                      <FaAngleUp className="ml-1" />
                    </>
                  ) : (
                    <>
                      <span>Mostrar detalles</span>
                      <FaAngleDown className="ml-1" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card_V;