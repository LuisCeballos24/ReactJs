import React from "react";
import {
  RiCloseLine,
  RiDeleteBin6Line,
  RiArrowDownSLine,
} from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2 } from "../../../utils/firebase.js";

const handleDelete = async (id) => {
  const querySnapshot = await db2
    .collection("Carrito")
    .where("id", "==", id)
    .get();

  if (!querySnapshot.empty) {
    const docId = querySnapshot.docs[0].id;
    await db2.collection("Carrito").doc(docId).delete();
    console.log(`Producto con uid ${id} eliminado correctamente`);
  } else {
    console.log(`Producto con id ${id} NO eliminado de forma correcta`);
  }
};

const handleMinus = async (id) => {
  const querySnapshot = await db2
    .collection("Carrito")
    .where("id", "==", id)
    .get();

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
  const querySnapshot = await db2
    .collection("Carrito")
    .where("id", "==", id)
    .get();

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
const Card_up = (props) => {
  let sum = 0;

  const { showOrder, setShowOrder } = props;

  const [orders, loading, error] = useCollectionData(db2.collection("Carrito"));

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>Error al cargar órdenes: {error.message}</p>;
  }

  return (
    <div
      className={`lg:col-span-2 fixed top-0 bg-white lg:w-96 lg:right-0 lg:h-[180px] transition-all z-50 m-4 rounded-lg border border-gray-300 ${
        showOrder ? "right-0" : "-right-full"
      }`}
    >
      {/* Orders */}
      <div className="relative p-4 pt-12 h-full text-gray-300 lg:pt-8">
        <div className="flex justify-end items-center">
          <div className="flex gap-2 items-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/fb-api-4000.appspot.com/o/WhatsApp%20Image%202023-03-30%20at%209.04.37%20PM.png?alt=media&token=53f22c1f-0a62-4daf-aa15-a94b19e65f87"
              alt="profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h1 className="text-lg font-medium text-gray-900">John Doe</h1>
              <p className="mb-1 text-sm text-gray-500">Status: Active</p>
            </div>
          </div>
          <button className="p-2 bg-gray-100 rounded-full">
            {/* <AiOutlineDown /> */}
          </button>
          <RiCloseLine
            onClick={() => setShowOrder(false)}
            className="box-content p-3 text-xl text-gray-900 bg-white rounded-full lg:hidden"
          />
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-2 justify-end items-center py-7 mb-4">
          <button className="bg-[#E89440] text-white py-2 px-4 rounded-md text-base">
            Tienda
          </button>
          <button className="text-[#E89440] py-2 px-4 rounded-md text-base border border-[#285e7d]">
            Carrito
          </button>
          <button className="text-[#E89440] py-2 px-4 rounded-md text-base border border-[#285e7d]">
            To
          </button>
        </div>
        {/* Car */}

        {/* Submit payment */}
      </div>
    </div>
  );
};

export default Card_up;
