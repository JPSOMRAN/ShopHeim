import { useNavigate } from "react-router-dom";



import "../styles/Admin.css";

function AdminDashboard() {

  const navigate = useNavigate();

  return (

    <>

    

      <section className="admin-page">

        <div className="admin-container">

          <h1>

            Admin Dashboard

          </h1>

          <p className="admin-subtitle">

            Manage your ShopHeim store from one place.

          </p>

          <div className="admin-grid">

            <div
              className="admin-card"
              onClick={() => navigate("/admin/products")}
            >

              <h2>📦</h2>

              <h3>Products</h3>

              <p>

                Add, edit and delete products.

              </p>

            </div>

            <div
              className="admin-card"
              onClick={() => navigate("/admin/orders")}
            >

              <h2>🛒</h2>

              <h3>Orders</h3>

              <p>

                Manage customer orders.

              </p>

            </div>

            <div
              className="admin-card"
              onClick={() => navigate("/admin/users")}
            >

              <h2>👥</h2>

              <h3>Users</h3>

              <p>

                View all registered users.

              </p>

            </div>

            <div
              className="admin-card"
              onClick={() => navigate("/")}
            >

              <h2>🏠</h2>

              <h3>Store</h3>

              <p>

                Go back to ShopHeim.

              </p>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}

export default AdminDashboard;