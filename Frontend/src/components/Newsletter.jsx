import "../styles/Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">

      <h2>GET 10% OFF YOUR FIRST ORDER</h2>

      <p>
        Subscribe to receive exclusive offers,
        fashion updates and new arrivals.
      </p>

      <div className="newsletter-form">

        <input
          type="email"
          placeholder="Enter your email address"
        />

        <button>
          Subscribe
        </button>

      </div>

    </section>
  );
}

export default Newsletter;