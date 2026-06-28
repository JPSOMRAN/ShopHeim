import "../styles/BrandsSection.css";

import nike from "../assets/brands/nike.png";
import adidas from "../assets/brands/adidas.png";
import puma from "../assets/brands/puma.png";
import levis from "../assets/brands/levis.png";
import hm from "../assets/brands/hm.png";
import zara from "../assets/brands/zara.png";

function BrandsSection() {
  const brands = [
    nike,
    adidas,
    puma,
    levis,
    hm,
    zara,
  ];

  return (
    <section className="brands">

      <h2>FEATURED BRANDS</h2>

      <div className="brands-grid">

        {brands.map((brand, index) => (
          <div className="brand-card" key={index}>
            <img src={brand} alt="brand" />
          </div>
        ))}

      </div>

    </section>
  );
}

export default BrandsSection;