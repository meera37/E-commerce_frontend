import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user?.email) return;

    const allCarts = JSON.parse(localStorage.getItem("userCartData")) || {};
    const userCart = allCarts[user.email] || [];
    setCart(userCart);
  }, [user]);


  const removeFromCart = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);

    const allCarts = JSON.parse(localStorage.getItem("userCartData")) || {};
    allCarts[user.email] = updated;
    localStorage.setItem("userCartData", JSON.stringify(allCarts));
  };

  const emptyCart = () => {
    setCart([]);

    const allCarts = JSON.parse(localStorage.getItem("userCartData")) || {};
    allCarts[user.email] = [];
    localStorage.setItem("userCartData", JSON.stringify(allCarts));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">My Cart</h2>
      </div>

      {cart.length === 0 ? (
        <p className="text-dark">Your cart is empty.</p>
      ) : (
        <Row>
          <Col md={8}>
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        width="50"
                        height="50"
                        style={{ objectFit: 'cover' }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="text-center my-3">
              <Button variant="danger" onClick={emptyCart}>
                Empty Cart
              </Button>
            </div>
          </Col>

          <Col md={4}>
            <div className="bg-black text-white rounded p-4">
              <h5>Cart Summary</h5>
              <p>Total Items: {cart.length}</p>
              <p>Total Price: ₹{totalPrice}</p>
              <Button variant="success" block onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Cart;


