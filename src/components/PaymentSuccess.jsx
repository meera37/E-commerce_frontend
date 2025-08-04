import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const user = JSON.parse(sessionStorage.getItem("user"));

    const newOrder = {
      id: Date.now(), 
      userEmail: user?.email || "",
      orderDate: new Date().toISOString(),
      status: "Pending",
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    localStorage.removeItem("cart");

    setTimeout(() => {
      navigate("/user/orders");
    }, 3000);
  }, [navigate]);

  return (
    <Container className="text-center mt-5 mb-2">
      <h2 className="text-success"> Payment Successful!</h2>
      <p>Thank you for your purchase. We hope to see you again soon.</p>
      <img src="https://i.pinimg.com/originals/48/a2/93/48a293976e2c10478e2eebf754ee8d25.gif" alt="success" style={{ maxWidth: '400px' }} />
      <div className="mt-4">
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </Container>
  );
}

export default PaymentSuccess;
