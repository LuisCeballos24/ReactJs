import React, { useState } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const CardADD_subasta = (props) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del formulario
    // a través de una API o cualquier otro método de tu elección
    console.log("Formulario enviado");
  };

  return (
    <div className="flex overflow-hidden flex-col justify-center rounded-md shadow-lg md:flex-row card">
      <div className="w-full md:w-1/2">
        <button className="py-2 px-4 mt-4 text-white bg-red-500 rounded md:mt-0 md:ml-4">
          <BsFillArrowLeftSquareFill className="ml-2" size={20} />
        </button>{" "}
        <div className="p-4 shadow-lg">
          <div className="card-description">
            <h2 className="mb-2 text-xl font-bold">Registro de Subasta</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-bold">
                  Nombre del Producto
                </label>
                <input
                  type="text"
                  className="p-2 w-full rounded border border-gray-300"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">
                  Descripción del Producto
                </label>
                <textarea
                  className="p-2 w-full rounded border border-gray-300"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-bold">
                  Precio de partida
                </label>
                <input
                  type="number"
                  className="p-2 w-full rounded border border-gray-300"
                  value={startingPrice}
                  onChange={(e) => setStartingPrice(Number(e.target.value))}
                />
              </div>
              <div className="flex gap-3 items-center mt-4">
                <div className="flex justify-end mb-2">
                  <button
                    type="submit"
                    className="p-2 h-14 text-white bg-green-400 rounded-full"
                  >
                    <FaShoppingCart size={20} />
                  </button>
                </div>
                <div className="flex justify-end mb-2">
                  <button className="p-2 h-14 text-white bg-yellow-500 rounded-full">
                    <FaExchangeAlt size={20} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardADD_subasta;
