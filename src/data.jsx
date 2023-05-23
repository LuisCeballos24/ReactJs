// import icons
import {
  IoLogoYoutube,
  IoLogoFacebook,
  IoLogoGithub,
  IoLogoInstagram,
  IoMdAddCircle,
  IoIosCheckmarkCircle,
  IoIosArrowRoundForward,
} from "react-icons/io";

// import images
import Features1Img from "./media/img/commitment.png";
import Features2Img from "./media/img/elearning.png";
import ChairImg from "./media/img/subasta.png";
import BedImg from "./media/img/intercambio.png";
import CupboardImg from "./media/img/venta.png";
import LightingImg from "./media/img/vacio.png";
import Product1Img from "./media/img/products/product-1.png";
import Product2Img from "./media/img/products/product-2.png";
import Product3Img from "./media/img/products/product-3.png";
import Product4Img from "./media/img/products/product-4.png";
import Product5Img from "./media/img/products/product-5.png";
import Product6Img from "./media/img/products/product-6.png";
import Product7Img from "./media/img/products/product-7.png";
import Product8Img from "./media/img/products/product-8.png";
import Product9Img from "./media/img/products/product-9.png";
import Product10Img from "./media/img/products/product-10.png";
import TestimonialImg from "./media/img/coding.png";
import Avatar1Img from "./media/img/avatar-1.png";
import Avatar2Img from "./media/img/avatar-2.png";
import Avatar3Img from "./media/img/avatar-3.png";
import Avatar4Img from "./media/img/avatar-4.png";

export const navigation = [
  {
    name: "HOME",
    href: "home",
  },
  {
    name: "Catalogo",
    href: "about",
  },
  {
    name: "Novedades",
    href: "features",
  },
];

export const hero = {
  title: "Vende , compra , intercambia , y subasta todo lo que tu deses",
  subtitle:
    "Encontrarás una amplia variedad de productos y servicios para satisfacer tus necesidades",
  buttonText: "Ver catalogo ",
};

export const stats = [
  {
    value: "2",
    text: "Year Experience",
  },
  {
    value: "2",
    text: "Opened in the country",
  },
  {
    value: "10k+",
    text: "Furniture sold",
  },
  {
    value: "260+",
    text: "Variant Furniture",
  },
];

export const features = {
  image: <Features1Img />,
  title:
    "Hacemos de tu compra una experiencia satisfactoria y sin complicaciones.",
  subtitle: " ",
  buttonText: "Show Now",
  items: [
    {
      icon: <IoIosCheckmarkCircle />,
      title: "Servicio de valoracion",
      subtitle:
        "A veces las características requieren una breve descripción. Esta puede ser una descripción detallada",
    },
    {
      icon: <IoIosCheckmarkCircle />,
      title: "Recomendaciones personalizadas",
      subtitle:
        "Brindamos a los usuarios sugerencias y recomendaciones basadas en sus preferencias y comportamiento de compra",
    },
  ],
  feature2: {
    image: <Features2Img />,
    title: "The Best Furniture Manufacturer of your choice",
    subtitle:
      "Furnitre power is a software as services for multiperpose business management system, expecially for them who are running two or more business exploree the future Furnitre power is a software as services.",
  },
};

export const newInStore = {
  title: "Nueva en tienda ahora",
  subtitle:
    "Obtenga los últimos artículos de inmediato con precios promocionales",
  link: "Check all",
  icon: <IoIosArrowRoundForward />,
  products: [
    {
      name: "chair",
      image: <ChairImg />,
    },
    {
      name: "bed",
      image: <BedImg />,
    },
    {
      name: "cupboard",
      image: <CupboardImg />,
    },
    {
      name: "lighting",
      image: <LightingImg />,
    },
  ],
};

export const products = {
  title: "Todos los productos",
  subtitle: "Los productos que brindamos solo para sus preferencias ",
  pages: [
    {
      productList: [
        {
          image: <Product1Img />,
          icon: <IoMdAddCircle />,
          name: "Ceiling Light",
          price: 75,
          oldPrice: 82,
        },
        {
          image: <Product2Img />,
          icon: <IoMdAddCircle />,
          name: "Wood Chair",
          price: 50,
          oldPrice: 70,
        },
        {
          image: <Product3Img />,
          icon: <IoMdAddCircle />,
          name: "Papper Cupboard",
          price: 105,
          oldPrice: 120,
        },
        {
          image: <Product4Img />,
          icon: <IoMdAddCircle />,
          name: "Ole Gundorse Spring",
          price: 75,
          oldPrice: 82,
        },
        {
          image: <Product5Img />,
          icon: <IoMdAddCircle />,
          name: "Treos Seroes 911",
          price: 200,
          oldPrice: 210,
        },
        {
          image: <Product6Img />,
          icon: <IoMdAddCircle />,
          name: "Multi bilderman slibber",
          price: 45,
          oldPrice: 50,
        },
        {
          image: <Product7Img />,
          icon: <IoMdAddCircle />,
          name: "XORA corner desk",
          price: 320,
          oldPrice: 325,
        },
        {
          image: <Product8Img />,
          icon: <IoMdAddCircle />,
          name: "Black Forest Series Wood",
          price: 225,
          oldPrice: 240,
        },
        {
          image: <Product9Img />,
          icon: <IoMdAddCircle />,
          name: "Papper Cupboard",
          price: 105,
          oldPrice: 120,
        },
        {
          image: <Product10Img />,
          icon: <IoMdAddCircle />,
          name: "Ole Gundorse Spring",
          price: 75,
          oldPrice: 82,
        },
      ],
    },
    {
      productList: [
        {
          image: <Product1Img />,
          icon: <IoMdAddCircle />,
          name: "Ceiling Light",
          price: 75,
          oldPrice: 82,
        },
        {
          image: <Product2Img />,
          icon: <IoMdAddCircle />,
          name: "Wood Chair",
          price: 50,
          oldPrice: 70,
        },
        {
          image: <Product3Img />,
          icon: <IoMdAddCircle />,
          name: "Papper Cupboard",
          price: 105,
          oldPrice: 120,
        },
        {
          image: <Product4Img />,
          icon: <IoMdAddCircle />,
          name: "Ole Gundorse Spring",
          price: 75,
          oldPrice: 82,
        },
        {
          image: <Product5Img />,
          icon: <IoMdAddCircle />,
          name: "Treos Seroes 911",
          price: 200,
          oldPrice: 210,
        },
        {
          image: <Product6Img />,
          icon: <IoMdAddCircle />,
          name: "Multi bilderman slibber",
          price: 45,
          oldPrice: 50,
        },
        {
          image: <Product7Img />,
          icon: <IoMdAddCircle />,
          name: "XORA corner desk",
          price: 320,
          oldPrice: 325,
        },
        {
          image: <Product8Img />,
          icon: <IoMdAddCircle />,
          name: "Black Forest Series Wood",
          price: 225,
          oldPrice: 240,
        },
        {
          image: <Product9Img />,
          icon: <IoMdAddCircle />,
          name: "Papper Cupboard",
          price: 105,
          oldPrice: 120,
        },
        {
          image: <Product10Img />,
          icon: <IoMdAddCircle />,
          name: "Ole Gundorse Spring",
          price: 75,
          oldPrice: 82,
        },
      ],
    },
  ],
};

export const testimonial = {
  title: "Colaboradores del Proyecto",
  image: <TestimonialImg />,
  persons: [
    {
      avatar: <Avatar1Img />,
      name: "Guillermo Gordon",
      occupation: "Manager of The New York Times",
      message:
        "“They are have a perfect touch for make something so professional ,interest and useful for a lot of people .”",
    },
    {
      avatar: <Avatar2Img />,
      name: "Astrid Balter",
      occupation: "Manager of The New York Times",
      message:
        "“They are have a perfect touch for make something so professional ,interest and useful for a lot of people .”",
    },
    {
      avatar: <Avatar3Img />,
      name: "Paula Pfeffer",
      occupation: "Manager of The New York Times",
      message:
        "“They are have a perfect touch for make something so professional ,interest and useful for a lot of people .”",
    },
  ],
};

export const newsletter = {
  title: "Obten mas informacion sobre nosotros",
  subtitle: "Únete a nuestra lista de correos",
  placeholder: "Your email address",
  buttonText: "Ver catalogo ",
};

export const footer = {
  social: [
    {
      icon: <IoLogoYoutube />,
      href: "#",
    },
    {
      icon: <IoLogoInstagram />,
      href: "#",
    },
    {
      icon: <IoLogoGithub />,
      href: "#",
    },
    {
      icon: <IoLogoFacebook />,
      href: "#",
    },
  ],
  copyright: "TN & BSS 2023 - All Rights Reserved.",
};
