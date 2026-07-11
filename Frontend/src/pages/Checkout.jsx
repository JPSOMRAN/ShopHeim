import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


import useCart from "../hooks/useCart";

import "../styles/Checkout.css";

function Checkout() {

  const navigate = useNavigate();

  const API = "https://shopheim.onrender.com";

  const {

    cartItems,

    clearCart,

  } = useCart();

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(

    "Cash On Delivery"

  );

  const [shippingAddress, setShippingAddress] = useState({

    fullName: "",

    email: "",

    phone: "",

    address: "",

  });

  // =====================================
  // Load Logged In User
  // =====================================

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {

          navigate("/login");

          return;

        }

        const { data } = await axios.get(

          `${API}/api/auth/profile`,

          {

            headers: {

              Authorization: `Bearer ${token}`,

            },

          }

        );

        setShippingAddress({

          fullName: data.name || "",

          email: data.email || "",

          phone: data.phone || "",

          address: data.address || "",

        });

      }

      catch (error) {

        console.log(error);

      }

    };

    fetchUser();

  }, [navigate]);

  // =====================================
  // Price Calculation
  // =====================================

  const itemsPrice = cartItems.reduce(

  (total, item) =>

    total +

    Number(

      String(item.price).replace("₹", "")

    ) *

    item.quantity,

  0

);

  const shippingPrice =

    cartItems.length > 0

      ? 99

      : 0;

  const totalPrice =

    itemsPrice +

    shippingPrice;

      // =====================================
  // Place Order
  // =====================================

  const handlePlaceOrder = async () => {

    if (cartItems.length === 0) {

      toast.error("Your cart is empty");

      return;

    }

    if (

      !shippingAddress.fullName ||

      !shippingAddress.email ||

      !shippingAddress.phone ||

      !shippingAddress.address

    ) {

      toast.error("Please fill all shipping details");

      return;

    }

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const products = cartItems.map((item) => ({

        product: item._id,

        name: item.name,

        image: item.image,

        price: Number(item.price),

        quantity: item.quantity,

        size: item.size,

      }));

      const { data } = await axios.post(

        `${API}/api/orders`,

        {

          products,

          shippingAddress,

          paymentMethod,

          itemsPrice,

          shippingPrice,

          totalPrice,

        },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      toast.success(data.message);

      clearCart();

      navigate("/orders");

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Order Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

    return (

    <>

    

      <div className="checkout-page">

        <div className="checkout-container">

          {/* =======================================
              LEFT
          ======================================= */}

          <div className="checkout-left">

            <h1>

              Checkout

            </h1>

            {/* Shipping */}

            <div className="checkout-card">

              <h2>

                Shipping Address

              </h2>

              <input
                type="text"
                placeholder="Full Name"
                value={shippingAddress.fullName}
                onChange={(e)=>
                  setShippingAddress({
                    ...shippingAddress,
                    fullName:e.target.value,
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                value={shippingAddress.email}
                onChange={(e)=>
                  setShippingAddress({
                    ...shippingAddress,
                    email:e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={shippingAddress.phone}
                onChange={(e)=>
                  setShippingAddress({
                    ...shippingAddress,
                    phone:e.target.value,
                  })
                }
              />

              <textarea
                rows="5"
                placeholder="Complete Address"
                value={shippingAddress.address}
                onChange={(e)=>
                  setShippingAddress({
                    ...shippingAddress,
                    address:e.target.value,
                  })
                }
              />

            </div>

            {/* Payment */}

            <div className="checkout-card">

              <h2>

                Payment Method

              </h2>

              <label>

                <input
                  type="radio"
                  checked={
                    paymentMethod==="Cash On Delivery"
                  }
                  onChange={()=>
                    setPaymentMethod(
                      "Cash On Delivery"
                    )
                  }
                />

                Cash On Delivery

              </label>

              <label>

                <input
                  type="radio"
                  checked={
                    paymentMethod==="Credit / Debit Card"
                  }
                  onChange={()=>
                    setPaymentMethod(
                      "Credit / Debit Card"
                    )
                  }
                />

                Credit / Debit Card

              </label>

              <label>

                <input
                  type="radio"
                  checked={
                    paymentMethod==="UPI"
                  }
                  onChange={()=>
                    setPaymentMethod(
                      "UPI"
                    )
                  }
                />

                UPI

              </label>

            </div>

          </div>

          {/* =======================================
              RIGHT
          ======================================= */}

          <div className="checkout-right">

            <div className="summary-box">

              <h2>

                Order Summary

              </h2>

              {

                cartItems.map((item)=>(

                  <div
                    className="summary-item"
                    key={`${item._id}-${item.size}`}
                  >

                    <span>

                      {item.name}

                    </span>

                    <span>

                      {item.quantity}

                      {" × "}

                      ₹{item.price}

                    </span>

                  </div>

                ))

              }

              <hr/>

              <div className="summary-row">

                <span>

                  Items

                </span>

                <span>

                  ₹{itemsPrice}

                </span>

              </div>

              <div className="summary-row">

                <span>

                  Shipping

                </span>

                <span>

                  ₹{shippingPrice}

                </span>

              </div>

              <div className="summary-row total">

                <span>

                  Total

                </span>

                <span>

                  ₹{totalPrice}

                </span>

              </div>

              <button
                className="checkout-btn"
                disabled={loading}
                onClick={handlePlaceOrder}
              >

                {

                  loading

                    ? "Placing Order..."

                    : "Place Order"

                }

              </button>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default Checkout;