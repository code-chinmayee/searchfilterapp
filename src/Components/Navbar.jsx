import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar({ user, onLogout, darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // 🔓 LOGOUT HANDLER
  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  // Load cart count from localStorage and watch for changes
  useEffect(() => {
    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.length);
    };

    // Initial count
    updateCartCount();

    // Listen for storage changes (in case another tab changes cart)
    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* 🔥 CENTER HEADING */}
      <h1
        className="nav-title"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Search Filter App - a small shopping website.
      </h1>

      {/* RIGHT ACTIONS */}
      <div className="nav-actions" style={{ display: "flex", gap: "15px" }}>
        {/* Admin Page */}
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            style={{ padding: "5px 10px", cursor: "pointer" }}
          >
            Admin
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* Cart Badge */}
        <button
          onClick={() => navigate("/cart")}
          style={{
            position: "relative",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {cartCount}
            </span>
          )}
        </button>

        {/* 🔓 Logout */}
        {user && (
          <button
            onClick={handleLogout}
            className="logout-btn"
            style={{ padding: "5px 10px", cursor: "pointer" }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
