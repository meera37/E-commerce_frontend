import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Offers = () => {
  const [allOffers, setAllOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();

        const localProducts = JSON.parse(localStorage.getItem('products')) || [];
        const combined = [...data.products, ...localProducts];
        const discounted = combined.filter(p => Number(p.discountPercentage) >= 10);
        const uniqueCategories = ['All', ...new Set(discounted.map(p => p.category))];

        setAllOffers(discounted);
        setFilteredOffers(discounted);
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOffers();
  }, []);


  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredOffers(allOffers);
    } else {
      setFilteredOffers(allOffers.filter(p => p.category === category));
    }
  };

  return (
    <Container className="mt-4 text-dark">
      <h2 className="mb-4 fw-bold">Current Offers</h2>

      <div className="mb-4">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={cat === selectedCategory ? 'dark' : 'outline-dark'}
            size="sm"
            className="me-2 mb-2"
            onClick={() => handleFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {filteredOffers.length > 0 ? (
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4 mb-3">
          {filteredOffers.map(product => (
            <Col key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <p>No offers available.</p>
      )}
    </Container>
  );
};

export default Offers;
