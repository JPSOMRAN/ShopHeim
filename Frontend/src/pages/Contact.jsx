import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Contact.css";

function Contact() {
  return (
    <section className="contact-page">

      <div className="contact-container">

        <h1>Contact Us</h1>

        <p className="contact-description">
          We'd love to hear from you. Reach out using any of the methods below.
        </p>

        <div className="contact-grid">

          <div className="contact-card">
            <div className="contact-icon">
              <FaEnvelope />
            </div>

            <h3>Email</h3>

            <p>support@shopheim.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FaPhoneAlt />
            </div>

            <h3>Phone</h3>

            <p>+91 9876543210</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>

            <h3>Address</h3>

            <p>
              ShopHeim Headquarters
              <br />
              Bhubaneswar, Odisha
              <br />
              India
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;