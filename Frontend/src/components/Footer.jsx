import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-grid">

        <div>
          <h2>ShopHeim</h2>

          <p>
            Premium fashion destination
            for modern lifestyle.
          </p>
        </div>

        <div>
          <h3>Categories</h3>

          <ul>
            <li>Men</li>
            <li>Women</li>
            <li>Boys</li>
            <li>Girls</li>
          </ul>
        </div>

        <div>
          <h3>Customer Care</h3>

          <ul>
            <li>Contact</li>
            <li>Help</li>
            <li>Track Order</li>
          </ul>
        </div>

        <div>
          <h3>Follow Us</h3>

          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 ShopHeim. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;