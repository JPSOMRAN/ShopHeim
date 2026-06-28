import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import useWishlist from "../hooks/useWishlist";

import "../styles/Wishlist.css";

function Wishlist() {

  const navigate = useNavigate();

  const {

    wishlistItems,

    removeFromWishlist,

  } = useWishlist();

  return (

    <>

      <Navbar />

      <section className="wishlist-page">

        <h1>My Wishlist ❤️</h1>

        {

          wishlistItems.length === 0 ?

          (

            <div className="empty-wishlist">

              <h2>

                Your Wishlist Is Empty

              </h2>

              <p>

                Save your favourite products here.

              </p>

            </div>

          )

          :

          (

            <div className="wishlist-grid">

              {

                wishlistItems.map((item) => (

                  <div

                    key={item.id}

                    className="wishlist-card"

                  >

                    <img

                      src={item.image}

                      alt={item.name}

                    />

                    <div className="wishlist-info">

                      <span>

                        {item.brand || item.category}

                      </span>

                      <h3>

                        {item.name}

                      </h3>

                      <h2>

                        {item.price}

                      </h2>

                      <div className="wishlist-buttons">

                        <button

                          className="details-btn"

                          onClick={() =>

                            navigate(`/product/${item.id}`)

                          }

                        >

                          View Details

                        </button>

                        <button

                          className="remove-btn"

                          onClick={() =>

                            removeFromWishlist(item.id)

                          }

                        >

                          Remove

                        </button>

                      </div>

                    </div>

                  </div>

                ))

              }

            </div>

          )

        }

      </section>

    </>

  );

}

export default Wishlist;