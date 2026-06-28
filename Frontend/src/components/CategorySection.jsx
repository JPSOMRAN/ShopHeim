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
      route: "/men",
    },

    {
      name: "Women",
      image: womenImg,
      route: "/women",
    },

    {
  name: "Boys",
  image: boysImg,
  route: "/boys",
},

{
  name: "Girls",
  image: girlsImg,
  route: "/girls",
} ,
  ];

  return (
    <section className="categories">

      <h2>SHOP BY CATEGORY</h2>

      <div className="category-grid">

        {categories.map((item, index) => (

          <div
            className="category-card"
            key={index}
            onClick={() => item.route && navigate(item.route)}
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