import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
  const [formData, setFormData] = useState({ name: '', description: '', location: '', status: 'lost' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://lost-found-backend-alpha.vercel.app/api/items', formData);
      alert('Item added successfully');
      navigate('/home');
    } catch (err) {
      alert('Failed to add item');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Add New Item</h1>

      <form onSubmit={handleSubmit} className="card shadow p-4">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="form-select"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Add Item
          </button>
          <button
            type="button"
            onClick={() => navigate('/home')}
            className="btn btn-secondary"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;