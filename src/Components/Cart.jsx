import { useEffect, useState } from "react";
<<<<<<< HEAD
import { useLocation, useNavigate } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

=======
import {useLocation,useNavigate } from "react-router-dom";
function Cart() {
  const [cart, setCart] = useState([]);
   const navigate = useNavigate();
>>>>>>> 070efdff25ed491fc63ae7506b9dacfe4d69462e
  // Load cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Remove an item from cart
  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <div>
              <strong>{item.title}</strong> - ${item.price}
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                backgroundColor: "#ff4d4f",
                color: "#fff",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div> 
        ))
      )}
<<<<<<< HEAD
       <button className="btn btn-primary mt-6" onClick={() => navigate("/productList")}>Go Home</button>
=======
      <button className="btn btn-primary mt-6" onClick={() => navigate("/productList")}>Go Home</button>
>>>>>>> 070efdff25ed491fc63ae7506b9dacfe4d69462e
    </div>
  );
}

export default Cart;
