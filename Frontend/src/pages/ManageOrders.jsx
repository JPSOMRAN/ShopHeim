import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



import "../styles/ManageOrders.css";

function ManageOrders() {

  const API = "https://shopheim.onrender.com";

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ==========================
  // Fetch Orders
  // ==========================

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await axios.get(

        `${API}/api/orders`,

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

  useEffect(() => {
  const loadOrders = async () => {
    await fetchOrders();
  };

  loadOrders();
}, []);

  // ==========================
  // Update Status
  // ==========================

  const updateStatus = async (

    id,

    orderStatus

  ) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(

        `${API}/api/orders/${id}`,

        {

          orderStatus,

        },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      toast.success(

        "Order Updated"

      );

      fetchOrders();

    }

    catch (error) {

      console.log(error);

      toast.error(

        "Unable to update order"

      );

    }

  };

  // ==========================
  // Delete Order
  // ==========================

  const deleteOrder = async (id) => {

    if (

      !window.confirm(

        "Delete this order?"

      )

    ) {

      return;

    }

    try {

      const token = localStorage.getItem("token");

      await axios.delete(

        `${API}/api/orders/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      toast.success(

        "Order Deleted"

      );

      fetchOrders();

    }

    catch (error) {

      console.log(error);

      toast.error(

        "Unable to delete order"

      );

    }

  };

  // ==========================
  // Search
  // ==========================

  const filteredOrders = orders.filter(

    (order) =>

      order._id

        .toLowerCase()

        .includes(

          search.toLowerCase()

        ) ||

      order.user?.name

        ?.toLowerCase()

        .includes(

          search.toLowerCase()

        )

  );

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

    

      <section className="admin-page">

        <div className="admin-container">

          <h1>

            Manage Orders

          </h1>

          <input

            className="search-input"

            type="text"

            placeholder="Search by Order ID or Customer..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

          />

          <table className="orders-table">

            <thead>

              <tr>

                <th>Order ID</th>

                <th>Customer</th>

                <th>Total</th>

                <th>Payment</th>

                <th>Status</th>

                <th>Date</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredOrders.length === 0 ? (

                  <tr>

                    <td colSpan="7">

                      No Orders Found

                    </td>

                  </tr>

                ) : (

                  filteredOrders.map((order) => (

                    <tr key={order._id}>

                      <td>

                        {order._id.slice(-8)}

                      </td>

                      <td>

                        {order.user?.name || "Unknown"}

                      </td>

                      <td>

                        ₹{order.totalPrice}

                      </td>

                      <td>

                        {order.paymentMethod}

                      </td>

                      <td>

                        <select

                          value={order.orderStatus}

                          onChange={(e) =>

                            updateStatus(

                              order._id,

                              e.target.value

                            )

                          }

                        >

                          <option>

                            Pending

                          </option>

                          <option>

                            Confirmed

                          </option>

                          <option>

                            Packed

                          </option>

                          <option>

                            Shipped

                          </option>

                          <option>

                            Out For Delivery

                          </option>

                          <option>

                            Delivered

                          </option>

                          <option>

                            Cancelled

                          </option>

                        </select>

                      </td>

                      <td>

                        {

                          new Date(

                            order.createdAt

                          ).toLocaleDateString()

                        }

                      </td>

                      <td>

                        <button

                          className="delete-btn"

                          onClick={() =>

                            deleteOrder(

                              order._id

                            )

                          }

                        >

                          Delete

                        </button>

                      </td>

                    </tr>

                  ))

                )

              }

            </tbody>

          </table>

        </div>

      </section>

    </>

  );

}

export default ManageOrders;
