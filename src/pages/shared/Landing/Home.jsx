// import React, { useState } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../SiteHome/Header";
import Hero from "../SiteHome/Hero";
import Features from "../SiteHome/Features";
import FeaturesSecond from "../SiteHome/FeaturesSecond";
import NewItems from "../SiteHome/NewItems";
import Products from "../SiteHome/Products";
import Testimonial from "../SiteHome/Testimonial";
import Newsletter from "../SiteHome/Newsletter";
import Footer from "../SiteHome/Footer";

const Home = (props) => {
  const [vista, setVista_A] = useState(false);
  const Login = (vista_A) => {
    props.princi(vista_A);
  };

  return (
    <div className="mx-auto w-full bg-white max-w-[1440px]">
      <Header />
      <Products Child_1={Login} />
      <Hero />
      <Features />
      <NewItems />
      <FeaturesSecond />
      <Testimonial />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
