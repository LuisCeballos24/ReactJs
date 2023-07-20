import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
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
  const [currentBid, setCurrentBid] = useState(0.1);
  const [currentBid2, setCurrentBid2] = useState(0.1);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [email, setEmail] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [showPayPalButton, setShowPayPalButton] = useState(true);

  const [idPersona, setIdPersona] = useState([]);
  const [oferta, setOferta] = useState([]);
  const [refe, setRefe] = useState("");
  const [urls, setUrls] = useState([]);

  const [productName, setProductName] = useState("");
  const [categoria, setcategoria] = useState("");
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
  const [patroUsuarios, setpatroUsuario] = useState([]);
  const [patroOfertas, setpatroOfertas] = useState([]);
  const [partiUsuarios] = useCollectionData(
    db2.collection("CHANGE_580").where("id_S", "==", producto)
  );

  const [products] = useCollectionData(
    db2.collection("Subastas").where("id", "==", producto)
  );
  useEffect(() => {
    if (partiUsuarios && partiUsuarios.length > 0) {
      const product = partiUsuarios[0];
      setpatroUsuario(product.id_persona);
      setpatroOfertas(product.oferta);
    }
  }, [partiUsuarios]);
  useEffect(() => {
    if (products && products.length > 0) {
      const product = products[0]; // Suponiendo que solo hay un producto con ese ID

      setProductName(product.name);
      setProductDescription(product.descripcion);
      setProductrequisitos(product.productRequisitos);
      setStartingPrice(product.price_partida);
      setAuctionType(product.auctionType);
      setAuctionTime(product.uid);

      setAuctionStartDate(product.price);
      setAuctionStartTime(product.images);
      setAuctionEndDate(product.auctionEndDate);
      setAuctionEndTime(product.auctionEndTime);
      setPreviewImages(product.images);
      //console.log(currentBid);
      setCurrentBid(startingPrice);
      // Asigna l bos demás valores a las variables correspondientes
    }
  }, [products]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  useEffect(() => {
    console.log(auctionType);
    const interval = setInterval(() => {
      const currentTimeLeft = Date.parse(40) - Date.now();
      setTimeLeft(currentTimeLeft);
      setProgress((currentTimeLeft / (1000 * 60)) * 100); // Calcula el progreso basado en los minutos restantes
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [50]);
  //funcion de retencion y captura de pago
  const capturePayment = async (orderID) => {
    const paypal = require("@paypal/checkout-server-sdk");

    // Configura las credenciales de autenticación de PayPal
    const environment = new paypal.core.SandboxEnvironment({
      clientId:
        "AcmF1Hwfvtf6HocDkapGRxa02x0IgKFN53JPqvyWDLkNyKWwwO4F9OaF6oA6QUPPutjPORe1qb7CRvWb",
      clientSecret:
        "ECZu6-QuVRcdayBskZvBJUn3rkkLPVHih3mCflGeIPHtIg1iuuc30zpD-NAgmxZMpxfY6vmLsqLp4fDg",
    });
    const client = new paypal.core.PayPalHttpClient(environment);
  };

  const handleApprove = async (data, actions) => {
    try {
      const orderID = data.orderID;
      const request = new paypal.orders.OrdersGetRequest(orderID);
      const response = await client.execute(request);

      // Verificar si el estado del pedido es "APPROVED" (aprobado)
      if (response.result.status === "APPROVED") {
        // Verificar si el usuario tiene fondos suficientes
        const purchaseUnit = response.result.purchase_units[0];
        const purchaseAmount = parseFloat(purchaseUnit.amount.value);
        const userFunds = parseFloat(userAccountFunds); // Debes obtener los fondos del usuario desde tu servidor
        handleSub();
        if (userFunds >= purchaseAmount) {
          // El usuario tiene fondos suficientes, procede a capturar el pago
          const captureRequest = new paypal.orders.OrdersCaptureRequest(
            orderID

            //registrat el usuario en el fondo
          );
          captureRequest.requestBody({
            note_to_payer: "Descripción del pedido",
          });

          const captureResponse = await client.execute(captureRequest);

          // Verifica el estado de la captura de pago
          if (captureResponse.statusCode === 201) {
            console.log("Pago capturado exitosamente");
          } else {
            console.log("Error al capturar el pago");
          }
        } else {
          console.log(
            "El usuario no tiene fondos suficientes para completar la transacción"
          );
        }
      } else {
        console.log("El pedido no ha sido aprobado por el usuario");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  const handleSub = async () => {
    console.log("prosesando..");

    try {
      const querySnapshot = await db2
        .collection("CHANGE_580")
        .where("id_S", "==", producto)

        .get();

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const docRef = db2.collection("CHANGE_580").doc(docId);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
          await docRef.update({
            Diponibilidad: true,
          });

          const ordenData = docSnapshot.data();
          const compareArray = ordenData.id_persona || [];
          compareArray.push(auth.currentUser.uid);

          await docRef.update({
            id_persona: compareArray,
          });

          const ordenData2 = docSnapshot.data();
          const compareArray2 = ordenData2.oferta || [];
          compareArray2.push(currentBid);

          await docRef.update({
            oferta: compareArray2,
          });

          console.log("Oferta actualizada");
        } else {
          console.log("La orden no exis");
        }
      } else {
        console.log("La orden no existe");
      }
    } catch (error) {
      console.log("Error al actualizar al actualizar la oferta:", error);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const fetchFeatures = async () => {
      const featuresWithCredentials = await Promise.all(
        patroUsuarios.map(async (value, index) => {
          // Realiza la búsqueda en la base de datos de Firebase utilizando el id de cada elemento en productId
          // console.log(patroUsuarios);
          try {
            const docRef = db2.collection("usuarios").doc(value);
            const docSnap = await docRef.get();

            console.log("<---->");
            console.log(value);

            if (docSnap.exists) {
              console.log("<--USUARIO ENCONTRADO-->");
              console.log(value);
              const userData = docSnap.data();
              console.log("Email:", userData.email);
              console.log("First Name:", userData.firstName);
              console.log("Last Name:", userData.lastName);
              console.log("phoneNumber:", userData.phoneNumber);
              const newFeature = {
                image: url[index],
                description: description[index],
                offer: price[index],
                credentials: {
                  email: userData.email,
                  firstName: userData.firstName,
                  lastName: userData.lastName,
                  phoneNumber: userData.phoneNumber,
                },
              };
              return newFeature; // Devuelve el objeto newFeature
            } else {
              console.log(
                "No se encontró el usuario con el ID de documento proporcionado."
              );
              return {}; // Devuelve un objeto vacío para filtrar después
            }
          } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
            return {}; // Devuelve un objeto vacío para filtrar después
          }
        })
      );
      // Filtra los objetos vacíos antes de establecer el estado
      const validFeaturesWithCredentials = featuresWithCredentials.filter(
        (feature) => Object.keys(feature).length > 0
      );
      console.log(validFeaturesWithCredentials);
      setusers(validFeaturesWithCredentials);
    };

    fetchFeatures();
  }, [patroUsuarios]);
  const [users, setusers] = useState([]);

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
          .where("id_S", "==", producto)
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

  const handleChangeImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleBid = (action) => {
    if (action === "-") {
      setCurrentBid((prevBid) => Math.max(prevBid - 5, 0));
    } else if (action === "+") {
      //setShowPayPalButton(!showPayPalButton);
      setCurrentBid((prevBid) => prevBid + 5);
    }

    const hideButtonTimer = setTimeout(() => {
      setShowPayPalButton(false);
      const showButtonTimer = setTimeout(() => {
        setShowPayPalButton(true);
      }, 0.00001);

      return () => {
        clearTimeout(showButtonTimer);
      };
    }, 0.00001);

    return () => {
      clearTimeout(hideButtonTimer);
    };

    setCurrentBid2(currentBid);
  };

  const handleInputChange = (e) => {
    setCurrentBid2(currentBid);
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
                className={`py-2 px-4 text-gray-600 bg-gray-200 rounded ${selectedCategory === "category1"
                    ? "bg-blue-500 text-white"
                    : ""
                  }`}
                onClick={() => handleCategoryClick("category1")}
              >
                Categoría 1
              </button>
              <button
                className={`py-2 px-4 text-gray-600 bg-gray-200 rounded ${selectedCategory === "category2"
                    ? "bg-blue-500 text-white"
                    : ""
                  }`}
                onClick={() => handleCategoryClick("category2")}
              >
                Categoría 2
              </button>
              <button
                className={`py-2 px-4 text-gray-600 bg-gray-200 rounded ${selectedCategory === "category3"
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
            {auctionType === "estandar" && (
              <div className="p-4 shadow-lg">
                <div className="p-4 shadow-lg">
                  <h2 className="mb-4 text-xl font-bold">
                    Formulario de oferta
                  </h2>
                  <form onSubmit={handleSubmit}>
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
            {auctionType === "express" && (
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
                      onChange={handleInputChange}
                    />
                    <button
                      className="p-2 text-white bg-blue-500 rounded"
                      onClick={() => handleBid("+")}
                    >
                      +
                    </button>
                    {/*inicio boton de paypal*/}
                    {showPayPalButton && (
                      <PayPalScriptProvider
                        options={{
                          "client-id":
                            "AcmF1Hwfvtf6HocDkapGRxa02x0IgKFN53JPqvyWDLkNyKWwwO4F9OaF6oA6QUPPutjPORe1qb7CRvWb",
                        }}
                      >
                        <PayPalButtons
                          createOrder={(data, actions) => {
                            handleSub();

                            return actions.order.create({
                              purchase_units: [
                                {
                                  description: "total a pagar",
                                  amount: {
                                    value: parseFloat(currentBid), // Precio del producto
                                  },
                                },
                              ],
                            });
                          }}
                          onApprove={handleApprove}
                        />
                      </PayPalScriptProvider>
                    )}
                    {/*fin boton de paypal*/}
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
            {selectedCategory === "category1" &&
              props.auctionType === "estandar" && (
                <div className="p-4 shadow-lg">
                  <div className="mt-4">
                    <h3 className="mb-2 text-xl font-bold">Tiempo restante </h3>
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
                    <h3 className="mb-2 text-xl font-bold">
                      Puja actual {producto}{" "}
                    </h3>
                    <div className="flex gap-2 items-center">
                      <button
                        className="p-2 text-white bg-blue-500 rounded"
                        onClick={() => handleBid("-")}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="py-2 px-4 bg-red-800 rounded border border-gray-300"
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
            {selectedCategory === "category3" && <div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_subasta;

{
}
