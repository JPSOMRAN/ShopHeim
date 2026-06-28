import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/Auth.css";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!email || !password) {

      alert("Please fill all fields");

      return;

    }

    alert("Backend Login Coming Next");

    navigate("/account");

  };

  return (

    <>

      <Navbar />

      <div className="auth-page">

        <form

          className="auth-box"

          onSubmit={handleLogin}

        >

          <h1>

            Login

          </h1>

          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e)=>

              setEmail(e.target.value)

            }

          />

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e)=>

              setPassword(e.target.value)

            }

          />

          <button>

            Login

          </button>

          <p>

            Don't have an account?

            <Link to="/register">

              Register

            </Link>

          </p>

        </form>

      </div>

    </>

  );

}

export default Login;