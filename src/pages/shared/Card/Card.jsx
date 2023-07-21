import React from "react";
import { useState, useEffect } from "react";
import { RiCloseLine, RiExchangeBoxLine } from "react-icons/ri";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { BsTrash, BsPencil, BsCartPlus } from "react-icons/bs";
import { db2, auth, storage } from "../../../utils/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

const Card = (props) => {
  const [user] = useAuthState(auth);
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
    Status,
    inventory,
  } = props;
  const VistaPrevia = (index) => {
    setCurrentImageIndex(index);
    console.log(index);
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [Status_504, setStatus_504] = useState(true);
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [opcionAbierta, setOpcionAbierta] = useState(null);
  const [opcionAbiertaProducto, setOpcionAbiertaProducto] = useState(null);
  const images = [img];

  const [products, loading, error] = useCollectionData(
    db2
      .collection("productos")
      .where("uid", "==", user.uid)
      .where("Status", "==", false)
  );
  const [opciones, setOpciones] = useState([""]);

  useEffect(() => {
    compareUID();
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
        console.error("Error al obtener las imágenes:");
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
        console.error("Error al obtener las URLs de las imágenes:");
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
        .where("buyerId", "==", user.uid)
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
  const compareUID = () => {
    if (props.productUID === user.uid) {
      setStatus_504(false);
    } else {
      setStatus_504(true);
      console.log("La condición es falsa");
    }
  };

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    console.log(index);
  };

  const Vista = (index) => {
    console.log(index);
    props.Vistap(true, 3, index);
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
    console.log(idPro);

    try {
      const querySnapshot = await db2
        .collection("Carritos_match")
        .where("id", "==", idProduct)

        .get();

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        const docRef = db2.collection("Carritos_match").doc(docId);
        const docSnapshot = await docRef.get();

        if (docSnapshot.exists) {
          await docRef.update({
            Diponibilidad: false,
          });

          // const ordenData = docSnapshot.data();
          // const compareArray = ordenData.compara || [];
          // compareArray.push(auth.currentUser.uid);
          //
          // await docRef.update({
          //   Compara: compareArray,
          // });
          await docRef.update({
            Compara: auth.currentUser.uid,
          });

          // const ordenData2 = docSnapshot.data();
          // const compareArray2 = ordenData2.compara_obj || [];
          // compareArray2.push(idPro);
          //
          // await docRef.update({
          //   Compara_obj: compareArray2,
          // });

          await docRef.update({
            Compara_obj: idPro,
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

  return (
    <div
      id={key}
      className="shadow-xl flex flex-col items-center p-6 text-left text-gray-900 bg-white rounded-xl border border-gray-300 transition hover:border-[#E89440]"
      style={{ overflow: "hidden" }}
    >
      <div className="overflow-hidden relative mb-4 w-72 h-72">
        <img
          onClick={() => {
            Vista(props.productId);
          }}
          cursor-pointer
          src={images[currentImageIndex]}
          alt=""
          className="object-cover w-full h-full rounded-xl"
        />
      </div>
      <ul className="flex justify-center mb-4">
        {images.map((image, index) => (
          <li
            key={index}
            className={`w-3 h-2 rounded-full bg-gray-300 cursor-pointer mx-1 transition hover:bg-gray-600 ${
              index === currentImageIndex ? "bg-gray-600" : ""
            }`}
            onClick={() => handleImageClick(index)}
          ></li>
        ))}
      </ul>
      <div className="flex justify-between items-center w-full">
        {!Status && Status_504 && (
          <button
            className="flex p-2 rounded-lg"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsCartPlus
              onClick={handleClick}
              className={`text-xl bg-white hover:text-green-600 text-primary`}
            />
          </button>
        )}
        {!Status_504 && (
          <button
            className="flex p-2 rounded-lg"
            onClick={() => {
              handleEliminarOpcion(
                props.productId,
                props.productId,
                props.productId
              );
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsTrash
              className={`text-xl bg-white hover:text-green-600 text-primary`}
            />
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
                  ? "hover:bg-[#285e7d] hover:text-white text-black "
                  : " hover:bg-[#285e7d] hover:text-white text-black "
              }`}
              onClick={() => {
                handleAbrirOpcion(index);
                handleEliminarOpcion(index, props.productId, opcion.idproducto);
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
        {Status && Status_504 && (
          <div>
            <button
              className="flex p-2 rounded-lg"
              onClick={handleClickChange}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiExchangeBoxLine
                className={`text-xl bg-white hover:text-yellow-600 text-primary`}
              />
            </button>
          </div>
        )}
        {!Status_504 && (
          <button
            className="flex p-2 rounded-lg"
            onClick={() => {
              handleEliminarOpcion(
                props.productId,
                props.productId,
                props.productId
              );
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BsTrash
              className={`text-xl bg-white hover:text-green-600 text-primary`}
            />
          </button>
        )}
      </div>
      <h3 className="mb-2 text-lg font-bold">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="mt-2 font-bold text-primary">{`$ ${price}`}</p>
    </div>
  );
};

export default Card;
