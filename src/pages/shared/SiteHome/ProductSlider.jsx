import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../../slider.css";
import { Navigation, Pagination } from "swiper";
import { db2 } from "../../../utils/firebase.js";
import { HiPlus } from "react-icons/hi";
import Modal_12 from "../ModalWindow/Modal";

const ProductSlider = (props) => {
  const [isModalOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

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

    const fetchCategories = async () => {
      try {
        const categoriesSnapshot = await db2.collection("productos").get();
        const uniqueCategories = Array.from(
          new Set(categoriesSnapshot.docs.map((doc) => doc.data().category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error fetching categories from Firebase:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    // Filtrar productos por nombre y categoría
    const filtered = products.filter((product) => {
      // Filtrar por nombre
      const nameMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtrar por categoría
      const categoryMatch = selectedCategory ? product.category === selectedCategory : true;

      return nameMatch && categoryMatch;
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const imagesPerSlide = 10; // Número de imágenes por cada SwiperSlide
  const totalSlides = Math.ceil(filteredProducts.length / imagesPerSlide); // Número total de SwiperSlides

  return (
    <>
      <div>
        <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Buscar por nombre" />
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todas las categorías</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <Swiper
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="productSlider min-h-[1300px]"
      >
        {[...Array(totalSlides)].map((_, slideIndex) => {
          const startIdx = slideIndex * imagesPerSlide;
          const endIdx = startIdx + imagesPerSlide;
          const slideProducts = filteredProducts.slice(startIdx, endIdx);

          return (
            <SwiperSlide key={slideIndex}>
              <div className="grid grid-cols-2 gap-x-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px]">
                {slideProducts.map((producto, index) => {
                  const { images, name, price } = producto;
                  return (
                    <div
                      className="w-full text-left max-w-[290px] h-[380px]"
                      key={startIdx + index}
                    >
                      <div className="flex relative justify-center items-center w-full h-full border transition rounded-[18px] max-w-[285px] max-h-[292px] mb-[15px] hover:border-accent">
                        {images && <img src={images} alt="" />}
                        <div className="flex absolute bottom-4 justify-center items-center w-8 h-8 bg-gray-200 rounded-full transition cursor-pointer hover:bg-gray-300 right-[22px]">
                          {isModalOpen && (
                            <Modal_12
                              Child_3={Login}
                              onClick={handleToggleModal}
                            />
                          )}
                        </div>
                      </div>
                      <div className="font-semibold lg:text-xl">{name}</div>
                      <div className="flex gap-x-3 items-center">
                        <div>$ {price}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ProductSlider;