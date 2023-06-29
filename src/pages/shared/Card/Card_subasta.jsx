import React, { useEffect, useState } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import Countdown from "react-countdown";
import { FaUser, FaEnvelope, FaFile } from "react-icons/fa";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2, auth } from "../../../utils/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

const Card_subasta = (props) => {
  const { producto } = props;
  const [user] = useAuthState(auth);
  const [url, seturl] = useState("");
  const [Status, setStatus] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(Date.parse(40) - Date.now());
  const [progress, setProgress] = useState(100);
  const [currentBid, setCurrentBid] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [email, setEmail] = useState("");
  const [cvFile, setCvFile] = useState(null);

  const [idPersona, setIdPersona] = useState([]);
  const [oferta, setOferta] = useState([]);
  const [refe, setRefe] = useState("");
  const [urls, setUrls] = useState([]);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productRequisitos, setProductrequisitos] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [auctionType, setAuctionType] = useState("");
  const [auctionTime, setAuctionTime] = useState("");
  const [auctionStartDate, setAuctionStartDate] = useState("");
  const [auctionStartTime, setAuctionStartTime] = useState("");
  const [auctionEndDate, setAuctionEndDate] = useState("");
  const [auctionEndTime, setAuctionEndTime] = useState("");
  const [previewImages, setPreviewImages] = useState("");
  const images = [previewImages, "../../../../public/Store.svg"];
  const [products] = useCollectionData(
    db2.collection("Subastas").where("id", "==", producto)
  );

  useEffect(() => {
    if (products && products.length > 0) {
      const product = products[0]; // Suponiendo que solo hay un producto con ese ID

      setProductName(product.name);
      setProductDescription(product.descripcion);
      setProductrequisitos(product.productRequisitos);
      setStartingPrice(product.price_partida);
      setAuctionType(product.Status);
      setAuctionTime(product.uid);

      setAuctionStartDate(product.price);
      setAuctionStartTime(product.images);
      setAuctionEndDate(product.auctionEndDate);
      setAuctionEndTime(product.auctionEndTime);
      setPreviewImages(product.images);

      // Asigna l bos demás valores a las variables correspondientes
    }
  }, [products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTimeLeft = Date.parse(40) - Date.now();
      setTimeLeft(currentTimeLeft);
      setProgress((currentTimeLeft / (1000 * 60)) * 100); // Calcula el progreso basado en los minutos restantes
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [50]);

  const formatTime = (time) => {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Obtener los datos del formulario

    // Verificar si el id_persona ya existe en el arreglo

    // Agregar los datos al arreglo correspondiente

    // Guardar los datos en Firebase
    console.log(producto);

    try {
      const user = auth.currentUser; // Obtiene el usuario actualmente autenticado

      if (user) {
        const querySnapshot = await db2
          .collection("CHANGE_580")
          .where("id_S", "==", "cqrVzya1CzTOywWpSNjy")
          .get();

        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          const docData = querySnapshot.docs[0].data();

          const existingIds = new Set(docData.id_persona); // Crea un conjunto para almacenar los IDs existentes

          if (!existingIds.has(user.uid)) {
            // Verifica si el ID del usuario autenticado ya existe en el arreglo
            const updatedData = {
              id_persona: [...docData.id_persona, user.uid], // Agrega el nuevo ID al arreglo existente
              oferta: [...docData.oferta, oferta], // Agrega la nueva oferta al arreglo existente
              descripcion: [...docData.descripcion, refe], // Agrega la nueva descripción al arreglo existente
              url: [...docData.url, url], // Agrega la nueva URL al arreglo existente
            };

            await docRef.update(updatedData);

            console.log("Datos actualizados en Firebase");
          } else {
            console.log("El ID de usuario ya existe en el arreglo id_persona");
          }
        } else {
          console.log("El documento no existe");
        }
      } else {
        console.log("No hay usuario autenticado");
      }
    } catch (error) {
      console.error("Error al actualizar los datos en Firebase:", error);
    } // Reiniciar los campos del formulario
    setOferta("");
    setCvFile(null);
  };

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
  ];

  const handleChangeImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBid = (action) => {
    if (action === "-") {
      setCurrentBid((prevBid) => Math.max(prevBid - 5, 0));
    } else if (action === "+") {
      setCurrentBid((prevBid) => prevBid + 5);
    }
  };
  const [estadoHijo, setEstadoHijo] = useState(false);
  const [Ventana, setVentana] = useState(0);
  const Vista = () => {
    const nuevoEstado = !estadoHijo;

    const ven = 1;
    setVentana(ven);

    setEstadoHijo(nuevoEstado);
    props.VistaPrevia(nuevoEstado, ven);
  };

  return (
    <div className="flex overflow-hidden flex-col justify-center py-5 rounded-md shadow-lg md:flex-row card">
      <div className="h-full bg-red-500 rounded-full sm:h-96 lg:h-full">
        <button
          onClick={() => Vista()}
          className="py-2 px-4 mt-4 text-white bg-red-500 rounded rounded-full md:mt-0 md:ml-4"
        >
          <BsFillArrowLeftSquareFill className="ml-2" size={20} />
        </button>
      </div>
      <div className="w-full md:w-1/2">
        {" "}
        <div className="relative">
          <div className="card-image">
            <img
              src={images[currentImageIndex]}
              alt="Imagen del Producto"
              className="w-full h-auto lg:w-[700px]"
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
          <div className="py-4 card-image">
            <img
              src={images[currentImageIndex]}
              alt="Imagen del Producto"
              className="w-full h-auto lg:w-[700px]"
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
        <div className="mt-4 w-full"></div>
      </div>
      <div className="mt-4 w-full md:mt-0 md:w-1/2">
        <div className="p-4">
          <div className="card-description-advanced">
            <h2 className="mb-4 text-xl font-bold text-center">
              Descripciones avanzadas de producto
            </h2>
            <nav className="flex flex-wrap gap-2">
              <button
                className={`py-2 px-4 text-gray-600 bg-gray-200 rounded ${
                  selectedCategory === "category1"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleCategoryClick("category1")}
              >
                Categoría 1
              </button>
              <button
                className={`py-2 px-4 text-gray-600 bg-gray-200 rounded ${
                  selectedCategory === "category2"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleCategoryClick("category2")}
              >
                Categoría 2
              </button>
              <button
                className={`py-2 px-4 text-gray-600 bg-gray-200 rounded ${
                  selectedCategory === "category3"
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
                onClick={() => handleCategoryClick("category3")}
              >
                Categoría 3
              </button>{" "}
            </nav>
            <div className="p-4 shadow-lg">
              <div className="card-description">
                <h2 className="mb-2 text-xl font-bold">{productName}</h2>
                <p className="mb-4 text-gray-600">
                  Precio inicial: {startingPrice}
                </p>
                <p className="mb-4 text-gray-600">
                  Fecha de cierre: {auctionEndDate}
                </p>
                <p className="mb-4 text-gray-600">
                  Hora de cierre: {auctionEndTime}
                </p>

                <div className="flex gap-3 items-center mt-4">
                  {/* Aquí puedes agregar elementos adicionales */}
                </div>

                <div className="mt-4">
                  <p className="text-gray-500">Vendedor: John Doe</p>
                  <p className="text-gray-500">Tienda: Mi Tienda</p>
                </div>
              </div>
            </div>{" "}
            {selectedCategory === "category1" && (
              <div className="p-4 shadow-lg">
                <div className="mt-4">
                  <h3 className="mb-2 text-xl font-bold">Tiempo restante</h3>
                  <div className="flex gap-2 items-center">
                    <div className="countdown-card">
                      <h2>Countdown</h2>
                      <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                      <div className="countdown-timer">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                    <div className="w-full h-2 bg-gray-300 rounded">
                      <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${progress}%` }}
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
                      value={currentBid}
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
                </div>{" "}
              </div>
            )}
            {selectedCategory === "category2" && (
              <div>
                <div className="mt-4">
                  <h3 className="mb-2 font-bold">Descripcion</h3>
                  <p className="text-gray-600">{productDescription} </p>
                </div>
                <div className="mt-4">
                  <h3 className="mb-2 font-bold">Requisitos</h3>
                  <p className="text-gray-600">{productRequisitos} </p>
                </div>
              </div>
            )}
            {selectedCategory === "category3" && (
              <div className="p-4 shadow-lg">
                <div className="p-4 shadow-lg">
                  <h2 className="mb-4 text-xl font-bold">
                    Formulario de oferta
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="py-2 px-3 rounded border border-gray-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="flex items-center">
                        <FaEnvelope className="mr-2" />
                        Oferta
                      </label>{" "}
                      <textarea
                        id="oferta"
                        className="py-2 px-3 rounded border border-gray-300"
                        value={oferta}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /\D/g,
                            ""
                          ); // Filtra los caracteres no numéricos
                          setOferta(numericValue);
                        }}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="oferta" className="block">
                        Referenciacion
                      </label>
                      <textarea
                        id="oferta"
                        className="py-2 px-3 rounded border border-gray-300"
                        value={refe}
                        onChange={(e) => setRefe(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="cvFile" className="flex items-center">
                        <FaFile className="mr-2" />
                        Adjuntar CV
                      </label>
                      <input
                        type="file"
                        id="cvFile"
                        className="py-2 px-3 rounded border border-gray-300"
                        onChange={(e) => setCvFile(e.target.files[0])}
                        accept=".pdf,.doc,.docx"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="py-2 px-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_subasta; // const users = [

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
