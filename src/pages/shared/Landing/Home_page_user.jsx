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

export const changeShowStore = (toggleStore) => {
  console.log("Hola mundo");
  // toggleStore();
};

function Home_Page_user() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [showStore, setShowStore] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };
  const manejarCambioEstado = (nuevoEstado) => {
    setShowStore(nuevoEstado);
  };

  const toggleOrders = () => {
    setShowOrder(!showStore);
  };

  return (
    <div id="HomePage_user" className="w-full min-h-screen bg-white">
      <Sidebar showMenu={showMenu} onCambioEstado={manejarCambioEstado} />
      <Car_up showOrder={showOrder} setShowOrder={setShowOrder} />

      <Car showOrder={showOrder} setShowOrder={setShowOrder} />
      {/* Menu movil */}
      <nav className="bg-[#285e7d]  lg:hidden fixed w-full bottom-0 left-0 text-3xl text-bg-[#EA8337]  py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
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

      <main className="pb-20 lg:pr-96 lg:pl-32">
        <div className="p-4 md:p-8">
          {/* Header  */}

          {showStore ? (
            <>
              <Header_Store />
              <Header_catalogo />
              <ProductCatalog_user />
            </>
          ) : (
            <>
              <Header />
              <Card_Nov />
              <ProductCatalog />
              <Card_Nov />
              <ProductCatalog />
            </>
          )}
          {/**/}
          {/* <Card_Nov /> */}
          <CardAddProduct />
          {/*Add producto  */}
          {/* Title content */}
          {/* <div className="flex justify-between items-center mb-16"> */}
          {/*   <h2 className="text-xl text-gray-300">Choose Dishes</h2> */}
          {/*   <button className="flex items-center gap-4 text-gray-300 bg-[#285e7d] py-2 px-4 rounded-lg"> */}
          {/*     {" "} */}
          {/*     <RiArrowDownSLine /> Dine in */}
          {/*   </button> */}
          {/* </div> */}
          {/* Content Agregar Productos */}
          {/*   <ProductCatalog /> */}
        </div>
      </main>
    </div>
  );
}

export default Home_Page_user;
