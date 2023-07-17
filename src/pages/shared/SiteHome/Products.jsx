import React, { useState, useEffect } from "react";

// import data
import { products } from "../../../data";

// import components
import ProductSlider from "./ProductSlider";

const Products = (props) => {
  const [vista, setVista_A] = useState(false);
  const Login = (vista_A) => {
    setVista_A(vista_A);
    props.Child_1(vista_A);
  };

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
        <ProductSlider Child_2={Login} />
      </div>
    </section>
  );
};

export default Products;
