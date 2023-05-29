// import React, { useState } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "../SiteHome/Header";
import Hero from "../SiteHome/Hero";
import Features from "../SiteHome/Features";
import FeaturesSecond from "../SiteHome/FeaturesSecond";
import NewItems from "../SiteHome/NewItems";
import Products from "../SiteHome/Products";
import Testimonial from "../SiteHome/Testimonial";
import Newsletter from "../SiteHome/Newsletter";
import Footer from "../SiteHome/Footer";

const Home = () => {
  return (
    <div className="mx-auto w-full bg-white max-w-[1440px]">
      <Header />
      <Products />
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
