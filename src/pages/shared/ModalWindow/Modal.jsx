import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import React, { useState } from "react";
import { auth, db } from "../../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      setError(null);
      console.log("Ingresaste");

      // Redirigir a la página deseada
      navigate("/user"); // Reemplaza "/ruta" con la ruta a la que deseas redirigir
    } catch (error) {
      console.log("ERROR");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <HiPlus className="text-xl text-primary" onClick={toggleModal} />

      {isOpen && (
        <div className="flex fixed inset-0 z-50 flex-col justify-center items-center min-h-screen top-[-480px]">
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
                <button
                  className="absolute py-2 px-4 m-4 font-bold text-white bg-red-600 rounded hover:bg-red-700 top-[510px] left-[420px]"
                  onClick={toggleModal}
                >
                  Cerrar
                </button>
                <img
                  src="../../../../public/imagen-445-removebg-preview.png"
                  alt="Imagen animada"
                  className="transform translate-x-[82px] h-[70px] w-[70px]"
                />
              </div>
              <h2 className="mb-8 text-2xl font-bold">
                Ingresa tus credenciales
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 text-lg">
                    Usuario
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="py-2 px-4 mb-4 w-full font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Iniciar sesión"}
                </button>

                {/* Mensaje de error */}
                {error && <p className="text-red-500">{error}</p>}

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
                  <Link
                    to="#"
                    className="text-blue-500 underline hover:text-blue-600"
                  >
                    Olvidar contraseña
                  </Link>
                  <span className="mx-2 text-gray-500">|</span>
                  <Link
                    to="#"
                    className="text-blue-500 underline hover:text-blue-600"
                  >
                    Mantener la sesión
                  </Link>
                  <span className="mx-2 text-gray-500">|</span>
                  <Link
                    to="#"
                    className="text-blue-500 underline hover:text-blue-600"
                  >
                    Aún no tienes cuenta
                  </Link>
                </div>
              </form>
              {/* Imagen animada */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
