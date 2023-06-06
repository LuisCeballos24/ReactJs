import React from "react";
import { useState, useEffect } from "react";
import { RiCloseLine, RiExchangeBoxLine } from "react-icons/ri";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { BsPlusSquareFill, BsCartPlus } from "react-icons/bs";
import { db, auth } from "../../../utils/firebase.js";

const Card = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const { name, img, description, price, productId, inventory } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["chair.png", "dish.png", "../../media/img/hero-bg.png"];
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [opcionAbierta, setOpcionAbierta] = useState(null);
  const [opcionAbiertaProducto, setOpcionAbiertaProducto] = useState(null);

  const [products, loading, error] = useCollectionData(
    db.collection("productos").where("uid", "==", auth.currentUser.uid)
  );
  const [opciones, setOpciones] = useState([
    "Opción 1",
    "Opción 2",
    "Opción 3",
  ]);

  useEffect(() => {
    if (products) {
      const opciones = products.map((producto) => producto.name);
      setOpciones(opciones);
    }
  }, [products]);

  const handleClick = async () => {
    console.log("------- Agregado -----");

    /*    const userId = auth.currentUser.uid; */

    try {
      // Verificar si el producto ya está en el carrito
      const querySnapshot = await db
        .collection("Carrito")
        /*  .where("id_user", "==", userId) */
        .where("id", "==", productId)
        .get();

      if (!querySnapshot.empty) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        const docId = querySnapshot.docs[0].id;
        const docRef = db.collection("Carrito").doc(docId);
        const docSnapshot = await docRef.get();
        await docRef.update({
          cantidad: docSnapshot.data().cantidad + 1,
        });
        console.log(`Producto con id ${productId} actualizado en el carrito`);
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        const productData = {
          cantidad: 1,
          descripción: description,
          id: productId,
          id_user: 1,
          nombre: name,
          precio: price,
          time: "",
        };
        const docRef = await db2.collection("Carrito").add(productData);
        console.log(`Producto con id ${productId} agregado al carrito`);
      }
    } catch (error) {
      console.error(
        `Error al agregar el producto al carrito: ${error.message}`
      );
    }
    console.log(price);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    console.log(index);
  };

  const handleClickChange = () => {
    setMostrarOpciones(!mostrarOpciones);
  };

  const handleAbrirOpcion = (index) => {
    if (opcionAbierta === index) {
      setOpcionAbierta(null); // Si la opción ya está abierta, se cierra
    } else {
      setOpcionAbierta(index); // Si es una nueva opción, se abre
    }
  };
  const handleEliminarOpcion = (index) => {
    const nuevasOpciones = opciones.filter((_, i) => i !== index); // Filtra las opciones para eliminar la opción correspondiente al índice
    setOpciones(nuevasOpciones);
  };
  return (
    <div
      id="Card"
      className="shadow-xl flex flex-col items-center p-6 text-left text-gray-900 bg-white rounded-xl border border-gray-300 transition hover:border-[#E89440]"
      style={{ overflow: "hidden" }}
    >
      <div className="overflow-hidden relative mb-4 w-72 h-72">
        <img
          src={images[currentImageIndex]}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <ul className="flex justify-center mb-4">
        {images.map((image, index) => (
          <li
            key={index}
            className={`w-2 h-2 rounded-full bg-gray-100 cursor-pointer mx-1 transition hover:bg-gray-600 ${index === currentImageIndex ? "bg-gray-600" : ""
              }`}
            onClick={() => handleImageClick(index)}
          ></li>
        ))}
      </ul>
      <div className="flex justify-between items-center w-full">
        <button className="flex p-2 rounded-lg" onClick={handleClickChange}>
          <RiExchangeBoxLine className="text-xl bg-white hover:text-yellow-700 text-primary" />
        </button>

        <button className="flex p-2 rounded-lg" onClick={handleClick}>
          <BsCartPlus className="text-xl bg-white hover:text-green-500 text-primary" />
        </button>
      </div>
      <div className="mt-2">
        <p className="text-xl font-semibold text-gray-900">{name}</p>
        <p className="text-gray-600">${price}</p>
        <p className="text-gray-600">{inventory} available</p>
      </div>
    </div>
  );
};

export default Card;
