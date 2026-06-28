import Navbar from "../components/Navbar";

import "../styles/About.css";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">

        <div className="about-container">

          <h1>About ShopHeim</h1>

          <p>
            ShopHeim is a modern fashion e-commerce platform
            built using the MERN Stack. Our mission is to
            provide premium clothing, accessories and
            lifestyle products with a seamless online
            shopping experience.
          </p>

          <div className="about-grid">

            <div className="about-card">
              <h3>Premium Quality</h3>

              <p>
                Carefully selected products from trusted
                brands.
              </p>
            </div>

            <div className="about-card">
              <h3>Fast Delivery</h3>

              <p>
                Safe and quick delivery across India.
              </p>
            </div>

            <div className="about-card">
              <h3>Secure Payments</h3>

              <p>
                100% secure payment gateway with multiple
                payment options.
              </p>
            </div>

          </div>

        </div>

      </section>

    </>
  );
}

export default About;