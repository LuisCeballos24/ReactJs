import React, {useState} from "react";
import { RiCloseLine, RiDeleteBin6Line } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2, auth } from "../../../utils/firebase.js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function isUserOwner(ownerId) {
  return auth.currentUser && ownerId === auth.currentUser.uid;
}

const handleDelete = async (id) => {
  const querySnapshot = await db2
    .collection("ordenes")
    .where("productId", "==", id)
    .where("buyerId", "==", auth.currentUser.uid)
    .get();

  if (!querySnapshot.empty) {
    const docId = querySnapshot.docs[0].productId;
    await dbw.collection("ordenes").doc(docId).delete();
    console.log(`Producto con uid ${id} eliminado correctamente`);
  } else {
    console.log(`Producto con id ${id} NO eliminado de forma correcta`);
  }
};

const handleMinus = async (id) => {
  const querySnapshot = await db2
    .collection("ordenes")
    .where("id", "==", id)
    .where("buyerId", "==", auth.currentUser.uid)
    .get();

  if (!querySnapshot.empty) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    const docId = querySnapshot.docs[0].productId;
    const docRef = db2.collection("ordenes").doc(docId);
    const docSnapshot = await docRef.get();
    await docRef.update({
      quantity: docSnapshot.data().quantity - 1,
    });
    console.log(`Producto con id ${docId} actualizado en el carrito`);
  } else {
    console.log(`Producto con id ${id} NO eliminado de forma correcta`);
  }
};

const handlePlus = async (id) => {
  const querySnapshot = await db2
    .collection("ordenes")
    .where("id", "==", id)
    .where("buyerId", "==", auth.currentUser.uid)
    .where("Diponibilidad", "==", true)
    .get();

  if (!querySnapshot.empty) {
    // Si el producto ya está en el carrito, actualizar la cantidad
    const docId = querySnapshot.docs[0].productId;
    const docRef = db2.collection("ordenes").doc(docId);
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
  // const images = [img];
  let sum = 0;

  const { showOrder, setShowOrder } = props;
  const currentUser = auth.currentUser;

  const [orders2, loading2, error2] = useCollectionData(
    /**
     * Función handleClick
     * Descripción: Maneja el evento de clic en el botón.
     * @param {object} event - Evento de clic.
     * @returns {void}
     */
    db2
      .collection("ordenes")
      .where("buyerId", "==", currentUser?.uid || "")
      .where("Diponibilidad", "==", true)
  );

  const [orders, loading, error] = useCollectionData(
    /**
     * Función handleClick
     * Descripción: Maneja el evento de clic en el botón.
     * @param {object} event - Evento de clic.
     * @returns {void}
     */
    db2.collection("ordenes").where("buyerId", "==", currentUser?.uid || "")
  );

  if (loading) {
    return <p>Cargando órdenes...</p>;
  }

  if (error) {
    return <p>Error al cargar órdenes: {error.message}</p>;
  }
  {
    /*  lg:col-span-2 fixed top-0 bg-[#1F1D2B] w-full lg:w-96 lg:right-0 h-full transition-all z-50 */
  }
  
  {/*
  
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePaymentCapture = async (data, actions) => {
    const order = await actions.order.capture();
    console.log("Order", order);
    setIsPaymentSuccessful(true);
  };

*/}

  return (
    <div
      className={`lg:col-span-2 fixed top-0 bg-white w-full lg:w-96 lg:right-0 lg:h-[700px] h-full transition-all z-50 my-56  rounded-lg border border-gray-300 ${showOrder ? "right-0" : "-right-full"
        }`}
    >
      {/* Orders */}
      <div className="relative p-8 h-full text-gray-300 lg:pt-8 pt-17">
        <RiCloseLine
          onClick={() => setShowOrder(false)}
          className="box-content absolute top-4 left-4 p-3 text-xl text-gray-900 bg-white rounded-full lg:hidden"
        />
        {/*   <h1 className="my-4 text-2xl text-gray-900">Orders</h1> */}
        {/* Pills */}
        <div className="flex flex-wrap gap-4 items-center mb-8">
          <button className="bg-[#E89440] text-white py-2 px-4 rounded-xl">
            Compras
          </button>
          <button className="text-[#E89440] py-2 px-4 rounded-xl border border-[#285e7d]">
            Intercambio
          </button>
          <button className="text-[#E89440] py-2 px-4 rounded-xl border border-[#285e7d]">
            Subasta
          </button>
        </div>
        {/* Car */}
        <div>
          <div className="grid grid-cols-6 p-4 mb-4">
            <h5 className="col-span-4 text-gray-900">Item</h5>
            <h5 className="text-gray-900">Qty</h5>
            <h5 className="text-gray-900">Price</h5>
          </div>

          {/* Products */}
          <div className="overflow-y-scroll h-[400px] md:h-[700px] lg:h-[340px]">
            {orders.map((order) => {
              const totalPrice = order.precio * order.cantidad;
              sum += totalPrice; // Acumula el precio total
              return (
                <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-gray-300 hover:border-[#E89440]">
                  <div className="grid grid-cols-6 mb-4">
                    {/* Product description */}
                    <div className="flex col-span-4 gap-3 items-center">
                      <img
                        src="comida.png"
                        className="object-cover w-10 h-10"
                        alt=""
                      />
                      <div>
                        <h5 className="text-sm text-gray-900">
                          {order.nombre}
                        </h5>
                        <p className="text-xs text-gray-900">
                          $ {order.precio}
                        </p>
                      </div>
                    </div>
                    {/* Qty */}
                    <div>
                      <span className="text-gray-900">{order.cantidad}</span>
                    </div>
                    {/* Price */}
                    <div>
                      <span className="text-gray-900">
                        $ {order.precio * order.cantidad}
                      </span>
                    </div>
                  </div>
                  {/* Note */}
                  <div className="grid grid-cols-6 items-center">
                    <form className="col-span-4">
                      {/* <input */}
                      {/*   type="text" */}
                      {/*   className="bg-white py-2 px-1 rounded-lg outline-none border border-[#4da7a5]" */}
                      {/*   placeholder="Order note." */}
                      {/* /> */}
                    </form>
                    <div className="flex space-x-1">
                      <button
                        className="p-2 rounded-lg border hover:border-red-500"
                        onClick={() => handleDelete(order.id)}
                      >
                        <RiDeleteBin6Line className="text-red-500" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:border-red-500"
                        onClick={() => handleMinus(order.id)}
                      >
                        <FaMinus className="text-red-500" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:border-green-500"
                        onClick={() => handlePlus(order.id)}
                      >
                        <HiPlus className="text-green-500" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            {orders2.map((order) => {
              const totalPrice = order.precio * order.cantidad;
              sum += totalPrice; // Acumula el precio total
              return (
                <div className="bg-white p-4 rounded-xl mb-4 border border-gray-300 hover:border-[#E89440]">
                  <div className="grid grid-cols-6 mb-4">
                    {/* Product description */}
                    <div className="flex col-span-4 gap-3 items-center">
                      <img
                        src="comida.png"
                        className="object-cover w-10 h-10"
                        alt=""
                      />
                      <div>
                        <h5 className="text-sm text-gray-900">
                          {order.nombre}
                        </h5>
                        <p className="text-xs text-gray-900">
                          $ {order.precio}
                        </p>
                      </div>
                    </div>
                    {/* Qty */}
                    <div>
                      <span className="text-gray-900">{order.cantidad}</span>
                    </div>
                    {/* Price */}
                    <div>
                      <span className="text-gray-900">
                        $ {order.precio * order.cantidad}
                      </span>
                    </div>
                  </div>
                  {/* Note */}
                  <div className="grid grid-cols-6 items-center">
                    <form className="col-span-4">
                      {/* <input */}
                      {/*   type="text" */}
                      {/*   className="bg-white py-2 px-1 rounded-lg outline-none border border-[#4da7a5]" */}
                      {/*   placeholder="Order note." */}
                      {/* /> */}
                    </form>
                    <div className="flex space-x-1">
                      <button
                        className="p-2 rounded-lg border hover:border-red-500"
                        onClick={() => handleDelete(order.id)}
                      >
                        <RiDeleteBin6Line className="text-red-500" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:border-red-500"
                        onClick={() => handleMinus(order.id)}
                      >
                        <FaMinus className="text-red-500" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:border-green-500"
                        onClick={() => handlePlus(order.id)}
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
        <div className="absolute bottom-0 left-0 p-4 w-full bg-white rounded-t-lg">
          <div className="flex justify-between items-center mb-4"></div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-900">Subtotal</span>
            <span id="precio_total" className="font-bold text-gray-900">
              $ {sum.toFixed(2)}
            </span>
          </div>

{/* inicio del script y boton paypal*/}
          <PayPalScriptProvider
          options={{ 
            "client-id": "AcmF1Hwfvtf6HocDkapGRxa02x0IgKFN53JPqvyWDLkNyKWwwO4F9OaF6oA6QUPPutjPORe1qb7CRvWb"
          }} 
          >
          <PayPalButtons
                  createOrder={(data, actions) => {
                  return actions.order.create({
                  purchase_units: [
                  {
                  description:"total a pagar" ,
                  amount: {
                    value: sum.toFixed(2), // Precio del producto
                  },
                  },
                ],
              });
            }}
           onApprove={ async (data, actions) => {
            const order = await actions.order.capture()
            console.log("Order", order)
            setIsPaymentSuccessful(true);
           }}
         />

{/*
        {isPaymentSuccessful && (
        <div className="text-green-500 font-bold text-center mt-4">
          ¡Facturación exitosa!
        </div>)} 
*/}

        </PayPalScriptProvider>
        {/* fin del script y boton paypal*/}

          {/*<button className="bg-[#E89440] text-white w-full py-2 px-4 rounded-lg">
            Continue to payment
        </button>*/}
        </div>
      </div>
    </div>
  );
};

export default Card_car;