import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 shadow-sm border-top border-secondary mt-auto">
      <Container className="text-center">
        <p className="mb-0 fw-semibold fs-6">&copy; 2025 ShopEase. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
