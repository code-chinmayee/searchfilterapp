import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRoute from "./Components/AdminRoute";
import ProductList from "./Components/ProductList";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import AdminDashboard from "./Components/AdminDashboard";
import ProductCarousel from "./Components/ProductCarousel";

import "./App.css"; // make sure App.css is in src/

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [itemsPerSlide, setItemsPerSlide] = useState(5);

  // Load user from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Dark mode toggle
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
  }, [darkMode]);

  // Login / Logout
  const handleLogin = (email, password) => {
    if (!email || !password) return false;
    const role = email.toLowerCase().includes("admin") ? "admin" : "user";
    const loggedUser = { email, role };
    localStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    return true;
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    setWishlist([]);
  };

  // Cart functions
  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, amount) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  const removeFromCart = (id) => setCart(cart.filter(item => item.id !== id));

  const toggleWishlist = (product) => {
    const exists = wishlist.find((item) => item.id === product.id);
    exists
      ? setWishlist(wishlist.filter(item => item.id !== product.id))
      : setWishlist([...wishlist, product]);
  };

  // Fetch carousel products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then(res => res.json())
      .then(data => setCarouselProducts(data.products));
  }, []);

  // Responsive items per slide
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 576) setItemsPerSlide(1);
      else if (window.innerWidth < 768) setItemsPerSlide(2);
      else if (window.innerWidth < 992) setItemsPerSlide(3);
      else if (window.innerWidth < 1200) setItemsPerSlide(4);
      else setItemsPerSlide(5);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  return (
    <Router>
      {user && (
        <Navbar
          user={user}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/products" /> : <Login handleLogin={handleLogin} />}
        />

        {/* Products page */}
        <Route
          path="/products"
          element={
            <ProtectedRoute user={user}>
              <div className="container">
                <h1 className="page-title text-center mt-3">Our Products</h1>

                {/* Product Carousel */}
                <ProductCarousel
                  products={carouselProducts}
                  itemsPerSlide={itemsPerSlide}
                />

                {/* Product list below carousel */}
                <ProductList addToCart={addToCart} />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute user={user}>
              <ProductDetail
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <Cart
                cart={cart}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
