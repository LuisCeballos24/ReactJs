import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db2, auth, storage2 } from "../../../utils/firebase.js";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

function CardAddProduct(props) {
  //Control de vista
  const [estadoHijo, setEstadoHijo] = useState(false);
  const [Ventana, setVentana] = useState(0);

  //
  const [previewImages, setPreviewImages] = useState([]);
  const [user] = useAuthState(auth);
  const [currentImageIndex, setCurrentImageIndex] = useState(1);
  // Varibles de el producto
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const [Status, setStatus] = useState(false);
  const [Dispo, setDispo] = useState(true);
  const [DispoI, setDispoI] = useState(false);
  const [price, setPrice] = useState("");
  const [cuanty, setCuanty] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [url, setUrl] = useState("");
  const [currentBid, setCurrentBid] = useState(0);
  const [id_proct, setProduct] = useState("");
  // const [isVertical, setIsVertical] = useState(false);
  //Para cerrar la ventana
  const Vista_Previa = () => {
    console.log("Paso por aqui");
    const nuevoEstado = !estadoHijo;
    const ven = 1;
    setVentana(ven);
    setEstadoHijo(nuevoEstado);
    props.VistaPrevia(nuevoEstado, ven);
  };

  //
  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imageFiles = Array.from(files);

    const readerPromises = imageFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
          resolve(event.target.result);
        };

        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((imageUrls) => {
      setPreviewImages(imageUrls);
      setCurrentImageIndex(0);
      setUrl(imageUrls[0]); // Establecer la URL de la primera imagen como el valor inicial de "url"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProduct(Date.now());
    try {
      // Agregar el producto a Firestore
      const productRef = await db2.collection("productos").add({
        id: id_proct,
        name,
        description,
        price,
        Status,
        Dispo,
        uid: user.uid,
        url, // Agregar la URL al objeto
      });
      // Subir las imágenes al Storage
      const urls = await Promise.all(
        previewImages.map(async (imageUrl) => {
          try {
            const imageFile = await fetch(imageUrl).then((res) => res.blob());
            const uploadTask = storage2
              .ref(`images/${productRef.id}/${productRef.name}`)
              .put(imageFile);
            const snapshot = await uploadTask;
            const url = await snapshot.ref.getDownloadURL();
            return url;
          } catch (error) {
            console.error("Error al subir una imagen:", error);
            throw error;
          }
        })
      );
      if (Status) {
        console.log("Entro al carrito");
        try {
          // Verificar si el producto ya está en el carrito
          const querySnapshot = await db2
            .collection("ordenes")
            .where("id", "==", id_proct)
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
            console.log(
              `Producto con id ${id_proct} actualizado en el carrito`
            );
          } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            const productData = {
              cantidad: 1,
              descripción: description,
              id: id_proct,
              buyerId: auth.currentUser.uid,
              nombre: name,
              precio: price,
              images: url,
              time: "",
              compara: "",
              Diponibilidad: DispoI,
            };
            const docRef = await db2.collection("ordenes").add(productData);
            console.log(`Producto con id ${id_proct} agregado al carrito`);
          }
        } catch (error) {
          console.error(
            `Error al agregar el producto al carrito: ${error.message}`
          );
        }
      }

      // Actualizar el producto con las URLs de las imágenes
      await productRef.update({ images: urls });
      await productRef.update({ images: urls, url: imageUrls });
      // Reiniciar el formulario
      setName("");
      setDescription("");
      setPrice("");
      setPreviewImages([]);
      alert("Producto agregado");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      alert(
        "Ocurrió un error al agregar el producto. Por favor, inténtalo de nuevo."
      );
    }
  };
  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
    setUrl(previewImages[index]);
  };

  // Función para manejar la carga de imágenes

  // Asegurarse de liberar los recursos de las URLs de las imágenes al desmontar el componente
  useEffect(() => {
    return () => {
      previewImages.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImages]);

  useEffect(() => {
    return () => {
      previewImages.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImages]);

  const [products, loading, error] = useCollectionData(
    db2.collection("productos")
  );

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }
  const handleBid = (action) => {
    if (action === "-") {
      setStatus(false);
      console.log(Status);
      setCurrentBid(1);
    } else if (action === "+") {
      setStatus(true);
      console.log(Status);

      setCurrentBid(2);
    }
  };

  const handleProductDelete = async (uid) => {
    try {
      const querySnapshot = await db2
        .collection("productos")
        .where("uid", "==", uid)
        .get();

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;
        await db.collection("productos").doc(docId).delete();
        console.log(`Producto con uid ${uid} eliminado correctamente`);
      }
    } catch (error) {
      console.error(
        `Error al eliminar producto con uid ${uid}: ${error.message}`
      );
    }
  };

  return (
    <div className="flex justify-center p-8 shadow-lg">
      <button
        onClick={() => Vista_Previa()}
        className="py-2 px-4 mt-4 h-14 text-red-500 rounded md:mt-0 md:ml-4 hover:text-white hover:bg-red-500"
      >
        <BsFillArrowLeftSquareFill className="ml-2" size={20} />
      </button>{" "}
      <div className="flex flex-col bg-white rounded-xl border-t border-b">
        <h2 className="p-4 text-2xl font-bold lef-3">Agregar producto</h2>
        <div className="flex flex-col md:flex-row md:mt-0">
          <div className="p-11 text-gray-300 bg-white rounded-xl border-t border-b border-l transition md:mt-0 md:w-1/2 right-46 md:w-1/2text-left">
            {/* ... Código del formulario ... */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-700"
              >
                Nombre:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ingresa el nombre del producto"
                onChange={(e) => setName(e.target.value)}
                className="p-2 text-gray-800 rounded-lg border border-gray-300"
              />
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-700"
              >
                Descripción:
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-2 h-40 text-gray-800 rounded-lg border border-gray-300 resize-none"
                ></textarea>
                <div className="absolute right-0 bottom-0 p-2 text-gray-400 pointer-events-none">
                  {description.length} / 200 caracteres
                </div>
              </div>
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-700"
              >
                Precio:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                className="p-2 text-gray-800 rounded-lg border border-gray-300"
              />
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-700"
              >
                Cantidad:
              </label>
              <input
                type="number"
                id="cuanty"
                name="cuanty"
                onChange={(e) => setCuanty(e.target.value)}
                className="p-2 text-gray-800 rounded-lg border border-gray-300"
              />
              {/* Resto de inputs del formulario */}
            </div>
          </div>
          <div className="flex items-center p-6 text-left text-gray-300 bg-white border-t border-b transition">
            {/* ... Código del formulario ... */}

            <div className="mb-4">
              <div className="flex gap-3 items-center mt-4">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => handleBid("-")}
                    className={` ${
                      !Status ? "bg-green-400 text-white " : " "
                    } p-2 h-14 rounded-full bg-white  text-white  hover:text-white hover:bg-green-400 `}
                  >
                    <FaShoppingCart size={20} />
                  </button>
                </div>
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => handleBid("+")}
                    className={` ${
                      Status ? "bg-yellow-400 text-white " : " "
                    } p-2 h-14  bg-white rounded-full hover:text-white hover:bg-yellow-400 `}
                  >
                    <FaExchangeAlt size={20} />
                  </button>
                </div>
              </div>{" "}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center p-6 text-left text-gray-300 bg-white rounded-xl border-t border-r border-b transition">
            <div className="relative justify-center border border-gray-600 h-[360px] w-[300px]">
              {/* ... Código de la imagen principal ... */}
              <div className="relative left-0 z-20 justify-center border h-[360px] w-[300px]">
                {previewImages.length > 0 && (
                  <img
                    src={previewImages[currentImageIndex]}
                    alt={`Preview ${currentImageIndex + 1}`}
                    className="object-cover w-full h-full rounded"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center items-center h-full">
              <div className="justify-center mt-4">
                {/* ... Código de las imágenes previas ... */}
                <div className="justify-center mt-4">
                  <label className="block mb-2 font-bold text-gray-700">
                    Imágenes previas:
                  </label>
                  <div className="flex justify-center space-x-2">
                    {previewImages.map((image, index) => (
                      <button
                        key={index}
                        className={`h-12 w-12 rounded-full ${
                          index === currentImageIndex
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                        onClick={() => handleImageChange(index)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <label
                htmlFor="images"
                className="mt-4 mb-2 font-bold text-gray-700"
              >
                Subir imagen:
              </label>
              {/* Resto del código del input de imágenes */}
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageUpload}
                multiple
                className="p-2 text-gray-800 rounded-lg"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="py-2 px-4 mt-4 ml-4 text-white bg-blue-500 rounded"
          onClick={handleSubmit}
        >
          Agregar producto
        </button>
      </div>
    </div>
  );
}

export default CardAddProduct;
