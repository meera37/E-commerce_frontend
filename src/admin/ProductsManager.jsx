import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

function ProductsManager() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', image: '', price: '', category: '', offer: '' });
  const [editIndex, setEditIndex] = useState(null);

  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem('products')) || []);
    setCategories(JSON.parse(localStorage.getItem('categories')) || []);
    setOffers(JSON.parse(localStorage.getItem('offers')) || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSubmit = () => {
    const newProduct = {
      id: Date.now(),
      title: form.name,
      thumbnail: form.image,
      price: Number(form.price),
      category: form.category,
      discountPercentage: form.offer ? Number(form.offer) : 0

    };

    if (editIndex !== null) {
      const updated = [...products];
      updated[editIndex] = newProduct;
      setProducts(updated);
      setEditIndex(null);
    } else {
      setProducts([...products, newProduct]);
    }

    setForm({ name: '', image: '', price: '', category: '', offer: '' });
  };

  const handleEdit = (index) => {
    const prod = products[index];
    setForm({
      name: prod.title,
      image: prod.thumbnail,
      price: prod.price,
      category: prod.category,
      offer: prod.discountPercentage
    });
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Manage Products</h4>
      <div className="row mb-3">
        <div className="col-md-4">
          <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="form-control mb-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <input className="form-control mb-2" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />

          <select className="form-select mb-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
          </select>

          <select className="form-select mb-2" value={form.offer} onChange={(e) => setForm({ ...form, offer: e.target.value })}>
            <option value="">Select Offer</option>
            {offers.map((offer, idx) => <option key={idx} value={offer}>{offer}%</option>)}
          </select>

          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            {editIndex !== null ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>

      <div className="row">
        {products.map((prod, idx) => (
          <div key={prod.id} className="col-md-4 mb-3">
            <ProductCard product={prod} />
            <div className="mt-2">
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(idx)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(idx)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsManager;


