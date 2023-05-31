import { useState } from "react";
import Card_P from "./Card_Nov_P";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from "../../../utils/firebase.js";

function isUserOwner(ownerId) {
  return auth.currentUser && ownerId === auth.currentUser.uid;
}

function ProductItem(props) {
  const handleDeleteClick = () => {
    console.log("uid:", props.ownerId);
    props.onDelete(props.ownerId);
  };

  // Define una variable booleana para determinar si el usuario actual es el propietario del producto
  const isOwner = isUserOwner(props.ownerId);

  return (
    <div className="product-item" key={props.key}>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <p>Precio: ${props.price}</p>
      {isOwner && (
        <button onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      )}
    </div>
  );
}

function Card_Nov() {
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
    <div className="grid grid-cols-2 gap-x-5 gap-16 p-8 md:grid-cols-3 lg:grid-cols-1 lg:gap-[30px]">
      <Card_P
      // name={product.name}
      // img="dish.png"
      // description={product.description}
      // price={product.price}
      // productId={product.id}
      // inventory="20"
      />
    </div>
  );
}

export default Card_Nov;
//
// <div className="grid grid-cols-2 gap-x-5 gap-16 p-8 md:grid-cols-3 lg:grid-cols-1 lg:gap-[30px]">
//   {products.map((product) => (
//     <Card_P
//     // name={product.name}
//     // img="dish.png"
//     // description={product.description}
//     // price={product.price}
//     // productId={product.id}
//     // inventory="20"
//     />
//   ))}
// </div>;
