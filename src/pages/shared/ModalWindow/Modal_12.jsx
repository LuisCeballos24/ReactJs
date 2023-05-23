import { FaGoogle, FaMicrosoft } from "react-icons/fa";

import React, { useState } from "react";

const Modal_12 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex fixed inset-0 z-50 flex-col justify-center items-center min-h-screen">
        {/* Encabezado */}
        {/* <header className="py-4 text-center text-white bg-gray-800"> */}
        {/*   <h1 className="text-2xl font-bold">Iniciar sesión</h1> */}
        {/* </header> */}
        {/**/}
        {/* Contenido principal */}
        <div className="flex flex-grow justify-center items-center">
          {/* Campos de usuario y contraseña */}
          <div className="py-8 px-6 w-full max-w-md bg-white rounded-lg shadow-lg">
            <div className="m-8 ml-16 w-1/2 lg:block">
              <img
                src="../../../../public/imagen-445-removebg-preview.png"
                alt="Imagen animada"
                className="transform translate-x-[82px] h-[70px] w-[70px]"
              />
            </div>
            <h2 className="mb-8 text-2xl font-bold">
              Ingresa tus credenciales
            </h2>

            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block mb-2 text-lg">
                  Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-lg">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-2 px-4 mb-4 w-full font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Iniciar sesión
              </button>

              {/* Botones de registro con Google y Outlook */}
              <div className="flex justify-center">
                <button className="flex justify-center items-center py-2 px-4 mr-2 font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600">
                  <FaGoogle className="mr-2" /> Registrarse con Google
                </button>
                <button className="flex justify-center items-center py-2 px-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  <FaMicrosoft className="mr-2" /> Registrarse con Outlook
                </button>
              </div>

              {/* Enlaces adicionales */}
              <div className="mt-4 text-center">
                <a
                  href="#"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  Olvidar contraseña
                </a>
                <span className="mx-2 text-gray-500">|</span>
                <a
                  href="#"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  Mantener la sesión
                </a>
                <span className="mx-2 text-gray-500">|</span>
                <a
                  href="#"
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  Aún no tienes cuenta
                </a>
              </div>
            </form>
            {/* Imagen animada */}
          </div>
          {/* <div className="m-8 ml-16 w-1/2 lg:block"> */}
          {/*   <img */}
          {/*     src="../../../../public/document.png" */}
          {/*     alt="Imagen animada" */}
          {/*     className="transform translate-x-[50px] h-[700px] w-[700px]" */}
          {/*   /> */}
          {/* </div> */}
          {/* Pie de página */}
        </div>
      </div>

      {isOpen && (
        <div>
          <button
            className="absolute py-2 px-4 m-4 font-bold text-white bg-red-600 rounded hover:bg-red-800 top-[175px] left-[750px]"
            onClick={toggleModal}
          >
            Cerrar 454
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal_12;
