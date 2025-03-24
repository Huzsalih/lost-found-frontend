import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5050/api/items', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => setItems(response.data))
      .catch(err => {
        if (err.response?.status === 401) navigate('/login');
      });
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setItems(items.filter(item => item._id !== id));
      alert('Item deleted successfully');
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-vh-100 w-100 bg-light">
      {/* Full-width header */}
      <div className="w-100 bg-white shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="mb-0">Lost and Found Platform</h1>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>

      {/* Full-width content */}
      <div className="p-4 w-100">
        <div className="d-flex justify-content-center mb-4">
          <Link to="/add" className="btn btn-primary">
            Add New Item
          </Link>
        </div>

        <div className="row g-4 mx-0"> {/* Remove container padding */}
          {items.map(item => (
            <div key={item._id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className="card-text"><small className="text-muted">{item.location}</small></p>
                </div>
                <div className="card-footer bg-white">
                  <div className="d-flex justify-content-between">
                    <Link to={`/edit/${item._id}`} className="btn btn-warning">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;