import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


import "../styles/Account.css";

function Account() {

  const navigate = useNavigate();

  // ==========================
  // Backend URL
  // ==========================

  const API = "http://localhost:5000";

  // ==========================
  // States
  // ==========================

  const [user, setUser] = useState({

    name: "",

    email: "",

    phone: "",

    address: "",

    avatar: "",

  });

  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);

  const [saving, setSaving] = useState(false);

  // ==========================
  // Fetch Profile
  // ==========================

  useEffect(() => {

    const fetchProfile = async () => {

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

        setUser(data);

      }

      catch (error) {

        console.error(error);

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login");

      }

      finally {

        setLoading(false);

      }

    };

    fetchProfile();

  }, [navigate]);
    // ==========================
  // Upload Profile Image
  // ==========================

  const handleImageUpload = async (e) => {

    try {

      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("image", file);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(

        `${API}/api/upload`,

        formData,

        {

          headers: {

            Authorization: `Bearer ${token}`,

            "Content-Type": "multipart/form-data",

          },

        }

      );

      setUser((prev) => ({

        ...prev,

        avatar: `${API}${data.image}`,

      }));

      toast.success("Profile image uploaded successfully");

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Image upload failed"

      );

    }

  };

  // ==========================
  // Save Profile
  // ==========================

  const handleSave = async () => {

    try {

      setSaving(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.put(

        `${API}/api/auth/profile`,

        {

          name: user.name,

          phone: user.phone,

          address: user.address,

          avatar: user.avatar,

        },

        {

          headers: {

            Authorization: `Bearer ${token}`,

          },

        }

      );

      setUser(data);

      setEditing(false);

      toast.success("Profile Updated Successfully");

    }

    catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Profile Update Failed"

      );

    }

    finally {

      setSaving(false);

    }

  };

  // ==========================
  // Logout
  // ==========================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logged Out Successfully");

    navigate("/login");

  };

  // ==========================
  // Loading Screen
  // ==========================

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

          Loading Profile...

        </div>

      </>

    );

  }

  return (

    <>

     

      <section className="account-page">

        <div className="account-card">
                    {/* ==========================
              Profile Image
          ========================== */}

          <img
            src={
              user.avatar
                ? user.avatar.startsWith("http")
                  ? user.avatar
                  : `${API}${user.avatar}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.name
                  )}&background=d4af37&color=fff&size=200`
            }
            alt="Profile"
            className="profile-image"
          />

          {/* ==========================
              Name
          ========================== */}

          {editing ? (

            <input
              className="account-input"
              type="text"
              value={user.name}
              placeholder="Full Name"
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
            />

          ) : (

            <h2>{user.name}</h2>

          )}

          {/* ==========================
              Email
          ========================== */}

          <p>{user.email}</p>

          {/* ==========================
              Account Details
          ========================== */}

          <div className="account-info">

            {/* Phone */}

            <div>

              <strong>Phone Number</strong>

              {editing ? (

                <input
                  className="account-input"
                  type="text"
                  placeholder="Enter Phone Number"
                  value={user.phone}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      phone: e.target.value,
                    })
                  }
                />

              ) : (

                <p>{user.phone || "Not Added"}</p>

              )}

            </div>

            {/* Address */}

            <div>

              <strong>Address</strong>

              {editing ? (

                <textarea
                  className="account-input"
                  rows="3"
                  placeholder="Enter Address"
                  value={user.address}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: e.target.value,
                    })
                  }
                />

              ) : (

                <p>{user.address || "Not Added"}</p>

              )}

            </div>

            {/* Upload Profile Image */}

            {editing && (

              <div>

                <strong>Profile Picture</strong>

                <input
                  className="account-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleImageUpload}
                />

                <small
                  style={{
                    color: "#9ca3af",
                    display: "block",
                    marginTop: "10px",
                  }}
                >
                  JPG, PNG or WEBP (Max 2 MB)
                </small>

              </div>

            )}

          </div>

          {/* ==========================
              Buttons
          ========================== */}

          <div className="account-buttons">

            {editing ? (

              <>

                <button
                  className="save-btn"
                  disabled={saving}
                  onClick={handleSave}
                >

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

                <button
                  className="cancel-btn"
                  disabled={saving}
                  onClick={() =>
                    setEditing(false)
                  }
                >

                  Cancel

                </button>

              </>

            ) : (

              <button
                className="edit-btn"
                onClick={() =>
                  setEditing(true)
                }
              >

                Edit Profile

              </button>

            )}

            <button
              className="logout-btn"
              onClick={handleLogout}
            >

              Logout

            </button>

          </div>
                  </div>

      </section>

    </>

  );

}

export default Account;