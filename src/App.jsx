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
import Sidebar from "./components/shared/Sidebar";
import Car from "./components/shared/Car";
import Header from "./components/shared/Header";
import Card from "./components/shared/Card";
import ProductCatalog from "./components/shared/Body_Card";
function App() {
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
    <div className="w-full min-h-screen bg-white">
      <Sidebar showMenu={showMenu} />
      <Car showOrder={showOrder} setShowOrder={setShowOrder} />
      {/* Menu movil */}
      <nav className="bg-[#285e7d]  lg:hidden fixed w-full bottom-0 left-0 text-3xl text-[#EA8337]  py-2 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
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

          {/* <div className="grid grid-cols-1 gap-16 p-8 md:grid-cols-2 lg:grid-cols-3"> */}
          <ProductCatalog />
          {/* Card */}
          {/* <Card              img="comida.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            /> 
            {/* Card             <Card
              img="dish.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
            {/* Card             <Card
              img="comida.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
            {/* Card             <Card
              img="dish.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
            {/* Card             <Card
              img="comida.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
            {/* Card             <Card
              img="dish.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
            {/* Card             <Card
              img="comida.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
            {/* Card             <Card
              img="dish.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
            {/* Card             <Card
              img="comida.png"
              description="Speacy seasoned seafood nodles"
              price="2.29"
              inventory="20"
            />
            {/* Card */}
          {/* </div> */}
        </div>
      </main>
    </div>
  );
}

export default App;
