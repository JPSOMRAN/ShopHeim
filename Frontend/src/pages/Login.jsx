import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const { data } = await axios.post(
        "https://shopheim.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      alert("Login Successful");

      navigate("/account");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="auth-page">

      <form
        className="auth-box"
        onSubmit={handleLogin}
      >

        <h1>Customer Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          LOGIN
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>

  );

}

export default Login;