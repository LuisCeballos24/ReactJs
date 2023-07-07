import React from "react";

// import logo
import Logo from "../../../../public/imagen-445-removebg-preview.png";

// import data
import { footer } from "../../../data";

const Footer = () => {
  return (
    <footer className="text-white section bg-primary">
      <div className="container mx-auto">
        <div className="flex flex-col justify-between pb-7 mb-14 border-b border-gray-700 border-opacity-75 lg:flex-row lg:pb-14">
          <a className="mb-6 lg:mb-0" href="#">
            <img src={Logo} alt="" />
          </a>
          <div className="flex gap-x-4">
            {footer.social.map((item, index) => {
              return (
                <div
                  className="flex justify-center items-center w-12 h-12 text-2xl bg-gray-700 rounded-full transition-all hover:bg-accent"
                  key={index}
                >
                  <a href="#">{item.icon}</a>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-center">
          &copy; TN & BSS 2022 - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
