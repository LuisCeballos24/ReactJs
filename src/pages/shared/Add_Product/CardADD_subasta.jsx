import React, { useState, useEffect } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { db2, auth, storage2 } from "../../../utils/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

const CardADD_subasta = (props) => {
  /*
  Esta función suma dos números enteros y devuelve el resultado.
  Parámetros:
    - num1: primer número entero
    - num2: segundo número entero
  Retorna:
    El resultado de la suma de num1 y num2.
*/
  const [user] = useAuthState(auth);

  /*

    
  Esta función suma dos números enteros y devuelve el resultado.
  Parámetros:
    - num1: primer número entero
    - num2: segundo número entero
  Retorna:
    El resultado de la suma de num1 y num2.
*/
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
  const [previewImages, setPreviewImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  const [Ventana, setVentana] = useState(0);
  const [estadoHijo, setEstadoHijo] = useState(false);

  const [id_persona, setIdpersona] = useState([]);
  const [oferta, setoferta] = useState([]);
  const [descrip, setdescrip] = useState([]);
  const [urlcv, setUrlCV] = useState([]);
  /*
  Esta Estas variables son para la funciones de agregar 
  Parámetros:
    - num1: texto 
    - num2: boolenos
  Retorna:
    El resultado de la suma de num1 y num2.
*/
  const [name, setname] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [price_partida, setprice] = useState("");
  const [Dura_hD, setDH] = useState("");
  const [Fecha_I, setInc] = useState("");
  const [Fecha_C, setCierre] = useState("");
  const [TIPO, setTipo] = useState("");
  const [Dis, setDis] = useState(true);

  const Vista_Previa = () => {
    console.log("Paso por aqui");
    const nuevoEstado = !estadoHijo;
    const ven = 1;
    setVentana(ven);
    setEstadoHijo(nuevoEstado);
    props.VistaPrevia(nuevoEstado, ven);
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imageFiles = Array.from(files);

    const readerPromises = imageFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          resolve(event.target.result);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((imageUrls) => {
      setPreviewImages(imageUrls);
      setCurrentImageIndex(0);
      setUrl(imageUrls[0]); // Establecer la URL de la primera imagen como el valor inicial de "url"
    });
  };

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
    setUrl(previewImages[index]);
  };

  // Función para manejar la carga de imágenes

  // Asegurarse de liberar los recursos de las URLs de las imágenes al desmontar el componente
  useEffect(() => {
    return () => {
      previewImages.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImages]);

  useEffect(() => {
    return () => {
      previewImages.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImages]);
  const handleAuctionTypeChange = (e) => {
    setAuctionType(e.target.value);

    setAuctionTime("");
    setAuctionStartDate("");
    setAuctionStartTime("");
    setAuctionEndDate("");
    setAuctionEndTime("");
  };

  const handleAuctionTimeChange = (e) => {
    setAuctionTime(e.target.value);
    setAuctionEndDate(calculateAuctionEndDate(e.target.value));
    setAuctionEndTime(calculateAuctionEndTime(e.target.value));
  };

  const handleAuctionStartDateChange = (e) => {
    // handleAuctionStartTimeChange();
    setAuctionStartDate(e.target.value);
    setAuctionEndDate(
      calculateAuctionEndDate(auctionTime, e.target.value, auctionStartTime)
    );
    setAuctionEndTime(
      calculateAuctionEndTime(auctionTime, e.target.value, auctionStartTime)
    );
  };

  const handleAuctionStartTimeChange = (e) => {
    setAuctionStartTime(e.target.value);
    setAuctionEndTime(
      calculateAuctionEndTime(auctionStartTime, auctionTime, auctionStartDate)
    );
  };

  const calculateAuctionEndDate = (time, startDate, startTime) => {
    if (!time || !startDate || !startTime) {
      return "";
    }

    const duration = parseInt(time.split(" ")[0]);
    const unit = time.split(" ")[1];
    let endDate = new Date(startDate);
    let endTime = new Date(startTime);

    if (unit === "horas") {
      endDate.setHours(endDate.getHours() + duration);
    } else if (unit === "minutos") {
      endDate.setMinutes(endDate.getMinutes() + duration);
    } else if (unit === "días") {
      endDate.setDate(endDate.getDate() + duration);
    }

    return endDate.toISOString().split("T")[0];
  };

  const calculateAuctionEndTime = (startTime, selectedTime, startDate) => {
    if (!startTime || !selectedTime || !startDate) return "";

    const start = new Date(`2000-01-01T${startTime}`);
    const endTime = new Date(start);

    if (selectedTime) {
      const duration = parseInt(selectedTime.split(" ")[0], 10);
      const unit = selectedTime.split(" ")[1];

      if (unit === "horas") {
        endTime.setHours(start.getHours() + duration);
      } else if (unit === "minutos") {
        endTime.setMinutes(start.getMinutes() + duration);
      }
    }

    return endTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let id_p = Date.now();
    try {
      // Agregar el producto a Firestore
      const productRef = await db2.collection("Subastas").add({
        name,
        productRequisitos,
        descripcion,
        price_partida,
        auctionTime,
        auctionStartDate,
        auctionEndDate,
        auctionStartTime,
        auctionEndTime,
        auctionType,
        Dis,
        uid: user.uid,
        url, // Agregar la URL al objeto
      });
      await productRef.update({ id: productRef.id });
      // Subir las imágenes al Storage
      const urls = await Promise.all(
        previewImages.map(async (imageUrl) => {
          try {
            const imageFile = await fetch(imageUrl).then((res) => res.blob());
            const uploadTask = storage2
              .ref(`images/${productRef.id}/${productRef.name}`)
              .put(imageFile);
            const snapshot = await uploadTask;
            const url = await snapshot.ref.getDownloadURL();
            return url;
          } catch (error) {
            console.error("Error al subir una imagen:", error);
            throw error;
          }
        })
      );

      try {
        const productData = {
          id_S: productRef.id,
          images: urls,
          buyerId: auth.currentUser.uid,
          nombre: name,
          id_persona: id_persona,
          oferta: oferta,
          descripcion: descrip,
          url: urlcv,
          Disponibilidad: "false",
        };
        const docRef = await db2.collection("CHANGE_580").add(productData);
        console.log(`Producto con id agregado al carrito Change`);
      } catch (error) {
        console.error(
          "Error al agregar el producto al carrito: ",
          error.message
        );
      }
      // Actualizar el producto con las URLs de las imágenes
      await productRef.update({ images: urls });
      // Reiniciar el formulario
      setname("");
      setdescripcion("");
      setprice("");
      setPreviewImages([]);
      alert(" Producto de subasta agregado");
    } catch (error) {
      console.error("Error al agregar el producto:");
      alert(
        "Ocurrió un error al agregar el producto. Por favor, inténtalo de nuevo."
      );
    }

    console.log("Fomualario enviado");
  };

  return (
    <div className="flex overflow-hidden flex-col justify-center rounded-md shadow-lg md:flex-row card">
      <div className="w-full md:w-1/2">
        <button
          onClick={() => Vista_Previa()}
          className="py-2 px-4 mt-4 text-white bg-red-500 rounded md:mt-0 md:ml-4"
        >
          <BsFillArrowLeftSquareFill className="ml-2" size={20} />
        </button>{" "}
        <div className="p-4 shadow-lg">
          <div className="card-description">
            <h2 className="mb-2 text-xl font-bold">Registro de Subasta</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-bold">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  className="p-2 w-full rounded border border-gray-300"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Requisitos</label>
                <input
                  type="text"
                  className="p-2 w-full rounded border border-gray-300"
                  value={productRequisitos}
                  onChange={(e) => setProductrequisitos(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">
                  Descripción del Producto
                </label>
                <textarea
                  className="p-2 w-full rounded border border-gray-300"
                  value={descripcion}
                  onChange={(e) => setdescripcion(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">
                  Precio de partida
                </label>
                <input
                  type="number"
                  className="p-2 w-full rounded border border-gray-300"
                  value={price_partida}
                  onChange={(e) => setprice(Number(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">Tipo de Subasta</label>
                <select
                  className="p-2 w-full rounded border border-gray-300"
                  value={auctionType}
                  onChange={handleAuctionTypeChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="express">Subasta Express</option>
                  <option value="estandar">Subasta Estándar</option>
                </select>
              </div>
              {auctionType === "express" && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold">
                      Duración de la Subasta
                    </label>
                    <select
                      className="p-2 w-full rounded border border-gray-300"
                      value={auctionTime}
                      onChange={handleAuctionTimeChange}
                    >
                      {" "}
                      <option value="">Seleccionar</option>
                      <option value="15 minutos">15 minutos</option>
                      <option value="30 minutos">30 minutos</option>
                      <option value="45 minutos">45 minutos</option>
                      <option value="1 horas">1 hora</option>
                      <option value="2 horas">2 horas</option>
                      <option value="3 horas">3 horas</option>
                      <option value="4 horas">4 horas</option>
                    </select>
                  </div>
                  {auctionTime && (
                    <>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Fecha de inicio de la Subasta
                        </label>
                        <input
                          type="date"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionStartDate}
                          onChange={handleAuctionStartDateChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Hora de inicio de la Subasta
                        </label>
                        <input
                          type="time"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionStartTime}
                        // onChange={handleAuctionStartTimeChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Fecha de cierre de la Subasta
                        </label>
                        <input
                          type="text"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionEndDate}
                          readOnly
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Hora de cierre de la Subasta
                        </label>
                        <input
                          type="text"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionEndTime}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              {auctionType === "estandar" && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold">
                      Duración de la Subasta
                    </label>
                    <select
                      className="p-2 w-full rounded border border-gray-300"
                      value={auctionTime}
                      onChange={handleAuctionTimeChange}
                    >
                      <option value="">Seleccionar</option>
                      <option value="1 días">1 día</option>
                      <option value="2 días">2 días</option>
                      <option value="3 días">3 días</option>
                      <option value="4 días">4 días</option>
                      <option value="5 días">5 días</option>
                      <option value="6 días">6 días</option>
                      <option value="7 días">7 días</option>
                    </select>
                  </div>
                  {auctionTime && (
                    <>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Fecha de inicio de la Subasta
                        </label>
                        <input
                          type="date"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionStartDate}
                          onChange={handleAuctionStartDateChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Hora de inicio de la Subasta
                        </label>
                        <input
                          type="time"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionStartTime}
                          onChange={handleAuctionStartTimeChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Fecha de cierre de la Subasta
                        </label>
                        <input
                          type="text"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionEndDate}
                          readOnly
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Hora de cierre de la Subasta
                        </label>
                        <input
                          type="text"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionEndTime}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Crear Subasta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-8 w-full bg-gray-100 md:w-1/2">
        <div className="text-center">
          <div className="flex flex-col justify-center items-center p-6 text-left text-gray-300 bg-white rounded-xl border-t border-r border-b transition">
            <div className="relative justify-center border border-gray-600 h-[360px] w-[300px]">
              {/* ... Código de la imagen principal ... */}
              <div className="relative left-0 z-20 justify-center border h-[360px] w-[300px]">
                {previewImages.length > 0 && (
                  <img
                    src={previewImages[currentImageIndex]}
                    alt={`Preview ${currentImageIndex + 1}`}
                    className="object-cover w-full h-full rounded"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <div className="justify-center mt-4">
                {/* ... Código de las imágenes previas ... */}
                <div className="justify-center mt-4">
                  <label className="block mb-2 font-bold text-gray-700">
                    Imágenes previas:
                  </label>
                  <div className="flex justify-center space-x-2">
                    {previewImages.map((image, index) => (
                      <button
                        key={index}
                        className={`h-12 w-12 rounded-full ${index === currentImageIndex
                            ? "bg-blue-500"
                            : "bg-gray-300"
                          }`}
                        onClick={() => handleImageChange(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <label
                htmlFor="images"
                className="mt-4 mb-2 font-bold text-gray-700"
              >
                Subir imagen:
              </label>
              {/* Resto del código del input de imágenes */}
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageUpload}
                multiple
                className="p-2 text-gray-800 rounded-lg"
              />
            </div>
          </div>
          <h2 className="mb-4 text-xl font-bold">
            Visualización previa de la Subasta
          </h2>
          {productName && <h3 className="mb-2">{productName}</h3>}
          {productDescription && <p className="mb-4">{productDescription}</p>}
          {startingPrice && (
            <p className="mb-4">Precio de partida: ${startingPrice}</p>
          )}
          {auctionType && (
            <p className="mb-4">
              Tipo de subasta:{" "}
              {auctionType === "express"
                ? "Subasta Express"
                : "Subasta Estándar"}
            </p>
          )}
          {auctionTime && (
            <p className="mb-4">Duración de la subasta: {auctionTime}</p>
          )}
          {auctionStartDate && (
            <p className="mb-4">Fecha de inicio: {auctionStartDate}</p>
          )}
          {auctionStartTime && (
            <p className="mb-4">Hora de inicio: {auctionStartTime}</p>
          )}
          {auctionEndDate && (
            <p className="mb-4">Fecha de cierre: {auctionEndDate}</p>
          )}
          {auctionEndTime && (
            <p className="mb-4">Hora de cierre: {auctionEndTime}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardADD_subasta;
