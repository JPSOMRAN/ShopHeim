import Navbar from "../components/Navbar";
import useCart from "../hooks/useCart";

import "../styles/Checkout.css";

function Checkout() {

  const { cartItems } = useCart();

  const subtotal = cartItems.reduce(

    (total, item) =>

      total +

      Number(
        item.price.replace("₹", "")
      ) * item.quantity,

    0

  );

  const shipping = cartItems.length > 0 ? 99 : 0;

  const total = subtotal + shipping;

  return (

    <>

      <Navbar />

      <div className="checkout-page">

        <div className="checkout-container">

          <div className="checkout-left">

            <h1>

              Checkout

            </h1>

            <div className="checkout-card">

              <h2>

                Shipping Address

              </h2>

              <input
                type="text"
                placeholder="Full Name"
              />

              <input
                type="email"
                placeholder="Email"
              />

              <input
                type="text"
                placeholder="Phone Number"
              />

              <textarea
                placeholder="Complete Address"
                rows="5"
              ></textarea>

            </div>

            <div className="checkout-card">

              <h2>

                Payment Method

              </h2>

              <label>

                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />

                Cash On Delivery

              </label>

              <label>

                <input
                  type="radio"
                  name="payment"
                />

                Credit / Debit Card

              </label>

              <label>

                <input
                  type="radio"
                  name="payment"
                />

                UPI

              </label>

            </div>

          </div>

          <div className="checkout-right">

            <div className="summary-box">

              <h2>

                Order Summary

              </h2>

              {

                cartItems.map((item) => (

                  <div

                    className="summary-item"

                    key={`${item.id}-${item.size}`}

                  >

                    <span>

                      {item.name}

                    </span>

                    <span>

                      {item.quantity} × {item.price}

                    </span>

                  </div>

                ))

              }

              <hr />

              <div className="summary-row">

                <span>

                  Subtotal

                </span>

                <span>

                  ₹{subtotal}

                </span>

              </div>

              <div className="summary-row">

                <span>

                  Shipping

                </span>

                <span>

                  ₹{shipping}

                </span>

              </div>

              <div className="summary-row total">

                <span>

                  Total

                </span>

                <span>

                  ₹{total}

                </span>

              </div>

              <button

                className="checkout-btn"

              >

                Place Order

              </button>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default Checkout;