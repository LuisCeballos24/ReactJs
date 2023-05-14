import React from "react";

// import components
import Header from "./Homepage/Header";
import Hero from "./Homepage/Hero";
import Features from "./Homepage/Features";
import FeaturesSecond from "./Homepage/FeaturesSecond";
import NewItems from "./Homepage/NewItems";
import Products from "./Homepage/Products";
import Testimonial from "./Homepage/Testimonial";
import Newsletter from "./Homepage/Newsletter";
import Footer from "./Homepage/Footer";

const HOME_PAGE = () => {
  return (
    <div className="mx-auto w-full bg-white max-w-[1440px]">
      <Header />
      <Hero />
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
