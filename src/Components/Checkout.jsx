import { useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { placeOrder } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    placeOrder();
    navigate("/orders");
  };

  return (
    <div className="page">
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
}

export default Checkout;
