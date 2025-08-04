import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ProductCard({
  product,
  fromWishlist = false,
  removeFromWishlist,
  showWishlistIcon = true,
  showCartIcon = true
}) {
  const [isWished, setIsWished] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user"));

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return;

    const allWishlists = JSON.parse(localStorage.getItem('userWishlistData')) || {};
    const userWishlist = allWishlists[user.email] || [];
    const found = userWishlist.find(item => item.id === product.id);
    if (found) setIsWished(true);
  }, [product, user]);

  const handleWishlist = () => {
    if (!user) {
      alert("Please login to add to wishlist.");
      navigate('/auth')
      return;
    }

    const allWishlists = JSON.parse(localStorage.getItem("userWishlistData")) || {};
    const userWishlist = allWishlists[user.email] || [];

    const exists = userWishlist.find(item => item.id === product.id);
    let updatedWishlist;

    if (exists) {
      updatedWishlist = userWishlist.filter(item => item.id !== product.id);
      toast.info('Removed from wishlist');
      setIsWished(false);

      if (fromWishlist && typeof removeFromWishlist === 'function') {
        removeFromWishlist(product.id);
      }
    } else {
      updatedWishlist = [...userWishlist, product];
      toast.success('Added to wishlist');
      setIsWished(true);
    }

    allWishlists[user.email] = updatedWishlist;
    localStorage.setItem("userWishlistData", JSON.stringify(allWishlists));
  };

  const addToCart = () => {
    if (!user) {
      alert("Please login to add to cart.");
      navigate('/auth')
      return;
    }

    const allCarts = JSON.parse(localStorage.getItem("userCartData")) || {};
    const userCart = allCarts[user.email] || [];

    const exists = userCart.find(item => item.id === product.id);
    if (exists) {
      toast.info("Already in cart!");
      return;
    }

    const updatedCart = [...userCart, product];
    allCarts[user.email] = updatedCart;
    localStorage.setItem("userCartData", JSON.stringify(allCarts));
    toast.success("Added to cart");
  };


  return (
    <Card
      className="h-100 text-light border-0 d-flex flex-column justify-content-between"
      style={{ backgroundColor: '#000' }}
    >
      <Card.Img
        variant="top"
        src={product.thumbnail}
        alt={product.title}
        style={{
          height: '200px',
          objectFit: 'contain',
          backgroundColor: '#000',
        }}
      />

      <Card.Body className="d-flex flex-column justify-content-between">
        <div style={{ marginBottom: '0.75rem' }}>
          <Card.Title className="fw-bold mb-1">{product.title}</Card.Title>
          <Card.Text className="mb-1">
            Price: <span className="text-warning">₹{product.price}</span>
          </Card.Text>
          <Card.Text className="text-capitalize mb-1">
            Category: {product.category}
          </Card.Text>
          {product.discountPercentage > 0 && (
            <Card.Text className="text-success fw-semibold mb-0">
              {product.discountPercentage}% Off
            </Card.Text>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-auto">
          {showWishlistIcon && (
            <FontAwesomeIcon
              icon={faHeart}
              onClick={handleWishlist}
              style={{
                fontSize: '1.3rem',
                cursor: 'pointer',
                color: isWished ? '#8B0000' : '#FB8500',
              }}
              title={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
            />
          )}

          {showCartIcon && (
            <Button
              variant="light"
              className="text-dark fw-semibold px-3"
              style={{
                backgroundColor: '#FB8500',
                border: 'none',
                fontSize: '0.9rem',
              }}
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;

