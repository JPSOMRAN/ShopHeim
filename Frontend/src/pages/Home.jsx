import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
  },

  {
    image: menFormal,
    tag: "FORMAL COLLECTION",
    title: "Executive Elegance",
    subtitle: "Flat 15% OFF On Blazers",
    button: "Shop Formal",
  },

  {
    image: casualBanner,
    tag: "CASUAL EDIT",
    title: "Everyday Comfort",
    subtitle: "Trending Fashion Essentials",
    button: "Explore Now",
  },

  {
    image: festiveBanner,
    tag: "FESTIVE SPECIAL",
    title: "Celebrate In Style",
    subtitle: "Up To 40% OFF Ethnic Wear",
    button: "Shop Festive",
  },
];

function Home() {
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
      <Navbar />

      <section className="hero">
        <img
          src={slides[current].image}
          alt="banner"
          className="hero-image"
        />

        <button
          className="arrow left-arrow"
          onClick={prevSlide}
        >
          ❮
        </button>

        <button
          className="arrow right-arrow"
          onClick={nextSlide}
        >
          ❯
        </button>

        <div className="hero-content">
          <p>{slides[current].tag}</p>

          <h1>{slides[current].title}</h1>

          <h3>{slides[current].subtitle}</h3>

           <button
  onClick={() => {

    if (current === 0) {

      window.location.href = "/women";

    }

    else if (current === 1) {

      window.location.href = "/men";

    }

    else if (current === 2) {

      window.location.href = "/men";

    }

    else {

      window.location.href = "/women";

    }

  }}
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
            ></span>
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