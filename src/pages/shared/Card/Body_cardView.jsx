import { useState } from "react";
import Card from "./Card_View";
import CardCH from "./card_ch";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db2, auth } from "../../../utils/firebase.js";

function Card_view(props) {
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

  /*  const currentUser = auth.currentUser; */
  const [user] = useAuthState(auth);

  const query = db2
    .collection("CHANGE_580")
    .where("buyerId", "==", user?.uid || "");
  const [products, loading, error] = useCollectionData(query);

  const query_CH = db2
    .collection("Carritos_match")
    .where("buyerId", "==", user?.uid || "");
  const [change, loading_1, error_1] = useCollectionData(query_CH);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>Error al cargar productos: {error.message}</p>;
  }

  return (
    <div>
      <div>
        {products.map((product, index) => (
          <Card
            Vistap={Vista}
            key={index}
            id={product.id}
            name={product.nombre}
            img={product.images}
            Status={product.id_S}
            description={product.descripcion}
            price={product.oferta}
            productId={product.id_persona}
            url={product.url}
            cursor-pointer
          />
        ))}
      </div>
      <div>
        {change.map((product, index) => (
          <CardCH
            Vistap={Vista}
            key={index}
            id={product.id}
            id_2={product.Compara_obj[0]}
            name={product.nombre}
            img={product.images}
            Status={product.id_S}
            Prie_ID={product.buyerId}
            ADY_ID={product.Compara}
            description={product.descripcion}
            price={product.price}
            productId={product.id_persona}
            url={product.url}
            cursor-pointer
          />
        ))}
      </div>
    </div>
  );
}

export default Card_view;
