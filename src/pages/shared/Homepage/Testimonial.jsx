import React from "react";

// import components
import TestimonialSlider from "./TestimonialSlider";
// import data
import { testimonial } from "../../../data";

const Testimonial = () => {
  const { image, title } = testimonial;
  return (
    <section className="section">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-10">
          <div className="lg:max-w-[50%]">
            {/* title */}
            <h2 className="mb-9 title">{title}</h2>
            {/* slider */}
            <TestimonialSlider />
          </div>
          {/* image */}
          <div className="order-1">
            <img src={image.type} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
