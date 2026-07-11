import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";



import "../styles/Orders.css";

function Orders() {

  const navigate = useNavigate();

  const API = "https://shopheim.onrender.com";

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Orders
  // ==========================

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const token = localStorage.getItem("token");

        if (!token) {

          navigate("/login");

          return;

        }

        const { data } = await axios.get(

          `${API}/api/orders/myorders`,

          {

            headers: {

              Authorization: `Bearer ${token}`,

            },

          }

        );

        setOrders(data.orders);

      }

      catch (error) {

        console.log(error);

        toast.error("Unable to load orders");

      }

      finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, [navigate]);

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

          Loading Orders...

        </div>

      </>

    );

  }

  return (

    <>

     

      <section className="orders-page">

        <h1>

          My Orders

        </h1>

        {

          orders.length === 0 ?

          (

            <div className="empty-orders">

              <h2>

                No Orders Yet

              </h2>

              <p>

                Start shopping to place your first order.

              </p>

              <button

                className="view-btn"

                onClick={() => navigate("/")}

              >

                Continue Shopping

              </button>

            </div>

          )

          :

          (

            <div className="orders-container">

              {

                orders.map((order) => (

                  <div

                    className="order-card"

                    key={order._id}

                  >

                    <div className="order-top">

                      <div>

                        <h3>

                          Order #

                          {order._id.slice(-6)}

                        </h3>

                        <p>

                          {

                            new Date(

                              order.createdAt

                            ).toLocaleDateString()

                          }

                        </p>

                      </div>

                      <span

                        className={`status ${order.orderStatus
                          .toLowerCase()
                          .replaceAll(" ", "-")}`}

                      >

                        {order.orderStatus}

                      </span>

                    </div>

                    <div className="order-middle">

                      <div>

                        <strong>

                          Products

                        </strong>

                        <p>

                          {order.products.length}

                        </p>

                      </div>

                      <div>

                        <strong>

                          Payment

                        </strong>

                        <p>

                          {order.paymentMethod}

                        </p>

                      </div>

                      <div>

                        <strong>

                          Total

                        </strong>

                        <p>

                          ₹{order.totalPrice}

                        </p>

                      </div>

                    </div>

                    <div className="order-bottom">

                      <button

                        className="view-btn"

                        onClick={() =>

                          navigate(

                            `/orders/${order._id}`

                          )

                        }

                      >

                        View Details

                      </button>

                      {

                        order.orderStatus === "Pending" && (

                          <button

                            className="cancel-btn"

                          >

                            Cancel Order

                          </button>

                        )

                      }

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

export default Orders;