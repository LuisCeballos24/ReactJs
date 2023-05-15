import React from "react";
import { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { BsPlusSquareFill, BsCartPlus } from "react-icons/bs";
import { db2 } from "../../utils/firebase.js";

const Card = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const { name, img, description, price, productId, inventory } = props;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["chair.png", "dish.png", "../../media/img/hero-bg.png"];

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
  return (
    <div>
      <div
        id="Product"
        className="flex flex-col gap-2 items-center p-6 text-left text-center text-gray-300 bg-white rounded-xl border border-grey-300 transition hover:border-[#E89440]"
      >
        <div className="flex relative justify-center items-center w-full h-full rounded-[18px] max-w-[285px] max-h-[298px] mb-[15px]">
          <div className="relative w-72 h-72 mb-[20px]">
            <img
              src={images[currentImageIndex]}
              alt=""
              class="object-cover absolute inset-0 w-72 h-72 rounded-xl"
            />
          </div>

          <ul className="flex absolute bottom-0 justify-center w-full">
            {images.map((image, index) => (
              <li
                key={index}
                className={`w-2 h-2  rounded-full bg-gray-100 cursor-pointer mx-1 transition hover:bg-gray-600 ${
                  index === currentImageIndex ? "bg-gray-600" : ""
                }`}
                onClick={() => handleImageClick(index)}
              ></li>
            ))}
          </ul>
          <div className="flex absolute justify-end bottom-[-27px] right-[-11px]">
            <button //className="flex items-center gap-4 text-gray-300 bg-[#1F1D2B] py-2 px-4 rounded-lg"
              className="flex p-2 rounded-lg"
              onClick={handleClick}
            >
              <BsCartPlus className="text-xl bg-white hover:text-green-500 text-primary" />
            </button>
          </div>
        </div>
      </div>
      <div class="ml-4">
        <p className="text-xl font-semibold text-gray-900 lg:text-xl">{name}</p>
        <span className="text-gray-600">${price}</span>
        <p className="text-gray-600">{inventory} Bowls available</p>
      </div>
    </div>
  );
};

export default Card;
