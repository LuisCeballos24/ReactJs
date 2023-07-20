import React, { useState, useEffect } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaTags,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { db2 } from "../../../utils/firebase";
const Card_V = (props) => {
  const { price, productId, description, url } = props;
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
  const [features, setFeatures] = useState([]);
  // const features = price.map((value, index) => {
  //   return {
  //     image: url[index],
  //     title: productId[index],
  //     description: description[index],
  //     offer: value,
  //   };
  // });
  //
  useEffect(() => {
    const fetchFeatures = async () => {
      const featuresWithCredentials = await Promise.all(
        price.map(async (value, index) => {
          // Realiza la búsqueda en la base de datos de Firebase utilizando el id de cada elemento en productId

          try {
            const docRef = db2.collection("usuarios").doc(productId[index]);
            const docSnap = await docRef.get();

            if (docSnap.exists) {
              const userData = docSnap.data();
              console.log("Email:", userData.email);
              console.log("First Name:", userData.firstName);
              console.log("Last Name:", userData.lastName);
              console.log("phoneNumber:", userData.phoneNumber);
              const newFeature = {
                image: url[index],
                title: productId[index],
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
      setFeatures(validFeaturesWithCredentials);
    };

    fetchFeatures();
  }, [price, url, productId, description]);
  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-16 p-8 md:grid-cols-4">
      {/* Contenedor de Perfil */}
      <div className="col-span-1">
        <div className="p-6">
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
              {props.name}
            </h3>
            <img
              src={props.img}
              alt="Imagen de perfil"
              className="mx-auto mb-4 w-full h-44 bg-red-300"
            />
          </div>

          <div className="mb-4 border-b-2 border-gray-300"></div>
          <p className="mb-4">
            Descripción de la promoción que destaca sus beneficios principales.
          </p>
        </div>
      </div>
      {/* Contenedor de la Lista */}
      <div className="col-span-3">
        <div className="overflow-y-auto gap-16 h-96 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
            {features.map((item, index) => (
              <div key={index} className="p-4 bg-white shadow-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt="Imagen promocional"
                    className="w-24 h-24 rounded-full"
                  />
                  <div>
                    <h4 className="text-lg font-bold bg-grey"> </h4>
                    <h4 className="text-lg font-bold bg-grey">
                      {item.credentials.firstName} {item.credentials.lastName}
                    </h4>
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
                      <div className="flex p-6 ml-6 bg-white rounded-lg shadow-lg">
                        <div>
                          <p className="mb-4 text-gray-600">
                            User since <span className="font-bold">2019</span>
                          </p>
                          <p className="text-gray-600">{item.description}</p>
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">
                              {item.credentials.email}{" "}
                            </p>
                            <p className="text-sm text-gray-500">
                              Location: New York, USA
                            </p>
                          </div>
                        </div>
                      </div>{" "}
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
    </div>
  );
};

export default Card_V;
