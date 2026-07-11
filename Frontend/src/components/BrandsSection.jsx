import "../styles/BrandsSection.css";
import { useNavigate } from "react-router-dom";

import nike from "../assets/brands/nike.png";
import adidas from "../assets/brands/adidas.png";
import puma from "../assets/brands/puma.png";
import levis from "../assets/brands/levis.png";
import hm from "../assets/brands/hm.png";
import zara from "../assets/brands/zara.png";

import asics from "../assets/brands/asics.png";
import newbalance from "../assets/brands/New-Balance-Logo.png";
import woodland from "../assets/brands/Woodland.png";
import vanheusen from "../assets/brands/van_heusen.png";
import louisphilippe from "../assets/brands/louis_philippe.png";
import wrogn from "../assets/brands/Wrogn.png";

function BrandsSection() {

  const navigate = useNavigate();

 const brands = [

  {
    image: nike,
    name: "Nike",
  },

  {
    image: adidas,
    name: "Adidas",
  },

  {
    image: puma,
    name: "Puma",
  },

  {
    image: asics,
    name: "Asics",
  },

  {
    image: newbalance,
    name: "New Balance",
  },

  {
    image: woodland,
    name: "Woodland",
  },

  {
    image: levis,
    name: "Levis",
  },

  {
    image: hm,
    name: "HM",
  },

  {
    image: zara,
    name: "ZARA",
  },

  {
    image: vanheusen,
    name: "Van Heusen",
  },

  {
    image: louisphilippe,
    name: "Louis Philippe",
  },

  {
    image: wrogn,
    name: "Wrogn",
  },

];

  return (

    <section className="brands">

      <h2>FEATURED BRANDS</h2>

      <div className="brands-grid">

        {brands.map((brand) => (

          <div

            key={brand.name}

            className="brand-card"

            onClick={() =>

              navigate(

                `/products?brand=${brand.name}`

              )

            }

          >

            <img

              src={brand.image}

              alt={brand.name}

            />

          </div>

        ))}

      </div>

    </section>

  );

}

export default BrandsSection;