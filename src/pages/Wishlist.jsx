import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;

    const allWishlists = JSON.parse(localStorage.getItem("userWishlistData")) || {};
    const userWishlist = allWishlists[user.email] || [];
    setWishlist(userWishlist);
  }, [user]);


  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);

    const allWishlists = JSON.parse(localStorage.getItem('userWishlistData')) || {};
    allWishlists[user.email] = updated;
    localStorage.setItem('userWishlistData', JSON.stringify(allWishlists));
  };

  return (
    <Container className="py-4">
      <Row className="align-items-center justify-content-between mb-4">
        <Col xs="auto">
          <h2 className="text-dark mb-0">My Wishlist</h2>
        </Col>
        <Col xs="auto">
          <Button variant="warning" className="fw-bold">
            Items: {wishlist.length}
          </Button>
        </Col>
      </Row>

      <Row>
        {wishlist.length === 0 ? (
          <p className="text-dark">No items in wishlist.</p>
        ) : (
          wishlist.map(item => (
            <Col md={4} key={item.id} className="mb-4">
              <ProductCard
                product={item}
                fromWishlist={true}
                removeFromWishlist={removeFromWishlist}
              />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default Wishlist;




