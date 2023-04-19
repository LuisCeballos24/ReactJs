import Sidebar from "./component/shared/Sidebar";
import React, { useState } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
} from "react-icons/ri";
function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOder] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="bg-[#262837] w-full min-h-screen">
      <Sidebar showMenu={showMenu} />
      {/* Menu Movil */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#1F1D2B] lg:hidden text-3xl text-gray-300 py-4 px-8 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <button>
          <RiUser3Line />
        </button>
        <button>
          <RiAddLine />
        </button>
        <button>
          <RiPieChartLine />
        </button>
        <button onClick={toggleMenu} className="p-2 text-white">
          <RiMenu3Fill />
        </button>
        <main className="pl-26">
          <div>Hola </div>
          <div>Hola 2</div>
        </main>
      </nav>
    </div>
  );
}

export default App;
