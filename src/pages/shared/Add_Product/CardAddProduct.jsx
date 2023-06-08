import { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth, storage } from "../../../utils/firebase.js";
import { FaExchangeAlt, FaShoppingCart } from "react-icons/fa";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

function CardAddProduct() {
  const [previewImages, setPreviewImages] = useState([]);
  const [user] = useAuthState(auth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

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
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Agregar el producto a Firestore
      const productRef = await db.collection("productos").add({
        id: Date.now(), // Asignar un ID único al producto
        name,
        description,
        price,
        uid: user.uid, // Agregar el UID del usuario autenticado como propietario del producto
      });

      // Subir las imágenes al Storage
      const urls = await Promise.all(
        previewImages.map(async (imageUrl) => {
          try {
            const imageFile = await fetch(imageUrl).then((res) => res.blob());
            const uploadTask = storage
              .ref(`images/${productRef.id}/${imageFile.name}`)
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

      // Actualizar el producto con las URLs de las imágenes
      await productRef.update({ images: urls });

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
  };

  // Función para manejar la carga de imágenes

  // Asegurarse de liberar los recursos de las URLs de las imágenes al desmontar el componente
  useEffect(() => {
    return () => {
      previewImages.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previewImages]);
  const [products, loading, error] = useCollectionData(
    db.collection("productos")
  );

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  const handleProductDelete = async (uid) => {
    try {
      const querySnapshot = await db
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
                onChange={(e) => setName(e.target.value)}
                className="p-2 text-gray-800 rounded-lg border border-gray-300"
              />
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
                onChange={(e) => setName(e.target.value)}
                className="p-2 text-gray-800 rounded-lg border border-gray-300"
              />
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
                onChange={(e) => setName(e.target.value)}
                className="p-2 text-gray-800 rounded-lg border border-gray-300"
              />
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
                onChange={(e) => setName(e.target.value)}
                className="p-2 text-gray-800 rounded-lg border border-gray-300"
              />
              {/* Resto de inputs del formulario */}
            </div>
          </div>
          <div className="flex items-center p-6 text-left text-gray-300 bg-white border-t border-b transition">
            {/* ... Código del formulario ... */}

            <div className="mb-4">
              {/* Resto de inputs del formulario */}{" "}
              <div className="container">
                <div className="p-4 border border-red-500">Contenido 1</div>{" "}
                {/* Área con borde rojo */}
                <div className="p-4">Contenido 2</div>
                <div className="p-4 border-t border-b border-blue-500">
                  Contenido 3
                </div>{" "}
                {/* Área superior e inferior con borde azul */}
                <div className="p-4">Contenido 4</div>
                <div className="p-4 border border-green-500">
                  Contenido 5
                </div>{" "}
                {/* Área con borde verde */}
              </div>
              <div className="flex gap-3 items-center mt-4">
                <div className="flex justify-end mb-2">
                  <button className="p-2 h-14 text-white bg-green-400 rounded-full">
                    <FaShoppingCart size={20} />
                  </button>
                </div>
                <div className="flex justify-end mb-2">
                  <button className="p-2 h-14 text-white bg-yellow-500 rounded-full">
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
                        className={`h-12 w-12 rounded-full ${index === currentImageIndex
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
<div className="flex items-center p-6 text-left text-gray-300 bg-gray-100 rounded-xl border transition border-grey-300">
  {/* ... Código del formulario ... */}
  <div className="mb-4">
    <label htmlFor="name" className="block mb-2 font-bold text-gray-700">
      Nombre:
    </label>
    <input
      type="text"
      id="name"
      name="name"
      onChange={(e) => setName(e.target.value)}
      className="p-2 text-gray-800 rounded-lg border border-gray-300"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="price" className="block mb-2 font-bold text-gray-900">
      Precio:
    </label>
    <input
      onChange={(e) => setPrice(e.target.value)}
      type="number"
      id="price"
      name="price"
      className="p-2 text-gray-800 rounded-lg border border-gray-300"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="quantity" className="block mb-2 font-bold text-gray-900">
      Cantidad:
    </label>
    <input
      type="number"
      id="quantity"
      className="p-2 text-gray-800 rounded-lg border border-gray-300"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="category" className="block mb-2 font-bold text-gray-700">
      Categoría:
    </label>
    <input
      onChange={(e) => setDescription(e.target.value)}
      type="text"
      id="description"
      name="description"
      className="p-2 text-gray-800 rounded-lg border border-gray-300"
    />
  </div>
</div>;
