import { useState } from "react";
import Card from "./Card";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2 } from "../../../utils/firebase.js";

function ProductCatalog(props) {
  const [estadoHijo, setEstadoHijo] = useState(false);
  const [Ventana, setVentana] = useState(0);

  const Vista_Previa = (productId) => {
    const nuevoEstado = !estadoHijo;
    const nuevoParam1 = "texto1";
    const nuevoParam2 = "texto2";
    setEstadoHijo(nuevoEstado);
    props.VistaPrevia(nuevoEstado, nuevoParam1, nuevoParam2);
  };

  /*  const currentUser = auth.currentUser; */
  const [products, loading, error] = useCollectionData(
    db2.collection("productos")
    // .where(" uid", "==", auth.currentUser.uid)
  );

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <div className="grid z-10 grid-cols-1 gap-x-2 gap-y-16 p-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <Card
          key={index}
          id={product.id}
          name={product.name}
          img={product.images}
          description={product.description}
          price={product.price}
          productId={product.id}
          inventory={product.cuanty}
          Status={product.Status}
          onClick={() => Vista_Previa(product.id)}
          cursor-pointer
        />
      ))}
    </div>
  );
}

export default ProductCatalog;
