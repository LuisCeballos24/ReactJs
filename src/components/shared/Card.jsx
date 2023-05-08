import React from "react";
import { useState } from "react";
import Card_car from "./Car";
import { RiCloseLine } from "react-icons/ri";
import { BsPlusSquareFill } from "react-icons/bs";
let personas = [];
personas.push({ nombre: "Juan", edad: 25 });
personas.push({ nombre: "María", edad: 30 });
personas.push({ nombre: "Pedro", edad: 20 });

const handleClick = (name) => {
  console.log("------- Agregado -----");
  const id = event.target.id;
  console.log(id);
  return (
    <div className="border-gray-50">
      sds
      <Card_car />
    </div>
  );
};

function mostrarPersonas() {
  for (let i = 0; i < this.personas.length; i++) {
    console.log(`${this.personas[i].nombre} - ${this.personas[i].edad} años`);
  }
}

const Card = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const { name, img, description, price, inventory } = props;
  return (
    <div
      id="Product"
      className="bg-[#1F1D2B] p-8 rounded-xl flex flex-col items-center gap-2 text-center text-gray-300"
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
        id={name}
      >
        <BsPlusSquareFill className="text-green-500" />
      </button>
    </div>
  );
};

export default Card;
