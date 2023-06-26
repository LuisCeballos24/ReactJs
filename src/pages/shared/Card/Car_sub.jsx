import React from "react";
import { useState, useEffect } from "react";
import { RiCloseLine, RiExchangeBoxLine } from "react-icons/ri";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { BsPlusSquareFill, BsCartPlus } from "react-icons/bs";
import { db2, auth, storage } from "../../../utils/firebase.js";

const Card = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const {
    key,
    id,
    name,
    img,
    description,
    price,
    productId,
    inventory,
    Status,
  } = props;
  const VistaPrevia = (index) => {
    setCurrentImageIndex(index);
    console.log(index);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [opcionAbierta, setOpcionAbierta] = useState(null);
  const [opcionAbiertaProducto, setOpcionAbiertaProducto] = useState(null);
  const images = [img];

  const [products, loading, error] = useCollectionData(
    db2.collection("productos").where("uid", "==", auth.currentUser.uid)
  );
  const [opciones, setOpciones] = useState([""]);

  useEffect(() => {
    if (products) {
      const opciones = products.map((producto) => ({
        name: producto.name,
        imageUrl: producto.images,
        idproducto: producto.id, // Reemplaza "producto.imageUrl" con la propiedad que contiene la URL de la imagen en el objeto del producto
      }));
      setOpciones(opciones);
    }
  }, [products]);

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const getImagesFromStorage = async () => {
      try {
        const storageRef = storage.ref(); // Obtener la referencia a la raíz del Storage

        const urls = await Promise.all(
          images.map(async (imageName) => {
            const imageUrl = await storageRef.child(imageName).getDownloadURL();
            return imageUrl;
          })
        );

        setImageUrls(urls);
      } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        // Maneja el error de alguna manera apropiada
      }
    };

    getImagesFromStorage();
  }, []);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const imagePromises = images.map(async (imageName) => {
          // Obtener la referencia al archivo en Firebase Storage
          const imageRef = storage.ref(imageName);

          // Obtener la URL de descarga del archivo
          const url = await imageRef.getDownloadURL();

          return url;
        });

        // Esperar a que todas las promesas se resuelvan y obtener las URLs de las imágenes
        const urls = await Promise.all(imagePromises);

        // Establecer las URLs de las imágenes en el estado
        setImageUrls(urls);
      } catch (error) {
        console.error("Error al obtener las URLs de las imágenes:", error);
      }
    };

    fetchImageUrls();
  }, []);

  const handleClick = async () => {
    try {
      // Verificar si el producto ya está en el carrito
      const querySnapshot = await db2
        .collection("ordenes")
        .where("id", "==", productId)
        .where("buyerId", "==", auth.currentUser.uid)
        .get();

      if (!querySnapshot.empty) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        const docId = querySnapshot.docs[0].id;
        const docRef = db2.collection("ordenes").doc(docId);
        const docSnapshot = await docRef.get();
        await docRef.update({
          cantidad: docSnapshot.data().cantidad + 1,
        });
        console.log(`Producto con id ${productId} actualizado en el carrito`);
      } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        const productData = {
          cantidad: 1,
          descripción: description,
          id: productId,
          buyerId: auth.currentUser.uid,
          nombre: name,
          precio: price,
          images: img,
          time: "",
        };
        const docRef = await db2.collection("ordenes").add(productData);
        console.log(`Producto con id ${productId} agregado al carrito`);
      }
    } catch (error) {
      console.error(
        `Error al agregar el producto al carrito: ${error.message}`
      );
    }
    console.log(price);
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    console.log(index);
  };

  const Vista = (index) => {
    console.log(index);
    props.Vistap(true, 5, index);
  };

  const handleClickChange = () => {
    console.log(mostrarOpciones);
    setMostrarOpciones(!mostrarOpciones);
  };

  const handleAbrirOpcion = (index) => {
    if (opcionAbierta === index) {
      setOpcionAbierta(null); // Si la opción ya está abierta, se cierra
    } else {
      setOpcionAbierta(index); // Si es una nueva opción, se abre
    }
  };

  const handleEliminarOpcion = async (index, idProduct, idPro) => {
    const nuevasOpciones = opciones.filter((_, i) => i !== index);
    setOpciones(nuevasOpciones);
    setMostrarOpciones(!mostrarOpciones);
    console.log(idProduct);

    try {
      const querySnapshot = await db2
        .collection("ordenes")
        .where("id", "==", idProduct)

        .get();

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const docRef = db2.collection("ordenes").doc(docId);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
          await docRef.update({
            Diponibilidad: true,
          });

          const ordenData = docSnapshot.data();
          const compareArray = ordenData.compara || [];
          compareArray.push(idPro);

          await docRef.update({
            Compara: compareArray,
          });

          console.log("Orden actualizada con éxito");
        } else {
          console.log("La orden no existe");
        }
      } else {
        console.log("La orden no existe");
      }
    } catch (error) {
      console.log("Error al actualizar la orden:", error);
    }
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleMouseEnter = () => {
    setShowFullDescription(true);
  };

  const handleMouseLeave = () => {
    setShowFullDescription(false);
  };
  return (
    <div
      className="shadow-xl flex flex-col sm:flex-row items-start p-6 py-5 text-left text-gray-900 bg-white rounded-xl border border-gray-300 transition hover:border-[#E89440]"
      style={{ overflow: "hidden" }}
    >
      <div className="mr-6 w-72 h-72 bg-blue-200">
        <img
          src={images[currentImageIndex]}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
        <div className="flex justify-center mt-2">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full bg-gray-300 cursor-pointer mx-1 transition ${
                index === currentImageIndex ? "bg-gray-600" : ""
              }`}
              onClick={() => handleImageClick(index)}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
          <p className="text-gray-700">ID: {props.productId}</p>
          <p className="text-gray-700">Fecha de cierre: 2/25/2023</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-800">Precio inicial: ${price}</p>
          <p className="text-gray-800">{props.status} 8 Propuestas</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Descripción:</h3>
          <p
            className="text-gray-600"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {showFullDescription
              ? description
              : `${description.slice(0, 100)}...`}
          </p>
        </div>

        <div className="mb-4">
          <div className="overflow-hidden relative w-full h-2 bg-gray-300 rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4 w-full">
          {Status && (
            <button className="flex p-2 rounded-lg" onClick={handleClickChange}>
              <RiExchangeBoxLine className="text-xl text-yellow-700 bg-white hover:text-yellow-600 text-primary" />
            </button>
          )}

          <div
            id="opciones"
            className={`${
              mostrarOpciones ? "" : "hidden"
            } inset-0 fixed py-5 mt-4 border shadow-black w-52 cursor-pointer text-gray-800 bg-white rounded shadow-lg z-50`}
            style={{ overflow: "hidden" }}
          >
            <div className="flex items-center px-2">
              <button
                className="flex items-center mb-2 w-16 h-5 text-sm text-red-600 rounded hover:text-white hover:bg-red-600"
                onClick={() => setMostrarOpciones(false)}
              >
                <RiCloseLine className="mr-1" /> Cerrar
              </button>
            </div>
            {opciones.map((opcion, index) => (
              <div
                key={index}
                className={`p-2 hover:border-gray-900 ${
                  opcionAbierta === index
                    ? "hover:bg-[#285e7d] hover:text-white text-black"
                    : " hover:bg-[#285e7d] hover:text-white text-black"
                }`}
                onClick={() => {
                  handleAbrirOpcion(index);
                  handleEliminarOpcion(
                    index,
                    props.productId,
                    opcion.idproducto
                  );
                }}
              >
                {index} &nbsp;
                <img
                  src={opcion.imageUrl}
                  alt=""
                  className="inline w-4 h-4"
                />{" "}
                {opcion.name}
              </div>
            ))}
          </div>

          {!Status && (
            <button className="flex p-2 rounded-lg" onClick={handleClick}>
              <BsCartPlus className="text-xl bg-white hover:text-green-600 text-primary" />
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <button className="py-2 px-4 text-white bg-blue-500 rounded-lg">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
