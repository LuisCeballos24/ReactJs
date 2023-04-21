import Sidebar from "./component/shared/Sidebar";
import { db, auth, storage } from "./utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import {
  RiMenu3Fill,
  RiUser3Line,
  RiAddLine,
  RiPieChartLine,
  RiCloseLine,
  RiSearch2Line,
  RiArrowDownSLine,
} from "react-icons/ri";

//
// const imageUrls = [];
// for (const image of images) {
// const imageRef = storage.ref(`images/${image.name}`);
// await imageRef.put(image);
// const imageUrl = await imageRef.getDownloadURL();
// imageUrls.push(imageUrl);
// }

function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOder] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="bg-[#262837] w-full min-h-screen">
      {/* <<<<<<< HEAD */}
      {/* <Sidebar /> */}
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
          {showMenu ? <RiCloseLine /> : <RiMenu3Fill />}
        </button>
      </nav>
      {/* ======= */}
      <main className="grid grid-cols-1 lg:grid-cols-8 lg:pl-28">
        <div className="lg:col-span-6">
          {/* Header */}
          <header className="p-4">
            {/*Titulo de Search */}
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <h1 className="text-2xl text-gray-300"> Jeager Resto</h1>
                <p className="text-gray-500">07 octubre 2022</p>
              </div>
              <form>
                <div className="relative w-full">
                  <RiSearch2Line className="absolute left-3 top-1/2 text-gray-300 -translate-y-1/2" />
                  <input
                    type="text"
                    className="py-2 pr-4 pl-10 w-full bg-[#1F1D2B] rounded-lg text-gray-300 outline-none"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            {/* TABS*/}
            <nav className="flex justify-between items-center text-gray-300 border-b">
              <a
                href="#"
                className="py-2 pr-4 relative before:w-1/2 before:h-[2px] before:absolute before:bg-[#ec7c6a] before:left-0 before:rounded-full before:-bottom-[1px]"
              >
                Hot dishes
              </a>
              <a href="#" className="py-2 pr-4">
                Cold dishes
              </a>
              <a href="#" className="py-2 pr-4">
                Soup
              </a>
              <a href="#" className="py-2 pr-4">
                Grill
              </a>
            </nav>
            {/*TItle content */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-300">Shoose Dishes</h2>
              <button className="flex gap-4 items-center text-gray-300">
                <RiArrowDownSLine /> Dine in
              </button>
            </div>
          </header>
        </div>

        <div className="fixed right-0 lg:static lg:col-span-2">carrito</div>
      </main>
    </div>
  );
}

export default App;
