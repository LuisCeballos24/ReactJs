import { useState } from "react";
import Card from "./Card";
import Card_sub from "./Car_sub";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2, auth } from "../../../utils/firebase.js";

function ProductCatalog_user(props) {
  //Error al dejar que el catagolo envie al usuario

  const currentUser = auth.currentUser;
  const [estadoHijo, setEstadoHijo] = useState(false);
  const [Ventana, setVentana] = useState(0);
  const Vista_Previa = (productId) => {
    console.log("Paso por aqui");
    const nuevoEstado = !estadoHijo;
    const ven = productId;
    setVentana(ven);
    const nuevoParam2 = productId;
    setEstadoHijo(nuevoEstado);
    props.VistaPrevia(nuevoEstado, ven, nuevoParam2);
  };
  // PARAMETROS PARA LA VISTA PREVIA
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
    db2.collection("Subastas").where("uid", "==", currentUser?.uid || "")
  );
  const [products, loading, error] = useCollectionData(
    db2.collection("productos").where("uid", "==", currentUser?.uid || "")
  );

  if (loading) {
    return <p>Cargando productos...</p>;
  }
  if (loading_g) {
    return <p>Cargando productos...</p>;
  }

  if (error_s) {
    return <p>Error al cargar productos: {error.message}</p>;
  }
  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-16 p-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        <div className="p-8 bg-gray-100 rounded-xl">
          <div className="flex flex-col gap-8 items-center my-20 justify-center p-6 text-left text-center text-gray-600 bg-white rounded-xl border border-grey-300 transition hover:border-[#E89440]">
            <h2 className="text-xl font-semibold"> Agregar Producto</h2>
            <p className="text-gray-600"></p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => Vista_Previa(2)}
                className="py-2 px-4 text-black bg-green-500 rounded-md"
              >
                Agregar Producto
              </button>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => Vista_Previa(4)}
                className="py-2 px-4 text-black bg-yellow-500 rounded-md"
              >
                Agregar producto de Subasta
              </button>
            </div>
          </div>
        </div>
        {products.map((product) => (
          <Card
            className="bg-red-800"
            key={product.id}
            name={product.name}
            img={product.images}
            description={product.description}
            price={product.price}
            productId={product.id}
            inventory={product.cuanty}
            Status={product.Status}
            cursor-pointer
            USER_TATUS={true}
            /* onClick={() => Vista_Previa(product.id)} */
            Vistap={Vista}
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

export default ProductCatalog_user;
