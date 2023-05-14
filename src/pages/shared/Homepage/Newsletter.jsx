import React from "react";

// import data
import { newsletter } from "../../../data";

const Newsletter = () => {
  const { title, subtitle, placeholder, buttonText } = newsletter;
  return (
    <section className="section bg-newsletter min-h-[490px]">
      <div className="container flex justify-center mx-auto lg:justify-end">
        <div className="w-full text-center text-white lg:text-left max-w-[558px]">
          <h2 className="mx-auto mb-5 text-4xl font-semibold leading-normal lg:mx-0 max-w-[350px]">
            {title}
          </h2>
          <p className="mb-10 text-xl font-light">{subtitle}</p>
          <div className="flex flex-col lg:flex-row gap-[22px]">
            <input
              className="px-6 text-gray-600 rounded-lg outline-none lg:flex-1 h-[60px] placeholder:text-gray-400"
              type="text"
              placeholder={placeholder}
            />
            <button className="px-7 text-xl font-medium rounded-lg transition-all bg-primary h-[60px] hover:bg-slate-900">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
