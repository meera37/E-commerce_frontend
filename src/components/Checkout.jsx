import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

function Checkout() {
  const navigate = useNavigate();

  const handlePayment = (success) => {
    setTimeout(() => {
      if (success) navigate('/payment-success');
      else navigate('/payment-error');
    }, 1000);
  };

  return (
    <Container className="mt-5 text-center">
      <h2>Checkout</h2>
      <p>Simulate your payment below:</p>
      <div className="d-flex justify-content-center gap-3 mt-4 mb-2">
        <Button variant="success" onClick={() => handlePayment(true)}> Success</Button>
        <Button variant="danger" onClick={() => handlePayment(false)}> Failure</Button>
      </div>
    </Container>
  );
}

export default Checkout;
