import React, { useState } from "react";
import Header from "../SiteHome/Header";
import Hero from "../SiteHome/Hero";
import Features from "../SiteHome/Features";
import FeaturesSecond from "../SiteHome/FeaturesSecond";
import NewItems from "../SiteHome/NewItems";
import Products from "../SiteHome/Products";
import Testimonial from "../SiteHome/Testimonial";
import Newsletter from "../SiteHome/Newsletter";
import Footer from "../SiteHome/Footer";
import Login from "../Login/Login";
import Modal from "../ModalWindow/Modal";
const HOME_PAGE = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleHideLogin = () => {
    setShowLogin(false);
  };

  return (
    <div className="mx-auto w-full bg-white max-w-[1440px]">
      <Header />

      <Hero />
      {/**/}
      {/* {!showLogin && <button onClick={handleShowLogin}>Mostrar Login</button>} */}
      {/**/}
      {/* {showLogin && ( */}
      {/*   <div> */}
      {/*     <button onClick={handleHideLogin}>Ocultar Login</button> */}
      {/*     <Login /> */}
      {/*   </div> */}
      {/* )} */}
      {/* <Modal /> */}
      <Features />
      <NewItems />
      <FeaturesSecond />
      <Products />
      <Testimonial />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HOME_PAGE;
