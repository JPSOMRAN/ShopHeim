import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/men"
          element={<Men />}
        />

        <Route
          path="/women"
          element={<Women />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/account"
          element={<Account />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/help"
          element={<Help />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;