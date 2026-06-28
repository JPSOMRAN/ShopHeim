import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import "../styles/Cart.css";

import useCart from "../hooks/useCart";

function Cart() {

  const navigate = useNavigate();

  const {

    cartItems,

    increaseQuantity,

    decreaseQuantity,

    removeFromCart,

    clearCart,

  } = useCart();

  const subtotal = cartItems.reduce((total, item) => {

    const price = Number(
      item.price.replace(/[^\d]/g, "")
    );

    return total + price * item.quantity;

  }, 0);

  const deliveryCharge =
    subtotal >= 3000 ? 0 : 99;

  const discount =
    subtotal >= 5000 ? 500 : 0;

  const total =
    subtotal + deliveryCharge - discount;

  const handleCheckout = () => {

    if (cartItems.length === 0) {

      toast.error("Your Cart Is Empty");

      return;

    }

    navigate("/checkout");

  };

  const handleClearCart = () => {

    clearCart();

    toast.success("Cart Cleared");

  };

  const handleRemove = (id, size) => {

    removeFromCart(id, size);

    toast.success("Item Removed");

  };

  return (

    <>

      <Navbar />

      <section className="cart-page">

        <h1>

          Shopping Cart

        </h1>

        {

          cartItems.length === 0 ?

          (

            <div className="empty-cart">

              <h2>

                Your Cart Is Empty 🛒

              </h2>

              <p>

                Add some amazing products to continue shopping.

              </p>

              <button

                className="checkout-btn"

                style={{

                  marginTop: "20px",

                  width: "250px",

                }}

                onClick={() => navigate("/")}

              >

                Continue Shopping

              </button>

            </div>

          )

          :

          (

            <div className="cart-container">

              <div className="cart-items">

                {

                  cartItems.map((item) => (

                    <div

                      key={`${item.id}-${item.size}`}

                      className="cart-card"

                    >

                      <img

                        src={item.image}

                        alt={item.name}

                      />

                      <div className="cart-info">

                        <h2>

                          {item.name}

                        </h2>

                        <p className="brand">

                          {item.brand || item.category}

                        </p>

                        <h3>

                          {item.price}

                        </h3>

                        <p className="size">

                          Size : {item.size}

                        </p>

                        <div className="quantity-box">

                          <button

                            onClick={() =>

                              decreaseQuantity(

                                item.id,

                                item.size

                              )

                            }

                          >

                            −

                          </button>

                          <span>

                            {item.quantity}

                          </span>

                          <button

                            onClick={() =>

                              increaseQuantity(

                                item.id,

                                item.size

                              )

                            }

                          >

                            +

                          </button>

                        </div>

                        <button

                          className="remove-btn"

                          onClick={() =>

                            handleRemove(

                              item.id,

                              item.size

                            )

                          }

                        >

                          Remove

                        </button>

                      </div>

                    </div>

                  ))

                }

              </div>

              <div className="summary-box">

                <h2>

                  Order Summary

                </h2>

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

                    Delivery

                  </span>

                  <span>

                    {

                      deliveryCharge === 0

                        ?

                        "FREE"

                        :

                        `₹${deliveryCharge}`

                    }

                  </span>

                </div>

                <div className="summary-row">

                  <span>

                    Discount

                  </span>

                  <span>

                    -₹{discount}

                  </span>

                </div>

                <hr />

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

                  onClick={handleCheckout}

                >

                  Proceed To Checkout

                </button>

                <button

                  className="remove-btn"

                  style={{

                    width: "100%",

                    marginTop: "15px",

                  }}

                  onClick={handleClearCart}

                >

                  Clear Cart

                </button>

              </div>

            </div>

          )

        }

      </section>

    </>

  );

}

export default Cart;