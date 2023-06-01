import { useState } from "react";
import Card from "./Card";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../utils/firebase.js";

function ProductCatalog() {
  /*  const currentUser = auth.currentUser; */
  const [products, loading, error] = useCollectionData(
    db.collection("productos")
    // .where(" uid", "==", auth.currentUser.uid)
  );

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-x-2 gap-y-16 p-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <Card
          key={index}
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

export default ProductCatalog;
