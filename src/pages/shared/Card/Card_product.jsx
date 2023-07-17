import React, { useState, useEffect } from "react";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2 } from "../../../utils/firebase.js";
import { AiOutlineClose } from "react-icons/ai";
const ProductCard = (props) => {
  const { producto } = props;
  const { id } = "JeBAAug6eZrEd5cATvHd";
  // const { param1, setparam1 } = props.producto;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [url, seturl] = useState("");
  const images = [url, "../../../../public/Store.svg"]; // Agrega aquí las rutas de las imágenes
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [Status, setStatus] = useState(false);
  const [uid, setuid] = useState("");
  const [estadoHijo, setEstadoHijo] = useState(false);
  const [Ventana, setVentana] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [products] = useCollectionData(
    db2.collection("productos").where("id", "==", producto)
  );
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const handleChangeImage = (index) => {
    setCurrentImageIndex(index);
  };
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

  const Vista = () => {
    const nuevoEstado = !estadoHijo;
    const ven = 1;
    setVentana(ven);
    setEstadoHijo(nuevoEstado);
    props.VistaPrevia(nuevoEstado, ven);
  };
  try {
    console.log(producto);
  } catch (error) {
    console.error(`Error al agregar el producto al carrito: ${error.message}`);
  }
  // Estado para controlar la categoría seleccionada

  // Función para manejar el clic en una categoría

  return (
    <div className="flex overflow-hidden flex-col justify-center py-5 rounded-md shadow-lg md:flex-row card">
      <div className="flex justify-center items-center h-full bg-red-500 rounded-full sm:h-96 lg:h-full">
        <button
          onClick={() => Vista()}
          className="py-2 px-4 mt-4 text-white bg-red-500 rounded rounded-full md:mt-0 md:ml-4"
        >
          <BsFillArrowLeftSquareFill className="ml-2" size={20} />
        </button>
      </div>

      <div className="w-full md:w-1/2">
        <div className="relative">
          <div className="card-image">
            <div className="aspect-w-4 aspect-h-3">
              <img
                src={images[currentImageIndex]}
                alt="Imagen del Producto"
                className="object-cover"
              />
            </div>

            <div className="flex absolute bottom-0 left-0 justify-center py-2 w-full bg-gray-200">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full mx-1 ${index === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  onClick={() => handleChangeImage(index)}
                >
                  <img
                    src={image}
                    alt={`Vista previa ${index}`}
                    className="object-cover w-full h-full rounded-full"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full md:mt-0 md:w-1/2">
        <div className="p-4">
          <div className="card-description-advanced">
            <h2 className="mb-4 text-xl font-bold text-center">
              Descripciones avanzadas de producto
            </h2>
            <nav className="flex flex-wrap gap-2">
              {/* Código de los botones de categoría */}
            </nav>
            <div className="p-4 shadow-lg">
              <div className="card-description">
                <h2 className="mb-2 text-xl font-bold">{nombre}</h2>
                <p className="mb-4 text-gray-600">{descripcion}</p>
                <p className="text-2xl font-bold">{precio}</p>
                <div className="flex gap-3 items-center mt-4">
                  {/* Código de los botones de compra */}
                </div>
                <div className="mt-4">
                  <p className="text-gray-500">Vendedor: John Doe</p>
                  <p className="text-gray-500">Tienda: Mi Tienda</p>
                </div>
              </div>
            </div>
            {/* Código de las secciones de descripción según la categoría */}
          </div>
        </div>
      </div>
      <button
        onClick={() => Vista()}
        className="absolute top-4 right-4 text-gray-500 focus:outline-none"
      >
        <AiOutlineClose size={20} />
      </button>
    </div>
  );
};

export default ProductCard;
