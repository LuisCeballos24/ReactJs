import React from "react";
import {
  RiCloseLine,
  RiDeleteBin6Line,
  RiArrowDownSLine,
} from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { FaMinus } from "react-icons/fa";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../utils/firebase.js";

const Card_V = (props) => {
  const [products] = useCollectionData(
    db.collection("productos").where("id", "==", props.tittle)
  );

  useEffect(() => {
    if (products && products.length > 0) {
      const product = products[0]; // Suponiendo que solo hay un producto con ese ID
      setNombre(product.name);
      setDescripcion(product.description);
      setPrecio(product.price);
      seturl(product.images);
      setStatus(product.Status);
      setuid(product.uid);
      // Asigna los demás valores a las variables correspondientes
    }
  }, [products]);
  return (
    <div key={index} className="p-4 bg-white shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src={item.image}
          alt="Imagen promocional"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h4 className="text-lg font-bold bg-grey">{item.title}</h4>
        </div>
        <div className="flex-grow" />
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleFavorite(index)}
            className="text-gray-500"
          >
            <AiFillStar size={24} />
          </button>
          <button
            onClick={() => handleSelectItem(index)}
            className="text-gray-500"
          >
            {isExpanded[index] ? <FaTimes /> : <FaCheck />}
          </button>
        </div>
      </div>
      {isExpanded[index] && (
        <div className="flex flex-col p-4 mt-4 bg-gray-100 rounded-lg shadow-inner">
          <div className="flex items-center">
            <img src={item.cvImage} alt="Imagen CV" className="w-56 h-56" />
            <div className="flex p-6 ml-6 bg-white rounded-lg shadow-lg">
              <div>
                <p className="mb-4 text-gray-600">
                  User since <span className="font-bold">2019</span>
                </p>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                  mauris lorem, efficitur eget cursus a, semper ac mi.
                </p>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Email: johndoe@example.com
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: New York, USA
                  </p>
                  <p className="text-sm text-gray-500">
                    Website: www.johndoe.com
                  </p>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleToggle(index)}
          className="flex items-center text-sm text-gray-500"
        >
          {isExpanded[index] ? (
            <>
              <span>Ocultar detalles</span>
              <FaAngleUp className="ml-1" />
            </>
          ) : (
            <>
              <span>Mostrar detalles</span>
              <FaAngleDown className="ml-1" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Card_V;
