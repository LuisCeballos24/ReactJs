import { useState } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,
  RiArrowDownSLine,
} from "react-icons/ri";
// Components
import { FaGoogle, FaMicrosoft } from "react-icons/fa";

import Sidebar from "../Sidebar/Sidebar";
import Car from "../Car/Car";
import Car_up from "../Car/Car_up";
import Header from "../Header/Header";
import Header_Store from "../Header/Header_Store";
import Header_catalogo from "../Header/Header_catalogo";
import Header_Lg from "../Header/Header_LG";
import Card from "../Card/Card";
import ProductCatalog from "../Card/Body_Card";
import ProductCatalog_user from "../Card/Body_card_user";
import Card_Nov from "../Card/Card_Nov";
import CardAddProduct from "../Add_Product/CardAddProduct";
import Card_product from "../Card/Card_product";
import Card_subasta from "../Card/Card_subasta";

export const changeShowStore = (toggleStore) => {
  console.log("Hola mundo");
  // toggleStore();
};

function Home_Page_user() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const [showStore, setShowStore] = useState(true);
  const manejarCambioEstado = (nuevoEstado) => {
    setShowStore(nuevoEstado);
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
  };
  const toggleOrders = () => {
    setShowOrder(!showStore);
  };
  const renderContent = () => {
    switch (showStore) {
      case true:
        return (
          <>
            <Header_Store />
            <Header_catalogo />
            {/* {vista ? ( */}
            {/*   <CardAddProduct VistaPrevia={Vista} /> */}
            {/* ) : ( */}
            {/*   <ProductCatalog_user VistaPrevia={Vista} /> */}
            {/* )} */}
            {/* <Card_product /> */}

            {/* <Card_subasta /> */}
            {typeof vista_A === "number" ? (
              vista_A === 1 ? (
                <ProductCatalog_user VistaPrevia={Vista} />
              ) : vista_A === 2 ? (
                // Otra alternativa basada en la condición para vista_A igual a 2
                <CardAddProduct VistaPrevia={Vista} />
              ) : vista_A === 3 ? (
                // Otra alternativa basada en la condición para vista_A igual a 3

                <Card_product VistaPrevia={Vista} />
              ) : vista_A === 4 ? (
                // Otra alternativa basada en la condición para vista_A igual a 4
                {
                  /* <AnotherComponent3 /> */
                }
              ) : (
                // Otra alternativa si vista_A no coincide con ninguno de los valores anteriores
                {
                  /* <DefaultComponent /> */
                }
              )
            ) : (
              // Otra alternativa si vista_A no es un número
              {
                /* <DefaultComponent /> */
              }
            )}
          </>
        );
      case false:
        return (
          <>
            <Header />
            <Card_Nov />
            <ProductCatalog />
            <Card_product />

            {/* <Card_Nov /> */}
            {/* <ProductCatalog /> */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div id="HomePage_user" className="w-full min-h-screen bg-white">
      <Sidebar showMenu={showMenu} onCambioEstado={manejarCambioEstado} />
      <Car_up showOrder={showOrder} setShowOrder={setShowOrder} />
      {/**/}
      <Car showOrder={showOrder} setShowOrder={setShowOrder} />
      {/* Menu movil */}
      <nav className="bg-[#285e7d]  lg:hidden z-50 fixed w-full bottom-0 left-0 text-3xl text-bg-[#EA8337]  py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button className="p-2">
          <RiUser3Line />
        </button>
        <button className="p-2">
          <RiAddLine />
        </button>
        <button onClick={toggleOrders} className="p-2">
          <RiPieChartLine />
        </button>
        <button onClick={toggleMenu} className="p-2 text-white">
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>
      return ( // ...
      <main className="pb-20 lg:pr-96 lg:pl-32">
        <div className="grid-cols-1 p-4 md:p-8">
          {/* Header */}
          {renderContent()}
        </div>
      </main>
      // ... );{" "}
    </div>
  );
}

export default Home_Page_user;
