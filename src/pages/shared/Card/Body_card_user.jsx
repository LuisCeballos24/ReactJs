import { useState } from "react";
import Card from "./Card";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from "../../../utils/firebase.js";

function ProductCatalog_user() {
  /*  const currentUser = auth.currentUser; */
  const [products, loading, error] = useCollectionData(
    db.collection("productos").where("uid", "==", auth.currentUser.uid)
  );
  // .where(" uid", "==", auth.currentUser.uid)

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
    <div className="grid grid-cols-2 gap-x-5 gap-16 p-8 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px]">
      {products.map((product) => (
        <Card
          name={product.name}
          img="dish.png"
          description={product.description}
          price={product.price}
          productId={product.id}
          inventory="20"
        />
      ))}
    </div>
  );
}

export default ProductCatalog_user;
