import { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth, storage } from "../../../utils/firebase.js";

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
      //
      const urls = await Promise.all(
        imageUrls.map(async (imageUrl) => {
          const imageFile = await fetch(imageUrl).then((res) => res.blob());
          const uploadTask = storage
            .ref(`images/${productRef.id}/${imageFile.name}`)
            .put(imageFile);
          const snapshot = await uploadTask;
          const url = await snapshot.ref.getDownloadURL();
          return url;
        })
      );

      // Actualizar el producto con las URLs de las imágenes
      await productRef.update({ images: urls });

      // Reiniciar el formulario
      setName("");
      setDescription("");
      setPrice("");
      setImageUrls([]);
      alert("Producto agregado");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
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
    <div className="grid grid-cols-1 gap-x-5 gap-16 p-8 md:grid-cols-2 lg:grid-cols-1 md:gap-[30px]">
      <div className="flex items-center p-6 text-left text-gray-300 bg-gray-100 rounded-xl border transition border-grey-300">
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit}>
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
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block mb-2 font-bold text-gray-900"
              >
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
              <label
                htmlFor="quantity"
                className="block mb-2 font-bold text-gray-900"
              >
                Cantidad:
              </label>
              <input
                type="number"
                id="quantity"
                className="p-2 text-gray-800 rounded-lg border border-gray-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block mb-2 font-bold text-gray-700"
              >
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
            <button
              type="submit"
              className="py-2 px-4 font-bold text-white bg-blue-500 rounded"
            >
              Agregar producto
            </button>
          </form>
        </div>
        <div className="justify-center w-full md:w-1/2">
          <div className="relative left-40 z-20 justify-center border border-gray-600 h-[360px] w-[300px]">
            {previewImages.length > 0 && (
              <img
                src={previewImages[currentImageIndex]}
                alt={`Preview ${currentImageIndex + 1}`}
                className="object-cover w-full h-full rounded"
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center h-full">
            <div className="justify-center mt-4">
              <label className="block mb-2 font-bold text-gray-700">
                Vista previa de imágenes:
              </label>
              <div className="flex flex-wrap gap-2">
                {previewImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="object-cover w-24 h-24 rounded-md"
                  />
                ))}
              </div>
              <div className="flex mt-2">
                {previewImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-4 h-4 mx-1 right-9 rounded-full ${index === currentImageIndex
                        ? "bg-blue-500"
                        : "bg-gray-300"
                      }`}
                    onClick={() => setCurrentImageIndex(index)}
                  ></button>
                ))}
              </div>
            </div>
            <label
              htmlFor="images"
              className="mt-4 mb-2 font-bold text-gray-700"
            >
              Subir imagen:
            </label>
            <input
              type="file"
              id="images"
              className="p-2 rounded-lg border border-gray-300"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardAddProduct;

{
  /* <div className="relative w-1/2"> */
}
{
  /*   <div className="absolute rounded-bl-2xl transform w-[920px] rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle-2 left-[-640px]"></div> */
}
{
  /*   <div className="absolute rounded-bl-2xl transform w-[900px] rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle left-[-640px]"> */
}
{
  /*     <div className="p-10 mb-4"> */
}
{
  /*       <h2 className="text-3xl font-bold text-gray-50"> */
}
{
  /*         Bienvenido al Intercambio de Bienes */
}
{
  /*       </h2> */
}
{
  /*     </div> */
}
{
  /*     <p className="p-8 text-gray-100 w-[600px]"> */
}
{
  /*       En nuestro sitio, puedes explorar una amplia variedad de productos */
}
{
  /*       y servicios disponibles para el intercambio. Descubre nuevas */
}
{
  /*       oportunidades para intercambiar tus bienes por otros que sean de */
}
{
  /*       tu interés. ¡Encuentra el objeto perfecto para intercambiar y haz */
}
{
  /*       un trueque emocionante! */
}
{
  /*     </p> */
}
{
  /*   </div> */
}
{
  /**/
}
{
  /*   <div className="relative w-full h-80"> */
}
{
  /*     <img */
}
{
  /*       id="Promo" */
}
{
  /*       src="../../../../public/Business.svg" */
}
{
  /*       alt="" */
}
{
  /*       className="object-cover w-full h-full rounded-xl promo-image" */
}
{
  /*     /> */
}
{
  /*   </div> */
}
{
  /* </div> */
}
