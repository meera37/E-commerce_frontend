import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function PaymentError() {
  return (
    <Container className="text-center mt-5 mb-2">
      <h2 className="text-danger"> Payment Failed!</h2>
      <p>Please try again later. We're here to help.</p>
      <img src="https://i.pinimg.com/originals/9d/16/7e/9d167e72839894c971c90f60ab00d916.gif" alt="failed" style={{ maxWidth: '400px' }} />
      <div className="mt-4">
        <Link to="/cart">
          <Button variant="warning">Back to Cart</Button>
        </Link>
      </div>
    </Container>
  );
}

export default PaymentError;
