import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

function Filters({ selectedCategory, setSelectedCategory, sortOrder, setSortOrder, categories }) {
  return (
    <Row className="mb-4">
      <Col md={6}>
        <Form.Group controlId="categoryFilter">
          <Form.Label>Filter by Category</Form.Label>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group controlId="sortPrice">
          <Form.Label>Sort by Price</Form.Label>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default Filters;
