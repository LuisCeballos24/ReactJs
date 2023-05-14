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
import Sidebar from "./Sidebar";
import Car from "./Car";
import Car_up from "./Car_up";
import Header from "./Header";
import Header_Lg from "./Header_LG";
import Card from "./Card";
import ProductCatalog from "./Body_Card";
function HomePage_user() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const toggleOrders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };

  return (
    <div id="HomePage_user" className="w-full min-h-screen bg-white">
      <Sidebar showMenu={showMenu} />
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
          {/* Header */}
          <Header_Lg />

          <Header />
          {/* Title content */}
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-xl text-gray-300">Choose Dishes</h2>
            <button className="flex items-center gap-4 text-gray-300 bg-[#285e7d] py-2 px-4 rounded-lg">
              <RiArrowDownSLine /> Dine in
            </button>
          </div>
          {/* Content */}
          <Card
            img="dish.png"
            description="Speacy seasoned seafood nodles"
            price="2.29"
            inventory="20"
          />
          <ProductCatalog />
        </div>
      </main>
    </div>
  );
}

export default HomePage_user;
