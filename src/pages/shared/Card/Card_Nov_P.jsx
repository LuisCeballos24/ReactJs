import React from "react";
import { useState } from "react";
import { RiCloseLine, RiExchangeBoxLine } from "react-icons/ri";

import { BsPlusSquareFill, BsCartPlus } from "react-icons/bs";
import { db2 } from "../../../utils/firebase.js";

const Card = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const { name, img, description, price, productId, inventory } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["chair.png", "dish.png", "../../media/img/hero-bg.png"];
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [opcionAbierta, setOpcionAbierta] = useState(null);
  const [opcionAbiertaProducto, setOpcionAbiertaProducto] = useState(null);

  const [opciones, setOpciones] = useState([
    "Opción 1",
    "Opción 2",
    "Opción 3",
  ]);

  const handleClick = async () => {
    console.log("------- Agregado -----");

    /*    const userId = auth.currentUser.uid; */

    try {
      // Verificar si el producto ya está en el carrito
      const querySnapshot = await db2
        .collection("Carrito")
        /*  .where("id_user", "==", userId) */
        .where("id", "==", productId)
        .get();

      if (!querySnapshot.empty) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        const docId = querySnapshot.docs[0].id;
        const docRef = db2.collection("Carrito").doc(docId);
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
    <div className="flex items-center p-6 text-left text-gray-300 bg-gray-200 rounded-xl border transition border-grey-300">
      <div className="w-1/2"></div>
      <div className="relative w-1/2">
        <div className="absolute rounded-bl-2xl transform w-[920px] rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle-2 left-[-640px]"></div>
        <div className="absolute rounded-bl-2xl transform w-[900px] rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle left-[-640px]">
          <div className="p-10 mb-4">
            <h2 className="text-3xl font-bold text-gray-50">
              Bienvenido al Intercambio de Bienes
            </h2>
          </div>
          <p className="p-8 text-gray-100 w-[600px]">
            En nuestro sitio, puedes explorar una amplia variedad de productos y
            servicios disponibles para el intercambio. Descubre nuevas
            oportunidades para intercambiar tus bienes por otros que sean de tu
            interés. ¡Encuentra el objeto perfecto para intercambiar y haz un
            trueque emocionante!
          </p>
        </div>

        <div className="relative w-full h-80">
          <img
            id="Promo"
            src="../../../../public/Business.svg"
            alt=""
            className="object-cover w-full h-full rounded-xl promo-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

//
// <div className="flex absolute justify-end bottom-[-27px] right-[-11px]">
//            {/* Boton de mostrar opciones*/}
//            <button className="flex p-2 rounded-lg" onClick={handleClickChange}>
//              <RiExchangeBoxLine className="text-xl bg-white hover:text-yellow-700 text-primary" />
//            </button>
//            <div
//              id="opciones"
//              className={`${
//                mostrarOpciones ? "" : "hidden"
//              } absolute right-0 py-5 mt-8 w-48 text-gray-800 bg-white rounded shadow-lg`}
//            >
//              {opciones.map((opcion, index) => (
//                <div
//                  key={index}
//                  className={`p-2 hover:border-gray-900 ${
//                    opcionAbierta === index ? "bg-[#286f6c] text-white" : ""
//                  }`}
//                  onClick={() => {
//                    handleAbrirOpcion(index);
//                    handleEliminarOpcion(index);
//                  }}
//                >
//                  {opcion}
//                </div>
//              ))}
//            </div>
//            {/* Resto del código */}
//            <button className="flex p-2 rounded-lg" onClick={handleClick}>
//              <BsCartPlus className="text-xl bg-white hover:text-green-500 text-primary" />
//            </button>
//          </div>
//
