import React from "react";
import { useState, useEffect } from "react";
import { RiCloseLine, RiExchangeBoxLine } from "react-icons/ri";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { BsPlusSquareFill, BsCartPlus } from "react-icons/bs";
import { db2, auth, storage } from "../../../utils/firebase.js";

const Card = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const {
    key_1,
    name,
    descripcion,
    requisito,
    price_partida,
    auctionTime,
    auctionStartDate,
    auctionEndDate,
    auctionStartTime,
    auctionEndTime,
    auctionType,
    Dis,
    img,
  } = props;
  const VistaPrevia = (index) => {
    setCurrentImageIndex(index);
    console.log(index);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [propuestas, setPropuestas] = useState("");
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [opcionAbierta, setOpcionAbierta] = useState(null);
  const [opcionAbiertaProducto, setOpcionAbiertaProducto] = useState(null);
  const images = [img];

  const [products, loading, error] = useCollectionData(
    db2.collection("productos").where("uid", "==", auth.currentUser.uid)
  );
  const [opciones, setOpciones] = useState([""]);

  const countIdPersona = async () => {
    const querySnapshot = await db2
      .collection("CHANGE_580")
      .where("id_S", "==", props.key_1)
      .get();

    try {
      if (!querySnapshot.empty) {
        const documentData = querySnapshot.docs[0].data();
        const id_persona = documentData.id_persona;
        const cantidadElementos = id_persona.length;
        console.log("Cantidad de elementos en id_persona:", cantidadElementos);
        setPropuestas(cantidadElementos);
      } else {
        console.log("El documento no existe");
      }
    } catch (error) {
      console.error("Error al obtener los datos del documento:", error);
    }
  };

  useEffect(() => {
    countIdPersona();
    if (products) {
      const opciones = products.map((producto) => ({
        name: producto.name,
        imageUrl: producto.images,
        idproducto: producto.id, // Reemplaza "producto.imageUrl" con la propiedad que contiene la URL de la imagen en el objeto del producto
      }));
      setOpciones(opciones);
    }
  }, [products]);

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const getImagesFromStorage = async () => {
      try {
        const storageRef = storage.ref(); // Obtener la referencia a la raíz del Storage

        const urls = await Promise.all(
          images.map(async (imageName) => {
            const imageUrl = await storageRef.child(imageName).getDownloadURL();
            return imageUrl;
          })
        );

        setImageUrls(urls);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        // Maneja el error de alguna manera apropiada
      }
    };

    getImagesFromStorage();
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const imagePromises = images.map(async (imageName) => {
          // Obtener la referencia al archivo en Firebase Storage
          const imageRef = storage.ref(imageName);

          // Obtener la URL de descarga del archivo
          const url = await imageRef.getDownloadURL();

          return url;
        });

        // Esperar a que todas las promesas se resuelvan y obtener las URLs de las imágenes
        const urls = await Promise.all(imagePromises);

        // Establecer las URLs de las imágenes en el estado
        setImageUrls(urls);
      } catch (error) {
        console.error("Error al obtener las URLs de las imágenes:", error);
      }
    };

    fetchImageUrls();
  }, []);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    console.log(index);
  };

  const Vista = (index) => {
    console.log(index);
    props.Vistap(true, 5, index);
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowFullDescription(true);
  };

  const handleMouseLeave = () => {
    setShowFullDescription(false);
  };
  return (
    <div
      className="shadow-xl flex flex-col sm:flex-row items-start p-6 py-5 text-left text-gray-900 bg-white rounded-xl border border-gray-300 transition hover:border-[#E89440]"
      style={{ overflow: "hidden" }}
    >
      <div className="mr-6 w-72 h-72 bg-blue-200">
        <img
          src={images[currentImageIndex]}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
        <div className="flex justify-center mt-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full bg-gray-300 cursor-pointer mx-1 transition ${
                index === currentImageIndex ? "bg-gray-600" : ""
              }`}
              onClick={() => handleImageClick(index)}
            ></div>
          ))}
        </div>
      </div>

      <div
        onClick={() => Vista(props.key_1)}
        className="flex flex-col flex-grow cursor-pointer"
      >
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
          <p className="text-gray-700">ID: {props.key_1}</p>
          <p className="text-gray-700">Fecha de cierre: {auctionEndDate}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-800">Precio inicial: ${price_partida}</p>
          <p className="text-gray-800">{propuestas} Propuestas</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Descripción:</h3>
          <p
            className="text-gray-600"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {showFullDescription
              ? descripcion
              : `${descripcion.slice(0, 100)}...`}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-red-900">Requisitos:</h3>
          <p
            className="text-gray-600"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {showFullDescription ? requisito : `${requisito.slice(0, 100)}...`}
          </p>
        </div>
        <div className="mb-4">
          <div className="overflow-hidden relative w-full h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 w-full">
          <div
            id="opciones"
            className={`${
              mostrarOpciones ? "" : "hidden"
            } inset-0 fixed py-5 mt-4 border shadow-black w-52 cursor-pointer text-gray-800 bg-white rounded shadow-lg z-50`}
            style={{ overflow: "hidden" }}
          >
            <div className="flex items-center px-2">
              <button
                className="flex items-center mb-2 w-16 h-5 text-sm text-red-600 rounded hover:text-white hover:bg-red-600"
                onClick={() => setMostrarOpciones(false)}
              >
                <RiCloseLine className="mr-1" /> Cerrar
              </button>
            </div>
          </div>

          {!Dis && (
            <button className="flex p-2 rounded-lg" onClick={handleClick}>
              <BsCartPlus className="text-xl bg-white hover:text-green-600 text-primary" />
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <button className="py-2 px-4 text-white bg-blue-500 rounded-lg">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
