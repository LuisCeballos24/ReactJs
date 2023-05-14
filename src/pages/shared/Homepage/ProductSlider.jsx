import React from "react";
// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";
// import swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../slider.css";
// import required modules
import { Navigation, Pagination } from "swiper";
// import data
import { products } from "../../../data";
// import icons
import { HiPlus } from "react-icons/hi";

const ProductSlider = () => {
  const { pages } = products;
  return (
    <Swiper
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="productSlider min-h-[1300px]"
    >
      {pages.map((page, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px]">
              {page.productList.map((product, index) => {
                const { image, name, price, oldPrice } = product;
                return (
                  <div
                    className="w-full text-left max-w-[290px] h-[380px]"
                    key={index}
                  >
                    <div className="flex relative justify-center items-center w-full h-full border transition rounded-[18px] max-w-[285px] max-h-[292px] mb-[15px] hover:border-accent">
                      <img src={image.type} alt="" />
                      <div className="flex absolute bottom-4 justify-center items-center w-8 h-8 bg-gray-200 rounded-full transition cursor-pointer hover:bg-gray-300 right-[22px]">
                        <HiPlus className="text-xl text-primary" />
                      </div>
                    </div>
                    <div className="font-semibold lg:text-xl">{name}</div>
                    <div className="flex gap-x-3 items-center">
                      <div>$ {price}</div>
                      <div className="line-through text-[15px] text-grey">
                        $ {oldPrice}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ProductSlider;
