import "../styles/ShopHeim.css";

function WhyShopHeim() {
  const features = [
    {
      title: "Premium Quality",
      desc: "Curated fashion from trusted brands.",
    },

    {
      title: "Fast Delivery",
      desc: "Quick and reliable shipping across India.",
    },

    {
      title: "Secure Payments",
      desc: "100% secure checkout experience.",
    },

    {
      title: "Easy Returns",
      desc: "Hassle-free return and exchange policy.",
    },
  ];

  return (
    <section className="why-shopheim">

      <h2>WHY SHOPHEIM</h2>

      <div className="why-grid">

        {features.map((item, index) => (
          <div className="why-card" key={index}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}

      </div>

    </section>
  );
}

export default WhyShopHeim;