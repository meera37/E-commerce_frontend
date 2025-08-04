import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faRightFromBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [user, setUser] = useState(() => JSON.parse(sessionStorage.getItem("user")));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
  }, [location]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    navigate("/auth");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <FontAwesomeIcon icon={faCartShopping}/>
          <span className="fw-bold fs-4 text-light">ShopEase</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto ms-3">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/offers">Offer Zone</Nav.Link>
            <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
            <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/user/orders">My Orders</Nav.Link>
            )}
          </Nav>

          <Nav>
            {user ? (
              <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <FontAwesomeIcon icon={faRightFromBracket} className="me-1" />
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/auth">
                <FontAwesomeIcon icon={faRightToBracket} className="me-1" />
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;


