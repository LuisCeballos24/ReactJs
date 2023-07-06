import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../slider.css";
import { Navigation, Pagination } from "swiper";
import { db2, storage } from "../../../utils/firebase.js";
import { HiPlus } from "react-icons/hi";
import Modal_12 from "../ModalWindow/Modal";

const ProductSlider = (props) => {
  const [isModalOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [Seccion, setSeccion] = useState(false);

  const handleToggleModal = () => {
    console.log("Paso por aqui");
    setIsOpen(!isModalOpen);
  };

  const Login = (vista_A) => {
    console.log("Chil_2");
    props.Child_2(vista_A);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await db2.collection("productos").get();
        const productList = productsSnapshot.docs.map((doc) => doc.data());
        setProducts(productList);
      } catch (error) {
        console.log("Error fetching products from Firebase:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="productSlider min-h-[1300px]"
      >
        {products.map((producto, index) => {
          const { images, name, price } = producto;
          return (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px]">
                <div className="w-full text-left max-w-[290px] h-[380px]" key={index}>
                  <div className="flex relative justify-center items-center w-full h-full border transition rounded-[18px] max-w-[285px] max-h-[292px] mb-[15px] hover:border-accent">
                    {images && <img src={images} alt="" />}
                    <div className="flex absolute bottom-4 justify-center items-center w-8 h-8 bg-gray-200 rounded-full transition cursor-pointer hover:bg-gray-300 right-[22px]">
                      {isModalOpen && (
                        <Modal_12 Child_3={Login} onClick={handleToggleModal} />
                      )}
                    </div>
                  </div>
                  <div className="font-semibold lg:text-xl">{name}</div>
                  <div className="flex gap-x-3 items-center">
                    <div>$ {price}</div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};


export default ProductSlider;