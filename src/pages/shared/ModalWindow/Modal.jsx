import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import React, { useState, useEffect } from "react";
import { auth, db, db2 } from "../../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRe, setIsOpenRe] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        setLoading(true);
        await auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("El usuario ha iniciado sesión");
            props.Child_3(false);
          } else {
            setLoading(false);
          }
        });
      } catch (error) {
        console.log("Error al verificar la sesión:", error);
        setLoading(false);
      }
    };

    checkUserSession();
  }, [navigate]);

  const toggleModal = () => {
    // checkUserSession();
    setIsOpenRe(false);
    setIsOpen(!isOpen);
  };

  const registro = () => {
    setIsOpenRe(!isOpenRe);
    setIsOpen(!isOpen);
  };
  const handleRegister = async (event) => {
    event.preventDefault();

    const firstName = event.target.elements.firstName.value;
    const lastName = event.target.elements.lastName.value;
    const birthdate = event.target.elements.birthdate.value;
    const phoneNumber = event.target.elements.phoneNumber.value;
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    const confirmPassword = event.target.elements.confirmPassword.value;

    try {
      setLoading(true);
      if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      // Crear el usuario en Firebase Authentication
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Guardar datos adicionales en la base de datos
      await db.collection("users").doc(user.uid).set({
        firstName,
        lastName,
        birthdate,
        phoneNumber,
      });

      setLoading(false);
      props.Child_3(false);
      //  navigate("/user"); // Redirigir a la página deseada después del registro
    } catch (error) {
      console.log("Error al registrar el usuario:", error);
      setError(error.message);
      setLoading(false);
    }
  };

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
      props.Child_3(false);
      //     navigate("/user"); // Reemplaza "/ruta" con la ruta a la que deseas redirigir
    } catch (error) {
      console.log("ERROR");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HiPlus className="text-xl text-primary" onClick={toggleModal} />

      {isOpen && (
        <div className="flex fixed inset-0 z-50 flex-col justify-center items-center min-h-screen top-[-480px]">
          {/* Encabezado */}
          {/* <header className="py-4 text-center text-white bg-gray-800"> */}
          {/*   <h1 className="text-2xl font-bold">Iniciar sesiÃ³n</h1> */}
          {/* </header> */}
          {/**/}
          {/* Contenido principal */}

          <div className="flex flex-grow justify-center items-center">
            {/* Campos de usuario y contraseÃ±a */}
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
                  {loading ? "Verificando..." : "Iniciar sesion"}
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
                    Mantener la sesion
                  </Link>
                  <span className="mx-2 text-gray-500">|</span>
                  <Link
                    onClick={registro}
                    to="#"
                    className="text-blue-500 underline hover:text-blue-600"
                  >
                    AÃºn no tienes cuenta
                  </Link>
                </div>
              </form>
              {/* Imagen animada */}
            </div>
          </div>
        </div>
      )}
      {isOpenRe && (
        <div className="flex fixed inset-0 z-50 flex-col justify-center items-center min-h-screen bg-gray-900 bg-opacity-75">
          <div className="py-8 px-6 w-full max-w-md bg-white rounded-lg shadow-lg">
            <button
              className="py-2 px-4 font-bold text-white bg-red-600 rounded hover:bg-red-700 obsolute top-[510px] left-[420px]"
              onClick={registro}
            >
              Cerrar
            </button>
            <h2 className="mb-8 text-2xl font-bold">
              Registro e Inicio de Sesión
            </h2>
            <h2 className="mb-8 text-2xl font-bold"></h2>
            <form onSubmit={handleRegister}>
              {/* Campos de registro */}
              <Link
                to="#"
                className="my-16 text-blue-500 underline hover:text-blue-600"
                onClick={toggleModal}
              >
                Ya tengo cuenta
              </Link>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block mb-2 text-lg">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-lg">
                    Apellido
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="birthdate" className="block mb-2 text-lg">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="birthdate"
                  className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block mb-2 text-lg">
                  Número Telefónico
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Campos de inicio de sesión */}
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-lg">
                  Email
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

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-2 text-lg">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="py-2 px-4 w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="py-2 px-4 mb-4 w-full font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>

              {/* Mensaje de error */}
              {error && <p className="text-red-500">{error}</p>}

              {/* Texto "Ya tengo cuenta" */}
              <div className="text-right"></div>
            </form>

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
              {/* <Link */}
              {/*   to="#" */}
              {/*   className="text-blue-500 underline hover:text-blue-600" */}
              {/* > */}
              {/*   Olvidar contraseña */}
              {/* </Link> */}
              {/* <span className="mx-2 text-gray-500">|</span> */}
              {/* <Link */}
              {/*   to="#" */}
              {/*   className="text-blue-500 underline hover:text-blue-600" */}
              {/* > */}
              {/*   Mantener la sesión */}
              {/* </Link> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
