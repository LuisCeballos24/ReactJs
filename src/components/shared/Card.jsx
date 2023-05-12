import React from "react";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { BsPlusSquareFill } from "react-icons/bs";
import { db2 } from "../../utils/firebase.js";

const Card = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const { name, img, description, price, productId, inventory } = props;

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
  return (
    <div
      id="Product"
      className="flex flex-col gap-2 items-center p-8 text-center text-gray-300 bg-white rounded-xl   border  border-[#E89440]"
    >
      <img
        src={img}
        className="object-cover -mt-20 w-40 h-40 rounded-full shadow-2xl"
      />
      <p className="text-xl">{name}</p>
      <span className="text-gray-400">${price}</span>
      <p className="text-gray-600">{inventory} Bowls available</p>
      <button //className="flex items-center gap-4 text-gray-300 bg-[#1F1D2B] py-2 px-4 rounded-lg"
        className="p-2 rounded-lg border border-green-500"
        onClick={handleClick}
      >
        <BsPlusSquareFill className="text-green-500" />
      </button>
    </div>
  );
};

export default Card;
