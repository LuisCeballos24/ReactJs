import { useState } from "react";
import Card from "./Card";
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
    const ven = 2;
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

  const [products, loading, error] = useCollectionData(
    db2.collection("productos").where("uid", "==", currentUser?.uid || "")
  );

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-16 p-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
      <div className="p-8 bg-gray-100 rounded-xl">
        <div className="flex flex-col gap-8 items-center my-20 justify-center p-6 text-left text-center text-gray-600 bg-white rounded-xl border border-grey-300 transition hover:border-[#E89440]">
          <h2 className="text-xl font-semibold"> Agregar Producto</h2>
          <p className="text-gray-600"></p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => Vista_Previa()}
              className="py-2 px-4 text-white bg-blue-500 rounded-md"
            >
              Agregar Producto
            </button>
          </div>
          <div className="flex gap-4 justify-center">
            <button className="hidden py-2 px-4 text-white bg-blue-500 rounded-md">
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
          onClick={() => Vista_Previa(product.id)}
          Vistap={Vista}
        />
      ))}
    </div>
  );
}

export default ProductCatalog_user;
