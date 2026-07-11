import "../styles/CategorySection.css";
import { useNavigate } from "react-router-dom";

import menImg from "../assets/category/men-category.jpg";
import womenImg from "../assets/category/women-category.jpg";
import boysImg from "../assets/category/boys-category.jpg";
import girlsImg from "../assets/category/girls-category.jpg";

function CategorySection() {

  const navigate = useNavigate();

  const categories = [
    {
      name: "Men",
      image: menImg,
      route: "/products?gender=Men",
    },

    {
      name: "Women",
      image: womenImg,
      route: "/products?gender=Women",
    },

    {
      name: "Boys",
      image: boysImg,
      route: "/products?gender=Boys",
    },

    {
      name: "Girls",
      image: girlsImg,
      route: "/products?gender=Girls",
    },
  ];

  return (
    <section className="categories">

      <h2>SHOP BY CATEGORY</h2>

      <div className="category-grid">

        {categories.map((item, index) => (

          <div
            key={index}
            className="category-card"
            onClick={() => navigate(item.route)}
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <div className="category-overlay">

              <h3>{item.name}</h3>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default CategorySection;