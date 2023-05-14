import React from "react";

// import data
import { products } from "../../../data";

// import components
import ProductSlider from "./ProductSlider";

const Products = () => {
  const { title, subtitle } = products;
  return (
    <section className="text-center section">
      <div className="container mx-auto">
        <div>
          <h2 className="title">{title}</h2>
          <p className="mx-auto max-w-[639px] mb-[50px] lg:mb-[70px]">
            {subtitle}
          </p>
        </div>
        <ProductSlider />
      </div>
    </section>
  );
};

export default Products;
