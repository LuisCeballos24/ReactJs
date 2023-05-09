import React from "react";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2 } from "../../utils/firebase.js";
import { useState, useEffect } from "react";

/* import { Card } from "./Card"; */

// const carritoRef = db2.database().ref("Carrito");

const handleDelete = async (id) => {
  const querySnapshot = await db2.collection("Carrito").get();

  if (!querySnapshot.empty) {
    const docId = querySnapshot.docs[0].id;
    await db2.collection("Carrito").doc(docId).delete();
    console.log(`Producto con uid ${id} eliminado correctamente`);
  } else {
    console.log(`Producto con id ${id} NO eliminado de forma correcta`);
  }
};

const handleMinus = async (id) => {
  const querySnapshot = await db2.collection("Carrito").get();

  if (!querySnapshot.empty) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    const docId = querySnapshot.docs[0].id;
    const docRef = db2.collection("Carrito").doc(docId);
    const docSnapshot = await docRef.get();
    await docRef.update({
      cantidad: docSnapshot.data().cantidad - 1,
    });
    console.log(`Producto con id ${docId} actualizado en el carrito`);
  } else {
    console.log(`Producto con id ${id} NO eliminado de forma correcta`);
  }
};

const handlePlus = async (id) => {
  const querySnapshot = await db2.collection("Carrito").get();

  if (!querySnapshot.empty) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    const docId = querySnapshot.docs[0].id;
    const docRef = db2.collection("Carrito").doc(docId);
    const docSnapshot = await docRef.get();
    await docRef.update({
      cantidad: docSnapshot.data().cantidad + 1,
    });
    console.log(`Producto con id ${docId} actualizado en el carrito`);
  } else {
    console.log(`Producto con id ${id} NO eliminado de forma correcta`);
  }
};
const Card_car = (props) => {
  let sum = 0;
  /*  let listaPersonas = new Personas(personas); */
  const { showOrder, setShowOrder } = props;

  // const currentUser = auth.currentUser;

  const [orders, loading, error] = useCollectionData(db2.collection("Carrito"));
  const [totalPrice, setTotalPrice] = useState(0); // Agregamos el estado del precio total

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>Error al cargar órdenes: {error.message}</p>;
  }

  return (
    <div
      className={`lg:col-span-2 fixed top-0 bg-[#1F1D2B] w-full lg:w-96 lg:right-0 h-full transition-all z-50 ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      {/* Orders */}
      <div className="relative p-8 h-full text-gray-300 lg:pt-8 pt-17">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="lg:hidden absolute left-4 top-4 p-3 box-content text-gray-300 bg-[#262837] rounded-full text-xl"
        />
        <h1 className="my-4 text-2xl">Orders #151416</h1>
        {/* Pills */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <button className="bg-[#ec7c6a] text-white py-2 px-4 rounded-xl">
            Dine In
          </button>
          <button className="text-[#ec7c6a] py-2 px-4 rounded-xl border border-gray-500">
            To Go
          </button>
          <button className="text-[#ec7c6a] py-2 px-4 rounded-xl border border-gray-500">
            Delivery
          </button>
        </div>
        {/* Car */}
        <div>
          <div className="grid grid-cols-6 p-4 mb-4">
            <h5 className="col-span-4">Item</h5>
            <h5>Qty</h5>
            <h5>Price</h5>
          </div>

          {/* Products */}
          <div className="overflow-y-scroll h-[400px] md:h-[700px] lg:h-[540px]">
            {orders.map((order) => {
              const totalPrice = order.precio * order.cantidad;
              sum += totalPrice; // Acumula el precio total
              return (
                <div className="bg-[#262837] p-4 rounded-xl mb-4">
                  <div className="grid grid-cols-6 mb-4">
                    {/* Product description */}
                    <div className="flex col-span-4 gap-3 items-center">
                      <img
                        src="comida.png"
                        className="object-cover w-10 h-10"
                      />
                      <div>
                        <h5 className="text-sm"> {order.nombre}</h5>
                        <p className="text-xs text-gray-500">
                          $ {order.precio}
                        </p>
                      </div>
                    </div>
                    {/* Qty */}
                    <div>
                      <span>{order.cantidad}</span>
                    </div>
                    {/* Price */}
                    <div>
                      <span>$ {order.precio * order.cantidad}</span>
                    </div>
                  </div>
                  {/* Note */}
                  <div className="grid grid-cols-6 items-center">
                    <form className="col-span-4">
                      <input
                        type="text"
                        className="bg-[#1F1D2B] py-2 px-2 rounded-lg outline-none"
                        placeholder="Order note..."
                      />
                    </form>
                    <div className="flex space-x-1">
                      <button
                        className="p-2 rounded-lg border border-red-900 hover:border-red-500"
                        onClick={() => handleDelete(order.id)}
                      >
                        <RiDeleteBin6Line className="text-red-500" />
                      </button>
                      <button
                        className="p-2 rounded-lg border border-red-900 hover:border-red-500"
                        onClick={() => handleMinus(order.id)}
                        // onClick={handleMinus}
                      >
                        <FaMinus className="text-red-500" />
                      </button>
                      <button
                        className="p-2 rounded-lg border border-green-900 hover:border-green-500"
                        onClick={() => handlePlus(order.id)}
                        // onClick={handlePlus}
                      >
                        <HiPlus className="text-green-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Submit payment */}
        <div className="bg-[#262837] absolute w-full bottom-0 left-0 p-4">
          <div className="flex justify-between items-center mb-4">
            {/* <span className="text-gray-400">Discount</span> */}
            {/* <span>$0</span> */}
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-400">Subtotal</span>
            <span id="precio_total">$ {sum} </span>
          </div>
          <div>
            <button className="bg-[#ec7c6a] w-full py-2 px-4 rounded-lg">
              Continue to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card_car;
