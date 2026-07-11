import { Link } from "react-router-dom";

import "../styles/NotFound.css";

function NotFound() {
  return (
    <>
   

      <section className="notfound-page">
        <div className="notfound-container">

          <h1 className="error-code">
            404
          </h1>

          <h2>
            Page Not Found
          </h2>

          <p>
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>

          <Link
            to="/"
            className="home-btn"
          >
            ← Back To ShopHeim
          </Link>

        </div>
      </section>
    </>
  );
}

export default NotFound;