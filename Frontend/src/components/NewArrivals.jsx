import "../styles/NewArrivals.css";
import { useNavigate } from "react-router-dom";

import shirtImg from "../assets/arrivals/MenFormShirt.jpg";
import blazerImg from "../assets/arrivals/PremiumBlaze.jpg";
import ethnicImg from "../assets/arrivals/Ethnic.jpg";
import bootsImg from "../assets/arrivals/FormBoots.jpg";

function NewArrivals() {

  const navigate = useNavigate();

  const products = [

    {
      image: shirtImg,
      name: "Men's Casual Shirt",
      price: "₹1499",
      gender: "Men",
      category: "Shirts",
    },

    {
      image: blazerImg,
      name: "Premium Blazer",
      price: "₹3999",
      gender: "Men",
      category: "Blazers",
    },

    {
      image: ethnicImg,
      name: "Women's Ethnic Wear",
      price: "₹2499",
      gender: "Women",
      category: "Ethnic Wear",
    },

    {
      image: bootsImg,
      name: "Formal Leather Boots",
      price: "₹2999",
      gender: "Men",
      category: "Footwear",
    },

  ];

  return (

    <section className="arrivals">

      <h2>NEW ARRIVALS</h2>

      <div className="arrivals-grid">

        {products.map((item, index) => (

          <div
            className="arrival-card"
            key={index}
            onClick={() =>
              navigate(
                `/products?gender=${item.gender}&category=${encodeURIComponent(item.category)}`
              )
            }
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <div className="arrival-info">

              <h3>{item.name}</h3>

              <p>{item.price}</p>

              <button>

                Explore →

              </button>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}

export default NewArrivals;