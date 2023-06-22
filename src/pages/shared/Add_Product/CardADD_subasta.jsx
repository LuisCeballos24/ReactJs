import React, { useState } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const CardADD_subasta = (props) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState(0);
  const [auctionType, setAuctionType] = useState("");
  const [auctionTime, setAuctionTime] = useState("");
  const [auctionStartDate, setAuctionStartDate] = useState("");
  const [auctionStartTime, setAuctionStartTime] = useState("");
  const [auctionEndDate, setAuctionEndDate] = useState("");
  const [auctionEndTime, setAuctionEndTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del formulario
    // a través de una API o cualquier otro método de tu elección
    console.log("Formulario enviado");
  };

  const handleAuctionTypeChange = (e) => {
    setAuctionType(e.target.value);
    setAuctionTime("");
    setAuctionStartDate("");
    setAuctionStartTime("");
    setAuctionEndDate("");
    setAuctionEndTime("");
  };

  const handleAuctionTimeChange = (e) => {
    setAuctionTime(e.target.value);
    setAuctionEndDate(calculateAuctionEndDate(e.target.value));
    setAuctionEndTime(calculateAuctionEndTime(e.target.value));
  };

  const handleAuctionStartDateChange = (e) => {
    setAuctionStartDate(e.target.value);
    setAuctionEndDate(
      calculateAuctionEndDate(auctionTime, e.target.value, auctionStartTime)
    );
    setAuctionEndTime(
      calculateAuctionEndTime(auctionTime, e.target.value, auctionStartTime)
    );
  };

  const handleAuctionStartTimeChange = (e) => {
    setAuctionStartTime(e.target.value);
    setAuctionEndTime(
      calculateAuctionEndTime(auctionStartTime, auctionTime, auctionStartDate)
    );
  };

  const calculateAuctionEndDate = (time, startDate, startTime) => {
    if (!time || !startDate || !startTime) {
      return "";
    }

    const duration = parseInt(time.split(" ")[0]);
    const unit = time.split(" ")[1];
    let endDate = new Date(startDate);
    let endTime = new Date(startTime);

    if (unit === "horas") {
      endDate.setHours(endDate.getHours() + duration);
    } else if (unit === "minutos") {
      endDate.setMinutes(endDate.getMinutes() + duration);
    } else if (unit === "días") {
      endDate.setDate(endDate.getDate() + duration);
    }

    return endDate.toISOString().split("T")[0];
  };

  const calculateAuctionEndTime = (startTime, selectedTime, startDate) => {
    if (!startTime || !selectedTime || !startDate) return "";

    const start = new Date(`2000-01-01T${startTime}`);
    const endTime = new Date(start);

    if (selectedTime) {
      const duration = parseInt(selectedTime.split(" ")[0], 10);
      const unit = selectedTime.split(" ")[1];

      if (unit === "horas") {
        endTime.setHours(start.getHours() + duration);
      } else if (unit === "minutos") {
        endTime.setMinutes(start.getMinutes() + duration);
      }
    }

    return endTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
              <div className="mb-4">
                <label className="block mb-2 font-bold">Tipo de Subasta</label>
                <select
                  className="p-2 w-full rounded border border-gray-300"
                  value={auctionType}
                  onChange={handleAuctionTypeChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="express">Subasta Express</option>
                  <option value="estandar">Subasta Estándar</option>
                </select>
              </div>
              {auctionType === "express" && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold">
                      Duración de la Subasta
                    </label>
                    <select
                      className="p-2 w-full rounded border border-gray-300"
                      value={auctionTime}
                      onChange={handleAuctionTimeChange}
                    >
                      <option value="">Seleccionar</option>
                      <option value="1 horas">1 hora</option>
                      <option value="2 horas">2 horas</option>
                      <option value="3 horas">3 horas</option>
                      <option value="4 horas">4 horas</option>
                      <option value="15 minutos">15 minutos</option>
                      <option value="30 minutos">30 minutos</option>
                      <option value="45 minutos">45 minutos</option>
                    </select>
                  </div>
                  {auctionTime && (
                    <>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Fecha de inicio de la Subasta
                        </label>
                        <input
                          type="date"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionStartDate}
                          onChange={handleAuctionStartDateChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Hora de inicio de la Subasta
                        </label>
                        <input
                          type="time"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionStartTime}
                          onChange={handleAuctionStartTimeChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Fecha de cierre de la Subasta
                        </label>
                        <input
                          type="text"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionEndDate}
                          readOnly
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Hora de cierre de la Subasta
                        </label>
                        <input
                          type="text"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionEndTime}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              {auctionType === "estandar" && (
                <>
                  <div className="mb-4">
                    <label className="block mb-2 font-bold">
                      Duración de la Subasta
                    </label>
                    <select
                      className="p-2 w-full rounded border border-gray-300"
                      value={auctionTime}
                      onChange={handleAuctionTimeChange}
                    >
                      <option value="">Seleccionar</option>
                      <option value="1 días">1 día</option>
                      <option value="2 días">2 días</option>
                      <option value="3 días">3 días</option>
                      <option value="4 días">4 días</option>
                      <option value="5 días">5 días</option>
                      <option value="6 días">6 días</option>
                      <option value="7 días">7 días</option>
                    </select>
                  </div>
                  {auctionTime && (
                    <>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Fecha de inicio de la Subasta
                        </label>
                        <input
                          type="date"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionStartDate}
                          onChange={handleAuctionStartDateChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Hora de inicio de la Subasta
                        </label>
                        <input
                          type="time"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionStartTime}
                          onChange={handleAuctionStartTimeChange}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Fecha de cierre de la Subasta
                        </label>
                        <input
                          type="text"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionEndDate}
                          readOnly
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2 font-bold">
                          Hora de cierre de la Subasta
                        </label>
                        <input
                          type="text"
                          className="p-2 w-full rounded border border-gray-300"
                          value={auctionEndTime}
                          readOnly
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Crear Subasta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-8">
        <div className="text-center">
          <h2 className="mb-4 text-xl font-bold">
            Visualización previa de la Subasta
          </h2>
          {productName && <h3 className="mb-2">{productName}</h3>}
          {productDescription && <p className="mb-4">{productDescription}</p>}
          {startingPrice && (
            <p className="mb-4">Precio de partida: ${startingPrice}</p>
          )}
          {auctionType && (
            <p className="mb-4">
              Tipo de subasta:{" "}
              {auctionType === "express"
                ? "Subasta Express"
                : "Subasta Estándar"}
            </p>
          )}
          {auctionTime && (
            <p className="mb-4">Duración de la subasta: {auctionTime}</p>
          )}
          {auctionStartDate && (
            <p className="mb-4">Fecha de inicio: {auctionStartDate}</p>
          )}
          {auctionStartTime && (
            <p className="mb-4">Hora de inicio: {auctionStartTime}</p>
          )}
          {auctionEndDate && (
            <p className="mb-4">Fecha de cierre: {auctionEndDate}</p>
          )}
          {auctionEndTime && (
            <p className="mb-4">Hora de cierre: {auctionEndTime}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardADD_subasta;
