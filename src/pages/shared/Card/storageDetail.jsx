import React, { useState } from "react";
import { FiEdit2, FiCheck } from "react-icons/fi";

const StoreDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [storeName, setStoreName] = useState("My Store");
  const [description, setDescription] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra velit at eros efficitur tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam fringilla urna ut purus auctor sollicitudin."
  );
  const [description2, setDescription2] = useState(
    "Sed condimentum ullamcorper justo, vel dapibus nunc porta id. Fusce ultrices rhoncus nisi non mattis. Integer semper tellus et neque efficitur, sit amet interdum neque varius. Donec ultricies dolor dolor, eget pulvinar ex semper non. Curabitur feugiat odio et metus facilisis posuere."
  );
  const [status, setStatus] = useState("Active");

  const handleEditDetails = () => {
    setIsEditing(true);
  };

  const handleUpdateDetails = () => {
    // Aquí puedes implementar la lógica para actualizar los detalles de la tienda en la base de datos
    setIsEditing(false);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center">
        <div className="flex overflow-hidden w-full max-w-xl rounded shadow-lg">
          <img className="w-1/3" src="store-image.jpg" alt="Store" />
          <div className="py-4 px-6">
            {isEditing ? (
              <input
                className="mb-2 text-xl font-bold focus:outline-none"
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            ) : (
              <div className="mb-2 text-xl font-bold">{storeName}</div>
            )}
            {isEditing ? (
              <textarea
                className="mb-4 text-base text-gray-700 resize-none focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <p className="mb-4 text-base text-gray-700">{description}</p>
            )}
            {isEditing ? (
              <textarea
                className="text-base text-gray-700 resize-none focus:outline-none"
                value={description2}
                onChange={(e) => setDescription2(e.target.value)}
              />
            ) : (
              <p className="text-base text-gray-700">{description2}</p>
            )}
          </div>
          <div className="flex flex-col justify-between py-4 px-6">
            {isEditing ? (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="py-2 px-4 mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            ) : (
              <div className="mb-4">
                <span className="inline-block py-1 px-3 mr-2 text-sm font-semibold text-green-800 bg-green-200 rounded-full">
                  {status}
                </span>
                <span className="inline-block py-1 px-3 text-sm font-semibold text-gray-800 bg-gray-200 rounded-full">
                  5 Products
                </span>
              </div>
            )}
            <div className="flex justify-end">
              {isEditing ? (
                <button
                  className="py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onClick={handleUpdateDetails}
                >
                  <FiCheck className="mr-2" />
                  Save
                </button>
              ) : (
                <button
                  className="py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onClick={handleEditDetails}
                >
                  <FiEdit2 className="mr-2" />
                  Edit Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
