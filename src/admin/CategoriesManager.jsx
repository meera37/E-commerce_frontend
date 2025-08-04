import React, { useState, useEffect } from 'react';

function CategoriesManager() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(stored);
  }, []);

  useEffect(() => {
  if (categories.length > 0) {
    localStorage.setItem('categories', JSON.stringify(categories));
  }
}, [categories]);


  const handleAdd = () => {
    if (!newCategory.trim()) return;
    if (editIndex !== null) {
      const updated = [...categories];
      updated[editIndex] = newCategory;
      setCategories(updated);
      setEditIndex(null);
    } else {
      setCategories([...categories, newCategory]);
    }
    setNewCategory('');
  };

  const handleDelete = (index) => {
    const updated = [...categories];
    updated.splice(index, 1);
    setCategories(updated);
  };

  const handleEdit = (index) => {
    setNewCategory(categories[index]);
    setEditIndex(index);
  };

  return (
    <div>
      <h4>Manage Categories</h4>
      <div className="d-flex mb-3">
        <input
          className="form-control me-2"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category"
        />
        <button className="btn btn-primary" onClick={handleAdd}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="list-group">
        {categories.map((cat, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between">
            {cat}
            <div>
              <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(idx)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleDelete(idx)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesManager;


