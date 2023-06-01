import { useState } from "react";
import Card from "./Card";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, auth } from "../../../utils/firebase.js";

function ProductCatalog_user() {
  /*  const currentUser = auth.currentUser; */
  const [products, loading, error] = useCollectionData(
    db.collection("productos")
  );
  // .where("uid", "==", auth.currentUser.uid)

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
      {/* <Card */}
      {/*   name={"Agregar"} */}
      {/*   img="dish.png" */}
      {/*   description={"Agregar Producto"} */}
      {/*   price0={"55"} */}
      {/*   productId={"5"} */}
      {/*   inventory="20" */}
      {/* /> */}
      <div className="grid grid-cols-2 gap-x-5 gap-16 p-8 bg-red-50 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px]">
        <div
          id="Product"
          className="flex flex-col gap-2 items-center p-6 text-left text-center text-gray-300 bg-white rounded-xl border border-grey-300 transition hover:border-[#E89440]"
        >
          <div className="flex relative justify-center items-center w-full h-full rounded-[18px] mb-[15px]">
            <div className="relative w-full h-full">
              <img
                alt=""
                className="object-cover absolute inset-0 w-72 h-72 rounded-xl"
              />
            </div>

            <ul className="flex absolute bottom-0 justify-center w-full"></ul>
            <div className="flex absolute justify-end bottom-[-27px] right-[-11px]">
              {/* Boton de mostrar opciones*/}
              <button className="flex p-2 rounded-lg"></button>

              {/* Resto del código */}
              <button className="flex p-2 rounded-lg"></button>
            </div>
          </div>
        </div>
      </div>

      <div />
    </div>
  );
}

export default ProductCatalog_user;
