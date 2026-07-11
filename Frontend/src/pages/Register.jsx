import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import "../styles/Auth.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      alert("Please fill all fields");

      return;

    }

    if (password !== confirmPassword) {

      alert("Passwords do not match");

      return;

    }

    try {

      const { data } = await axios.post(
        "https://shopheim.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      alert("Registration Successful");

      navigate("/account");

    }

    catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <>


      <div className="auth-page">

        <form
          className="auth-box"
          onSubmit={handleRegister}
        >

          <h1>Register</h1>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />

          <button type="submit">
            Create Account
          </button>

          <p>

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </form>

      </div>

    </>

  );

}

export default Register;