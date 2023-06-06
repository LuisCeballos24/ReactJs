import { useState } from "react";
import Card from "./Card";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from "../../../utils/firebase.js";

function ProductCatalog_user() {
  const [products, loading, error] = useCollectionData(
    db.collection("productos").where("uid", "==", auth.currentUser.uid)
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
    <div className="grid grid-cols-1 gap-16 p-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <Card
          key={product.id}
          name={product.name}
          img="dish.png"
          description={product.description}
          price={product.price}
          productId={product.id}
          inventory="20"
        />
      ))}
      {/* <div className="p-8 bg-gray-100 rounded-xl"> */}
      {/*   <div className="flex flex-col gap-8 items-center my-20 justify-center p-6 text-left text-center text-gray-600 bg-white rounded-xl border border-grey-300 transition hover:border-[#E89440]"> */}
      {/*     <h2 className="text-xl font-semibold">Agregar Producto</h2> */}
      {/*     <p className="text-gray-600">Descripción del producto</p> */}
      {/*     <div className="flex gap-4 justify-center"> */}
      {/*       <button className="py-2 px-4 text-white bg-blue-500 rounded-md"> */}
      {/*         Agregar al carrito */}
      {/*       </button> */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  );
}

export default ProductCatalog_user;
