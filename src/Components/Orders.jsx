import { useContext } from "react";
import { AppContext } from "../App";

function Orders() {
  const { orders } = useContext(AppContext);

  return (
    <div className="page">
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id} className="order">
          <h4>Order #{order.id}</h4>
          {order.items.map(item => (
            <p key={item.id}>{item.title}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
