import React, { useEffect, useState } from "react";
import { features } from "../../../data.jsx";

const Card = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [triangle2Display, setTriangle2Display] = useState("block");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth < 1400) {
        setTriangle2Display("none");
      } else {
        setTriangle2Display("block");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { title, subtitle, image, items } = features;
  const triangle1Width = windowWidth >= 1280 ? 920 : 600;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center p-6 text-left bg-gray-300 rounded-xl border transition lg:flex-row border-grey-300">
        {/* seccion  */}
        <div className="w-full md:w-1/2"></div>
        <div className="relative md:w-96">
          <div className="absolute h-80">
            <div
              className="absolute rounded-bl-2xl transform rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle-2 md:w-[925px] md:left-[-600px]"
              style={{ display: triangle2Display }}
            ></div>
            <div
              className="absolute rounded-bl-2xl transform rounded-lg-2xl top-[-20px] -rotate-30 diagonal-triangle md:w-[900px] md:left-[-600px]"
              style={{ display: triangle2Display }}
            >
              <div className="p-10 mb-4">
                <h2 className="text-3xl font-bold text-gray-50">
                  Bienvenido al Intercambio de Bienes
                </h2>
              </div>
              <p className="flex flex-1 order-1 p-8 text-gray-100 lg:-order-1">
                En nuestro sitio, puedes explorar una amplia variedad de
                productos y servicios disponibles para el intercambio. Descubre
                nuevas oportunidades para intercambiar tus bienes por otros que
                sean de tu interés. ¡Encuentra el objeto perfecto para
                intercambiar y haz un trueque emocionante!
              </p>
            </div>
          </div>
          <div className="relative w-full h-80">
            <img
              id="Promo"
              src="../../../../public/Business.svg"
              alt=""
              className="object-cover w-full h-full rounded-xl promo-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
{
  /* <section className="bg-red-100 section"> */
}
{
  /*   <div className="container mx-auto bg-red-200"> */
}
{
  /*     <div className="flex flex-col bg-red-300 lg:flex-row lg:gap-x-[100px]"> */
}

{
  /*       <div className="flex-1 order-1 bg-blue-400 lg:-order-1"> */
}
{
  /*         <img src={image.type} alt="" /> */
}
{
  /*       </div> */
}

{
  /*       <div className="flex flex-col flex-1 justify-end"> */
}
{
  /*         <h2 className="title">{title}</h2> */
}
{
  /*         <p className="subtitle">{subtitle}</p> */
}

{
  /*         <div> */
}
{
  /*           {items.map((item, index) => { */
}
{
  /*             const { icon, title, subtitle } = item; */
}
{
  /*             return ( */
}
{
  /*               <div className="flex mb-6 lg:last:mb-0" key={index}> */
}
{
  /*                 <div className="mr-4 text-2xl lg:text-3xl">{icon}</div> */
}
{
  /*                 <div> */
}
{
  /*                   <h4 className="mb-3 text-base font-semibold lg:text-xl"> */
}
{
  /*                     {title} */
}
{
  /*                   </h4> */
}
{
  /*                   <p>{subtitle}</p> */
}
{
  /*                 </div> */
}
{
  /*               </div> */
}
{
  /*             ); */
}
{
  /*           })} */
}
{
  /*         </div> */
}
{
  /*       </div> */
}
{
  /*     </div> */
}
{
  /*   </div> */
}
{
  /* </section> */
}
