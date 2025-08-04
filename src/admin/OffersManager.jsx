import React, { useState, useEffect } from 'react';

function OffersManager() {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('offers')) || [];
    setOffers(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('offers', JSON.stringify(offers));
  }, [offers]);

  const handleAdd = () => {
    if (!newOffer.trim()) return;

    if (editIndex !== null) {
      const updated = [...offers];
      updated[editIndex] = newOffer;
      setOffers(updated);
      setEditIndex(null);
    } else {
      setOffers([...offers, newOffer]);
    }

    setNewOffer('');
  };

  const handleDelete = (index) => {
    const updated = [...offers];
    updated.splice(index, 1);
    setOffers(updated);
  };

  const handleEdit = (index) => {
    setNewOffer(offers[index]);
    setEditIndex(index);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Manage Offers</h4>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          value={newOffer}
          onChange={(e) => setNewOffer(e.target.value)}
          placeholder="Enter offer (e.g., 10)"
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      {offers.length === 0 ? (
        <p className="text-muted">No offers added yet.</p>
      ) : (
        <ul className="list-group">
          {offers.map((offer, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
              {offer}%
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(idx)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(idx)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OffersManager;

