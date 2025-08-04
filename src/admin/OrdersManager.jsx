import React, { useEffect, useState } from 'react';

function OrdersManager() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.id} className="border rounded p-4 mb-4 shadow-md">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User Email:</strong> {order.userEmail}</p>
            <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
            <p><strong>Items:</strong></p>
            <ul className="list-disc list-inside">
              {order.items.map((item, idx) => (
                <li key={idx}>
                  {item.title || item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
            <p className="mt-2"><strong>Total:</strong> ₹{order.total}</p>
            <label className="block mt-2">
              <strong>Status:</strong>{" "}
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="border rounded p-1 ml-2"
              >
                <option>Pending</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </label>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersManager;