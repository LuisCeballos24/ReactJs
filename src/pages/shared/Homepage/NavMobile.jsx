import React from "react";

// import data
import { navigation } from "../../../data";

const NavMobile = () => {
  return (
    <nav className="w-full h-full bg-white shadow-2xl">
      <ul className="flex flex-col gap-y-6 justify-center items-center h-full text-center">
        {navigation.map((item, index) => {
          return (
            <li key={index}>
              <a className="text-xl font-medium capitalize" href={item.href}>
                {item.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavMobile;
