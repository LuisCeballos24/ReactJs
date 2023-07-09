import { useState } from "react";
import Card from "./Card";
import Card_sub from "./Car_sub";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2 } from "../../../utils/firebase.js";

function ProductCatalog(props) {
  const [estadoHijo, setEstadoHijo] = useState(false);
  const [Ventana, setVentana] = useState(0);

  const Vista_Previa = (productId) => {
    const nuevoEstado = !estadoHijo;
    const nuevoParam1 = productId;
    const nuevoParam2 = productId;
    const ven = 3;
    setVentana(ven);

    setEstadoHijo(nuevoEstado);
    props.VistaPrevia(nuevoEstado, ven, nuevoParam1, nuevoParam2);
  };

  const [vista, setVista_A] = useState(false);
  const [vista_A, setVista_B] = useState(2);
  const [param1, setParam1] = useState("default1");
  const [param2, setParam2] = useState("default2");
  const Vista = (vista_A, vista_B, Producto, text) => {
    setVista_A(vista_A);
    setVista_B(vista_B);
    setParam1(Producto);
    setParam2(text);
    console.log(vista_A, vista_B, Producto, text);
    props.VistaPrevia(vista_A, vista_B, Producto, text);
  };
  const [subasta, loading_g, error_s] = useCollectionData(
    db2.collection("Subastas")
  );
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
    <div>
      <div className="grid z-10 grid-cols-1 gap-x-2 gap-y-16 p-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <Card
            Vistap={Vista}
            key={index}
            id={product.id}
            name={product.name}
            img={product.images}
            productUID={product.uid}
            description={product.description}
            price={product.price}
            productId={product.id}
            inventory={product.cuanty}
            Status={product.Status}
            cursor-pointer
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-16 p-8 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
        {subasta.map((product_sub) => (
          <Card_sub
            className="bg-red-800"
            key_1={product_sub.id}
            productId={product_sub.id}
            name={product_sub.name}
            descripcion={product_sub.descripcion}
            requisito={product_sub.productRequisitos}
            price_partida={product_sub.price_partida}
            auctionTime={product_sub.auctionTime}
            auctionStartDate={product_sub.auctionStartDate}
            auctionEndDate={product_sub.auctionEndDate}
            auctionStartTime={product_sub.auctionStartTime}
            auctionEndTime={product_sub.auctionEndTime}
            auctionType={product_sub.auctionType}
            Dis={product_sub.Dis}
            img={product_sub.images}
            /* onClick={() => Vista_Previa(product.id)} */
            Vistap={Vista}
          />
        ))}{" "}
      </div>
    </div>
  );
}

export default ProductCatalog;
