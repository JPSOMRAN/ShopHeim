import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import "../styles/Hero.css";

import CategorySection from "../components/CategorySection";
import NewArrivals from "../components/NewArrivals";
import TrendingSection from "../components/TrendingSection";
import BrandsSection from "../components/BrandsSection";
import WhyShopHeim from "../components/ShopHeim";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

import menFormal from "../assets/hero/men-formal-banner.jpg";
import womenBanner from "../assets/hero/women-banner.jpg";
import casualBanner from "../assets/hero/casual-banner.jpg";
import festiveBanner from "../assets/hero/festive-banner.jpg";

const slides = [
  {
    image: womenBanner,
    tag: "NEW ARRIVALS",
    title: "Modern Women's Wear",
    subtitle: "Fresh Styles Starting ₹999",
    button: "Shop Women",
    path: "/women",
  },
  {
    image: menFormal,
    tag: "FORMAL COLLECTION",
    title: "Executive Elegance",
    subtitle: "Flat 15% OFF On Blazers",
    button: "Shop Formal",
    path: "/men",
  },
  {
    image: casualBanner,
    tag: "CASUAL EDIT",
    title: "Everyday Comfort",
    subtitle: "Trending Fashion Essentials",
    button: "Explore Now",
    path: "/men",
  },
  {
    image: festiveBanner,
    tag: "FESTIVE SPECIAL",
    title: "Celebrate In Style",
    subtitle: "Up To 40% OFF Ethnic Wear",
    button: "Shop Festive",
    path: "/women",
  },
];

function Home() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <>


      <section className="hero">

        <img
          src={slides[current].image}
          alt={slides[current].title}
          className="hero-image"
        />

        <button
          className="arrow left-arrow"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          ❮
        </button>

        <button
          className="arrow right-arrow"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          ❯
        </button>

        <div className="hero-content">

          <p>{slides[current].tag}</p>

          <h1>{slides[current].title}</h1>

          <h3>{slides[current].subtitle}</h3>

          <button
            onClick={() => navigate(slides[current].path)}
          >
            {slides[current].button}
          </button>

        </div>

        <div className="hero-dots">

          {slides.map((_, index) => (

            <span
              key={index}
              className={
                current === index
                  ? "dot active-dot"
                  : "dot"
              }
              onClick={() => setCurrent(index)}
            />

          ))}

        </div>

      </section>

      <CategorySection />

      <NewArrivals />

      <TrendingSection />

      <BrandsSection />

      <WhyShopHeim />

      <Newsletter />

      <Footer />
    </>
  );
}

export default Home;