import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // 🔹 LOAD CART FROM LOCAL STORAGE
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ===============================
  // FETCH PRODUCTS
  // ===============================
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=1000000")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  // ===============================
  // SAVE CART TO LOCAL STORAGE
  // ===============================
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  // ===============================
  // SEARCH + CATEGORY FILTER
  // ===============================
  const filteredProducts = products.filter(
    (product) =>
      (category === "All" || product.category === category) &&
      product.title.toLowerCase().includes(search.toLowerCase())
  );

  // ===============================
  // ADD / UPDATE CART
  // ===============================
  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);

    if (exists) {
      // update quantity
      setCart(
        cart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      // add new item
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  // ===============================
  // REMOVE FROM CART
  // ===============================
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // ===============================
  // CART COUNT
  // ===============================
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="container">

      {/* 🛒 CART COUNT */}
      <div className="cart-count">
        🛒 Cart Items: <b>{cartCount}</b>
      </div>

      {/* 🔍 SEARCH & FILTER */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 🛍 PRODUCTS */}
      <div className="grid">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>

            <Link to={`/product/${product.id}`}>
              <button className="view-btn">View</button>
            </Link>

            <button
              className="cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* 🧾 CART LIST (REMOVE OPTION) */}
      <h3>Cart</h3>
      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.title} (x{item.qty})</span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
