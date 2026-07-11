import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


import "../styles/OrderDetails.css";

function OrderDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const API = "https://shopheim.onrender.com";

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchOrder = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {

          navigate("/login");

          return;

        }

        const { data } = await axios.get(

          `${API}/api/orders/${id}`,

          {

            headers: {

              Authorization: `Bearer ${token}`,

            },

          }

        );

        setOrder(data.order);

      }

      catch (error) {

        console.log(error);

        toast.error("Unable to load order.");

      }

      finally {

        setLoading(false);

      }

    };

    fetchOrder();

  }, [id, navigate]);

  if (loading) {

    return (

      <>

      

        <div
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "150px",
            fontSize: "24px",
          }}
        >

          Loading Order...

        </div>

      </>

    );

  }

  if (!order) {

    return (

      <>

     

        <h2
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "150px",
          }}
        >

          Order Not Found

        </h2>

      </>

    );

  }

  return (

    <>

      

      <section className="order-details-page">

        <div className="order-details-container">

          <h1>

            Order Details

          </h1>

          <div className="order-summary">

            <div>

              <strong>Order ID</strong>

              <p>{order._id}</p>

            </div>

            <div>

              <strong>Status</strong>

              <span className={`status ${order.orderStatus.toLowerCase().replaceAll(" ","-")}`}>

                {order.orderStatus}

              </span>

            </div>

            <div>

              <strong>Payment</strong>

              <p>{order.paymentMethod}</p>

            </div>

                     <div>

              <strong>Total Amount</strong>

              <p>

                ₹{order.totalPrice}

              </p>

            </div>

          </div>

          {/* ==========================
              Products
          ========================== */}

          <div className="products-section">

            <h2>

              Ordered Products

            </h2>

            {

              order.products.map((item) => (

                <div

                  className="ordered-product"

                  key={item.product}

                >

                  <img

                    src={`$https://shopheim.onrender.com{item.image}`}

                    alt={item.name}

                  />

                  <div>

                    <h3>

                      {item.name}

                    </h3>

                    <p>

                      Price : ₹{item.price}

                    </p>

                    <p>

                      Quantity : {item.quantity}

                    </p>

                    <p>

                      Size : {item.size}

                    </p>

                  </div>

                </div>

              ))

            }

          </div>

          {/* ==========================
              Shipping Address
          ========================== */}

          <div className="shipping-box">

            <h2>

              Shipping Address

            </h2>

            <p>

              <strong>Name :</strong>{" "}

              {order.shippingAddress.fullName}

            </p>

            <p>

              <strong>Email :</strong>{" "}

              {order.shippingAddress.email}

            </p>

            <p>

              <strong>Phone :</strong>{" "}

              {order.shippingAddress.phone}

            </p>

            <p>

              <strong>Address :</strong>{" "}

              {order.shippingAddress.address}

            </p>

          </div>

          <button

            className="back-btn"

            onClick={() => navigate("/orders")}

          >

            Back To Orders

          </button>

        </div>

      </section>

    </>

  );

}

export default OrderDetails;