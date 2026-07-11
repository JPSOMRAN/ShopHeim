import "../styles/TrendingSection.css";
import { useNavigate } from "react-router-dom";

import ethnic from "../assets/trending/ethnic.jpg";
import casual from "../assets/trending/casual.jpg";
import menActive from "../assets/trending/men-active.jpg";
import womenActive from "../assets/trending/women-active.jpg";
import western from "../assets/trending/western.jpg";
import sports from "../assets/trending/sports.jpg";

import lounge from "../assets/trending/lounge.jpg";
import innerwear from "../assets/trending/innerwear.jpg";
import watches from "../assets/trending/watches.jpg";
import grooming from "../assets/trending/grooming.jpg";
import beauty from "../assets/trending/beauty.jpg";
import footwear from "../assets/trending/footwear.jpg";

function TrendingSection() {
  const navigate = useNavigate();

  const trends = [
    {
      image: ethnic,
      title: "Ethnic Wear",
      offer: "50-80% OFF",
      slug: "ethnic",
    },

    {
      image: casual,
      title: "Casual Wear",
      offer: "40-80% OFF",
      slug: "casual",
    },

    {
      image: menActive,
      title: "Men's Activewear",
      offer: "30-70% OFF",
      slug: "men-active",
    },

    {
      image: womenActive,
      title: "Women's Activewear",
      offer: "30-70% OFF",
      slug: "women-active",
    },

    {
      image: western,
      title: "Western Wear",
      offer: "40-80% OFF",
      slug: "western",
    },

    {
      image: sports,
      title: "Sportswear",
      offer: "30-80% OFF",
      slug: "sports",
    },

    {
      image: lounge,
      title: "Loungewear",
      offer: "30-60% OFF",
      slug: "lounge",
    },

    {
      image: innerwear,
      title: "Innerwear",
      offer: "UP TO 70% OFF",
      slug: "innerwear",
    },

    {
      image: watches,
      title: "Watches",
      offer: "UP TO 80% OFF",
      slug: "watches",
    },

    {
      image: grooming,
      title: "Grooming",
      offer: "UP TO 60% OFF",
      slug: "grooming",
    },

    {
      image: beauty,
      title: "Beauty & Makeup",
      offer: "UP TO 60% OFF",
      slug: "beauty",
    },

    {
      image: footwear,
      title: "Footwear",
      offer: "UP TO 70% OFF",
      slug: "footwear",
    },
  ];

  return (
    <section className="trending">
      <h2>TRENDING COLLECTIONS</h2>

      <div className="trending-grid">
        {trends.map((item, index) => (
          <div
            key={index}
            className="trend-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/products?trend=${item.slug}`)}
          >
            <img src={item.image} alt={item.title} />

            <div className="trend-info">
              <h3>{item.title}</h3>

              <h4>{item.offer}</h4>

              <span>Shop Now</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TrendingSection;