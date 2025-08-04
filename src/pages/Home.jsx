import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Dropdown, Alert } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

function Home() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();

        const localData = JSON.parse(localStorage.getItem("products")) || [];

        const combinedProducts = [...data.products, ...localData];

        setProducts(combinedProducts);
        setDisplayedProducts(combinedProducts);

        const uniqueCategories = ['All', ...new Set(combinedProducts.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Filter & Sort
  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setDisplayedProducts(filtered);
  }, [selectedCategory, sortOrder, products]);

  return (
    <Container className="mt-4 text-dark">
      <img
        //src="https://img.freepik.com/premium-photo/black-friday-sale-banner-design-shopping-cart-gift-box-with-paper-bag-black-background-3d-render_46250-3719.jpg"
        src="https://marketplace.canva.com/EAGHC5NUD-Q/1/0/1600w/canva-black-and-white-modern-fashion-sale-banner-landscape-n7GVeIDu0Tg.jpg"
        alt="hero"
        className="img-fluid mb-4 rounded shadow"
      />

      <h2 className="mb-4 ">Shop All Products</h2>

      <Row className="mb-3 align-items-center">
        <Col xs={12} lg={9} className="mb-2">
          {categories.map(cat => (

            <Button
              key={cat}
              variant={cat === selectedCategory ? 'dark' : 'outline-dark'}
              size="sm"
              className="me-2 mb-2"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>

          ))}
        </Col>
        <Col xs={12} lg={3} className="text-lg-end">
          <Dropdown>
            <Dropdown.Toggle variant="dark" size="sm" className="w-100 w-lg-auto">
              Sort by Price
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortOrder('asc')}>Low to High</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOrder('desc')}>High to Low</Dropdown.Item>
              <Dropdown.Item onClick={() => setSortOrder('')}>None</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>

      {displayedProducts.length === 0 ? (
        <Alert variant="warning">No products found.</Alert>
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 mb-3">
          {displayedProducts.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} showWishlistIcon={true} />


            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
