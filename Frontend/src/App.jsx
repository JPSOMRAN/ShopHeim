import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";

import Men from "./pages/Men";
import Women from "./pages/Women";
import Search from "./pages/Search";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";

import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Help from "./pages/Help";

import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

import AdminDashboard from "./pages/AdminDashboard";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";
import ManageUsers from "./pages/ManageUsers";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===========================
            ALL USER PAGES
        =========================== */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/men" element={<Men />} />

          <Route path="/women" element={<Women />} />

          <Route path="/search" element={<Search />} />

          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/orders/:id" element={<OrderDetails />} />

          <Route path="/account" element={<Account />} />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/help" element={<Help />} />

          {/* AUTH PAGES NOW HAVE NAVBAR */}

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

        </Route>

        {/* ===========================
            ADMIN
        =========================== */}

        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/admin/products"
          element={<ManageProducts />}
        />

        <Route
          path="/admin/orders"
          element={<ManageOrders />}
        />

        <Route
          path="/admin/users"
          element={<ManageUsers />}
        />

        {/* ===========================
            404
        =========================== */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;