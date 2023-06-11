import React, { useEffect, useState } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Countdown from "react-countdown";

const Card_subasta = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(Date.parse(endTime) - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(Date.parse(endTime) - Date.now());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [endTime]);
  //
  // const totalTime = 1200000;

  // Tiempo total en milisegundos

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "../../../../public/Store.svg",
    "../../../../public/Store.svg",
    "../../../../public/Store.svg",
    "../../../../public/Store.svg",
    "../../../../public/Store.svg",
  ]; // Agrega aquí las rutas de las imágenes
  const users = [
    {
      name: "Usuario 1",
      profilePicture: "../../../../public/chair.png",
      bidAmount: 50,
    },
    {
      name: "Usuario 2",
      profilePicture: "../../../../public/chair.png",
      bidAmount: 75,
    },
    {
      name: "Usuario 3",
      profilePicture: "../../../../public/chair.png",
      bidAmount: 100,
    },
  ]; // Agrega aquí los datos de los usuarios y sus ofertas

  const handleChangeImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBid = (action) => {
    // Lógica para manejar la oferta
  };

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Acciones cuando el contador finaliza
      return <span>Subasta finalizada</span>;
    } else {
      // Renderizar el contador en formato HH:MM:SS
      return (
        <span>
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
      );
    }
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
                  className={`w-8 h-8 rounded-full mx-1 ${
                    index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
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
            {/* <div className="mt-4"> */}
            {/*   <h3 className="mb-2 font-bold">Título de la descripción</h3> */}
            {/*   <p className="text-gray-600"> */}
            {/*     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce */}
            {/*     malesuada ultrices malesuada. Donec viverra velit id turpis */}
            {/*     feugiat, eget posuere ex tempor. Sed sodales ex ac lectus */}
            {/*     efficitur, a ullamcorper nisi tincidunt. Curabitur tempus, metus */}
            {/*     in volutpat vulputate, justo enim tincidunt mauris, id cursus */}
            {/*     tortor metus a dui. */}
            {/*   </p> */}
            {/* </div> */}
            {/* <div className="mt-4"> */}
            {/*   <h3 className="mb-2 font-bold">Título de la descripción</h3> */}
            {/*   <p className="text-gray-600"> */}
            {/*     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce */}
            {/*     malesuada ultrices malesuada. Donec viverra velit id turpis */}
            {/*     feugiat, eget posuere ex tempor. Sed sodales ex ac lectus */}
            {/*     efficitur, a ullamcorper nisi tincidunt. Curabitur tempus, metus */}
            {/*     in volutpat vulputate, justo enim tincidunt mauris, id cursus */}
            {/*     tortor metus a dui. */}
            {/*   </p> */}
            {/* </div> */}
          </div>
          <div className="mt-4">
            <h3 className="mb-2 text-xl font-bold">Tiempo restante</h3>
            <div className="flex gap-2 items-center">
              <Countdown
                date={Date.now() + timeLeft}
                renderer={({ minutes, seconds, completed }) => {
                  if (completed) {
                    return <span>La subasta ha finalizado</span>;
                  }

                  return (
                    <span>
                      {minutes}:{seconds}
                    </span>
                  );
                }}
              />{" "}
              <div className="w-full h-2 bg-gray-300 rounded">
                <div
                  className="h-full bg-blue-500 rounded"
                  style={{
                    width: `${
                      (timeLeft /
                        (timeLeft + (Date.parse(endTime) - Date.now()))) *
                      100
                    }%`,
                  }} // Aquí debes ajustar el ancho de la barra según el tiempo restante
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 text-xl font-bold">Puja actual</h3>
            <div className="flex gap-2 items-center">
              <button
                className="p-2 text-white bg-blue-500 rounded"
                onClick={() => handleBid("-")}
              >
                -
              </button>
              <input
                type="text"
                className="py-2 px-4 rounded border border-gray-300"
                value="100" // Aquí debes establecer el valor de la puja actual
              />
              <button
                className="p-2 text-white bg-blue-500 rounded"
                onClick={() => handleBid("+")}
              >
                +
              </button>
              <button className="p-2 text-white bg-green-500 rounded">
                Pujar
              </button>
            </div>
          </div>
          <div className="mt-4">
            {/* Lista de usuarios  */}
            <h3 className="mb-2 font-bold">Ofertas</h3>
            {users.map((user, index) => (
              <div key={index} className="flex items-center mt-2">
                <div className="overflow-hidden w-12 h-12 rounded-full">
                  <img
                    src={user.profilePicture}
                    alt="Foto de perfil"
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-gray-600">{user.name}</p>
                  <p className="text-gray-600">
                    Oferta: ${user.bidAmount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_subasta;
//
// const users = [
//   {
//     name: "Usuario 1",
//     profilePicture: "../../../../public/chair.png",
//     bidAmount: 50,
//   },
//   {
//     name: "Usuario 2",
//     profilePicture: "../../../../public/chair.png",
//     bidAmount: 75,
//   },
//   {
//     name: "Usuario 3",
//     profilePicture: "../../../../public/chair.png",
//     bidAmount: 100,
//   },
// ]; // Agrega aquí los datos de los usuarios y sus ofertas
//

//
// <div className="mt-4">
//              {/* Lista de usuarios  */}
//              <h3 className="mb-2 font-bold">Ofertas</h3>
//              {users.map((user, index) => (
//                <div key={index} className="flex items-center mt-2">
//                  <div className="overflow-hidden w-12 h-12 rounded-full">
//                    <img
//                      src={user.profilePicture}
//                      alt="Foto de perfil"
//                      className="object-cover w-full h-full"
//                    />
//                  </div>
//                  <div className="ml-4">
//                    <p className="text-gray-600">{user.name}</p>
//                    <p className="text-gray-600">
//                      Oferta: ${user.bidAmount.toFixed(2)}
//                    </p>
//                  </div>
//                </div>
//              ))}
//            </div>

//
