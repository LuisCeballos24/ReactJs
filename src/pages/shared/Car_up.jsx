import React from "react";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2 } from "../../utils/firebase.js";

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
      className={`lg:col-span-2 fixed top-0 bg-white lg:w-96 lg:right-0 lg:h-[180px] transition-all z-50 m-4 rounded-lg border border-[#E89440] ${showOrder ? "right-0" : "-right-full"
        }`}
    >
      {/* Orders */}
      <div className="relative p-8 h-full text-gray-300 lg:pt-8 pt-17">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="box-content absolute top-4 left-4 p-3 text-xl text-gray-900 bg-white rounded-full lg:hidden"
        />
        <h1 className="my-4 text-2xl text-gray-900">Orders </h1>
        {/* Pills */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <button className="bg-[#E89440] text-white py-2 px-4 rounded-xl">
            Dine In
          </button>
          <button className="text-[#E89440] py-2 px-4 rounded-xl border border-[#285e7d]">
            To Go
          </button>
          <button className="text-[#E89440] py-2 px-4 rounded-xl border border-[#285e7d]">
            Delivery
          </button>
        </div>
        {/* Car */}

        {/* Submit payment */}
      </div>
    </div>
  );
};

export default Card_up;
