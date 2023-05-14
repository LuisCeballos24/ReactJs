import React from "react";

// import data
import { hero } from "../../../data";

// import components
import Stats from "./Stats";

const Hero = () => {
  const { title, subtitle, buttonText } = hero;
  return (
    <section className="relative mb-12 w-full h-full text-white bg-right bg-no-repeat bg-cover lg:mb-28 lg:bg-center max-h-[850px] bg-hero pt-[225px] pb-[254px]">
      <div className="container mx-auto text-center">
        {/* title */}
        <h1 className="mx-auto text-2xl font-semibold lg:leading-tight mb-[30px] lg:text-[64px] lg:max-w-[888px]">
          {title}
        </h1>
        {/* subtitle */}
        <h2 className="mx-auto lg:text-xl mb-[30px] max-w-[627px] lg:mb-[65px]">
          {subtitle}
        </h2>
        {/* button */}
        <button className="px-[35px] lg:px-[80px] py-[9px] lg:py-[16px] mb-[160px] lg:mb-[194px] text-xl rounded-md bg-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.5)] backdrop-blur-md transition">
          {buttonText}
        </button>
        {/* stats */}
        <div className="relative -top-[70px]">
          <Stats />
        </div>
      </div>
    </section>
  );
};

export default Hero;
