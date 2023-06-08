import React, { useState } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const ProductCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "../../../../public/Store.svg",
    "../../../../public/Store.svg",
    "../../../../public/Store.svg",
    "../../../../public/Store.svg",
    "../../../../public/Store.svg",
  ]; // Agrega aquí las rutas de las imágenes

  const handleChangeImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex overflow-hidden flex-col justify-center rounded-md shadow-lg md:flex-row card">
      <div className="w-full md:w-1/2">
        <button className="py-2 px-4 mt-4 text-white bg-red-500 rounded md:mt-0 md:ml-4">
          <BsFillArrowLeftSquareFill className="ml-2" size={20} />
        </button>{" "}
        <div className="relative">
          <div className="card-image">
            <img
              src={images[currentImageIndex]}
              alt="Imagen del Producto"
              className="w-full h-auto"
            />
            <div className="flex absolute bottom-0 left-0 justify-center py-2 w-full bg-gray-200">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full mx-1 ${index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  onClick={() => handleChangeImage(index)}
                >
                  <img
                    src={image}
                    alt={`Vista previa ${index}`}
                    className="object-cover w-full h-full rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 w-full">
          <div className="p-4 shadow-lg">
            <div className="card-description">
              <h2 className="mb-2 text-xl font-bold">Nombre del Producto</h2>
              <p className="mb-4 text-gray-600">Descripción del Producto</p>
              <p className="text-2xl font-bold">$99.99</p>
              <div className="flex gap-3 items-center mt-4">
                <div className="flex justify-end mb-2">
                  <button className="p-2 h-14 text-white bg-green-400 rounded-full">
                    <FaShoppingCart size={20} />
                  </button>
                </div>
                <div className="flex justify-end mb-2">
                  <button className="p-2 h-14 text-white bg-yellow-500 rounded-full">
                    <FaExchangeAlt size={20} />
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-500">Vendedor: John Doe</p>
                <p className="text-gray-500">Tienda: Mi Tienda</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 w-full md:mt-0 md:w-1/2">
        <div className="p-4">
          <div className="card-description-advanced">
            <h2 className="mb-4 text-xl font-bold">
              Descripciones avanzadas de producto
            </h2>
            <nav className="flex flex-wrap gap-2">
              <button className="py-2 px-4 text-gray-600 bg-gray-200 rounded">
                Categoría 1
              </button>
              <button className="py-2 px-4 text-gray-600 bg-gray-200 rounded">
                Categoría 2
              </button>
              <button className="py-2 px-4 text-gray-600 bg-gray-200 rounded">
                Categoría 3
              </button>
            </nav>
            <div className="mt-4">
              <h3 className="mb-2 font-bold">Título de la descripción</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                malesuada ultrices malesuada. Donec viverra velit id turpis
                feugiat, eget posuere ex tempor. Sed sodales ex ac lectus
                efficitur, a ullamcorper nisi tincidunt. Curabitur tempus, metus
                in volutpat vulputate, justo enim tincidunt mauris, id cursus
                tortor metus a dui.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-bold">Título de la descripción</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                malesuada ultrices malesuada. Donec viverra velit id turpis
                feugiat, eget posuere ex tempor. Sed sodales ex ac lectus
                efficitur, a ullamcorper nisi tincidunt. Curabitur tempus, metus
                in volutpat vulputate, justo enim tincidunt mauris, id cursus
                tortor metus a dui.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 font-bold">Título de la descripción</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                malesuada ultrices malesuada. Donec viverra velit id turpis
                feugiat, eget posuere ex tempor. Sed sodales ex ac lectus
                efficitur, a ullamcorper nisi tincidunt. Curabitur tempus, metus
                in volutpat vulputate, justo enim tincidunt mauris, id cursus
                tortor metus a dui.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
