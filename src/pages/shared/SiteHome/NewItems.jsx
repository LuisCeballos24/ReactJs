import React from "react";

// import data
import { newInStore } from "../../../data";

// import components
import NewItemsSlider from "./NewItemsSlider";

const NewItems = () => {
  const { title, subtitle, link, icon } = newInStore;
  return (
    <section className="overflow-hidden relative section lg:min-h-[540px]">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* text */}
          <div className="flex gap-x-6 items-baseline mb-6 md:flex-col lg:mb-0">
            <h2 className="title max-w-[245px] lg:mt-[30px] lg:mb-[90px]">
              {title}
            </h2>
            <p className="lg:mb-12 max-w-[245px]">{subtitle}</p>
            <div className="hidden items-center lg:flex">
              <a
                className="font-medium transition-all lg:items-center hover:border-b border-primary"
                href="#"
              >
                {link}
              </a>
              <div className="text-3xl">{icon}</div>
            </div>
          </div>
          {/* product slider */}
          <div className="lg:absolute lg:-right-24 lg:max-w-[800px] xl:max-w-[990px]">
            <NewItemsSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
