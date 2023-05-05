import React from "react";

const handleClick = () => {
  console.log("------- Agregado -----");
  const id = event.target.id;
  console.log("Se hizo clic en el elemento con el id:", id);
};

const Card = (props) => {
  const { id, img, description, price, inventory } = props;

  return (
    <div
      id="Product"
      className="bg-[#1F1D2B] p-8 rounded-xl flex flex-col items-center gap-2 text-center text-gray-300"
    >
      <img
        src={img}
        className="object-cover -mt-20 w-40 h-40 rounded-full shadow-2xl"
      />
      <p className="text-xl">{description}</p>
      <span className="text-gray-400">${price}</span>
      <p className="text-gray-600">{inventory} Bowls available</p>
      <button //className="flex items-center gap-4 text-gray-300 bg-[#1F1D2B] py-2 px-4 rounded-lg"
        className="bg-[#ec7c6a]  py-2 px-4 rounded-lg"
        onClick={handleClick}
        id={id}
      >
        Agregar
      </button>
    </div>
  );
};

export default Card;
