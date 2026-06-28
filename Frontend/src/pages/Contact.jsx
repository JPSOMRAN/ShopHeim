import Navbar from "../components/Navbar";

import "../styles/Contact.css";

function Contact() {
  return (
    <>
      <Navbar />

      <section className="contact-page">

        <div className="contact-container">

          <h1>Contact Us</h1>

          <p>Email : support@shopheim.com</p>

          <p>Phone : +91 9876543210</p>

          <p>Address :</p>

          <p>
            ShopHeim Headquarters
            <br />
            Bhubaneswar, Odisha
            <br />
            India
          </p>

        </div>

      </section>

    </>
  );
}

export default Contact;