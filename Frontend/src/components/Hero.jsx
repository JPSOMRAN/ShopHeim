import { useState, useEffect } from "react";
import heroData from "../data/heroData";
import "../styles/Hero.css";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroData.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroData[currentSlide];

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${slide.image})`,
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h3>{slide.subtitle}</h3>
          <h1>{slide.title}</h1>
          <p>{slide.offer}</p>
          <button>SHOP NOW</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;