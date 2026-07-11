import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";



import "../styles/ManageUsers.css";

function ManageUsers() {

  const API = "https://shopheim.onrender.com";

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ==========================
  // Fetch Users
  // ==========================

  const fetchUsers = async () => {

    try {

      const token = localStorage.getItem("token");

      const { data } = await axios.get(

        `${API}/api/users`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      setUsers(data.users);

    }

    catch (error) {

      console.log(error);

      toast.error("Unable to load users");

    }

    finally {

      setLoading(false);

    }

  };

useEffect(() => {
  const loadUsers = async () => {
    await fetchUsers();
  };

  loadUsers();
}, []);
  // ==========================
  // Delete User
  // ==========================

  const deleteUser = async (id) => {

    if (

      !window.confirm(

        "Delete this user?"

      )

    ) {

      return;

    }

    try {

      const token = localStorage.getItem("token");

      await axios.delete(

        `${API}/api/users/${id}`,

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      toast.success("User Deleted");

      fetchUsers();

    }

    catch (error) {

      console.log(error);

      toast.error("Unable to delete user");

    }

  };

  // ==========================
  // Search
  // ==========================

  const filteredUsers = users.filter(

    (user) =>

      user.name

        .toLowerCase()

        .includes(

          search.toLowerCase()

        ) ||

      user.email

        .toLowerCase()

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

          Loading Users...

        </div>

      </>

    );

  }
    return (

    <>

   

      <section className="admin-page">

        <div className="admin-container">

          <h1>

            Manage Users

          </h1>

          <input

            className="search-input"

            type="text"

            placeholder="Search Users..."

            value={search}

            onChange={(e) =>

              setSearch(e.target.value)

            }

          />

          <table className="users-table">

            <thead>

              <tr>

                <th>Avatar</th>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Role</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredUsers.length === 0 ? (

                  <tr>

                    <td colSpan="6">

                      No Users Found

                    </td>

                  </tr>

                ) : (

                  filteredUsers.map((user) => (

                    <tr key={user._id}>

                      <td>

                        <img

                          src={

                            user.avatar

                              ? `${API}${user.avatar}`

                              : "https://placehold.co/50x50"

                          }

                          alt={user.name}

                          className="table-image"

                        />

                      </td>

                      <td>

                        {user.name}

                      </td>

                      <td>

                        {user.email}

                      </td>

                      <td>

                        {user.phone || "-"}

                      </td>

                      <td>

                        {user.isAdmin ? (

                          <span className="admin-badge">

                            Admin

                          </span>

                        ) : (

                          <span className="user-badge">

                            User

                          </span>

                        )}

                      </td>

                      <td>

                        <button

                          className="delete-btn"

                          disabled={user.isAdmin}

                          onClick={() =>

                            deleteUser(user._id)

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

export default ManageUsers;