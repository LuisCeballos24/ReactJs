import React, { useState, useEffect } from "react";
import { BsCartPlus, BsArrowRepeat } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2 } from "../../../utils/firebase.js";

const Card = (props) => {
  const {
    key,
    id,
    id_2,
    name,
    requisito,
    price_partida,
    auctionEndDate,
    Dis,
    img,
    img2,
    desc1,
    desc2,
  } = props;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [url, seturl] = useState("");
  const images = [url]; // Agrega aquí las rutas de las imágenes
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [Status, setStatus] = useState(false);
  const [uid, setuid] = useState("");

  const [currentImageIndex_ADS, setCurrentImageIndex_ADS] = useState(0);
  const [url_ADS, seturl_ADS] = useState("");
  const images_ADS = [url_ADS]; // Agrega aquí las rutas de las imágenes
  const [nombre_ADS, setNombre_ADS] = useState("");
  const [descripcion_ADS, setDescripcion_ADS] = useState("");
  const [precio_ADS, setPrecio_ADS] = useState("");
  const [Status_ADS, setStatus_ADS] = useState(false);
  const [uid_ADS, setuid_ADS] = useState("");

  const [products_ADS] = useCollectionData(
    db2.collection("productos").where("id", "==", id_2)
  );

  const [products] = useCollectionData(
    db2.collection("productos").where("id", "==", id)
  );

  useEffect(() => {
    if (products && products.length > 0) {
      const product = products[0]; // Suponiendo que solo hay un producto con ese ID
      setNombre(product.name);
      setDescripcion(product.description);
      setPrecio(product.price);
      seturl(product.images);
      setStatus(product.Status);
      setuid(product.uid);
      // Asigna los demás valores a las variables correspondientes
    }
  }, [products]);

  useEffect(() => {
    if (products_ADS && products_ADS.length > 0) {
      const product_1 = products_ADS[0]; // Suponiendo que solo hay un producto con ese ID
      console.log("--->" + product_1);
      setNombre_ADS(product_1.name);
      setDescripcion_ADS(product_1.description);
      setPrecio_ADS(product_1.price);
      seturl_ADS(product_1.images);
      setStatus_ADS(product_1.Status);
      setuid_ADS(product_1.uid);
      // Asigna los demás valores a las variables correspondientes
    }
  }, [products_ADS]);

  const handleClick = () => {
    // Lógica para agregar al carrito
  };

  return (
    <div className="flex items-center p-6 py-5 text-gray-900 bg-white rounded-xl border border-gray-300 hover:border-[#E89440]">
      <div className="w-1/3">
        <img
          src={images[currentImageIndex]}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{nombre}</h2>
          <p className="text-gray-700">ID: {id}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-800">Precio ${precio}</p>
          {/* Propuestas */}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Descripción:</h3>
          <p className="text-gray-600">{descripcion}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-red-900">Requisitos:</h3>
          <p className="text-gray-600">{requisito}</p>
        </div>
        <div className="mb-4">
          <div className="flex justify-center items-center">
            <BsArrowRepeat className="text-4xl text-gray-500" />
          </div>
        </div>
        <div className="flex justify-between items-center"></div>{" "}
      </div>

      <div className="flex flex-col flex-grow gap-5 justify-center mx-4">
        <div className="mb-4">
          <div className="flex justify-center items-center">
            <BsArrowRepeat className="text-4xl text-gray-500" />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            className="flex items-center w-16 h-5 text-sm text-red-600 rounded hover:text-white hover:bg-red-600"
            onClick={() => setShowMenu(true)}
          >
            <RiCloseLine className="mr-1" /> Cerrar
          </button>

          {!Dis && (
            <button className="flex p-2 rounded-lg" onClick={handleClick}>
              <RiCloseLine className="text-xl bg-white hover:text-green-600 text-primary" />
            </button>
          )}
        </div>
      </div>

      <div className="w-1/3">
        <img
          src={images_ADS[currentImageIndex_ADS]}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{nombre_ADS}</h2>
          <p className="text-gray-700">ID: {id_2} </p>
        </div>
        <div className="mb-4">
          <p className="text-gray-800">Precio ${precio_ADS}</p>
          {/* Propuestas */}
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Descripción:</h3>
          <p className="text-gray-600">{descripcion_ADS}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-red-900">Requisitos:</h3>
        </div>
        <div className="mb-4">
          <div className="flex justify-center items-center">
            <BsArrowRepeat className="text-4xl text-gray-500" />
          </div>
        </div>
        <div className="flex justify-between items-center"></div>{" "}
      </div>
    </div>
  );
};

export default Card;
