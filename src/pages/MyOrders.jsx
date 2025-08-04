import React, { useEffect, useState } from 'react';

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (user?.email) {
      const userOrders = allOrders.filter(order => order.userEmail === user.email);
      setMyOrders(userOrders);
    }
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {myOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        myOrders.map(order => (
          <div key={order.id} className="border rounded p-4 mb-4 shadow-md">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Items:</strong></p>
            <ul className="list-disc list-inside">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.title || item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
            <p className="mt-2"><strong>Total:</strong> ₹{order.total}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
