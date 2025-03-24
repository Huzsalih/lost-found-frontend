import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Extract token from the URL
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Send the token to the backend for verification
        const response = await axios.get(`http://localhost:5050/api/auth/verify-email?token=${token}`);
        setMessage(response.data.message); 
        setTimeout(() => {
          navigate('/'); 
        }, 7000);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred. Please try again later.'); // Set error message
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {error ? (
          <div>
            <h1 className="text-2xl font-bold text-red-600">Error</h1>
            <p className="mt-4 text-gray-700">{error}</p>
            <button
              onClick={() => navigate('/signup')}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Signup
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-green-600">Success</h1>
            <p className="mt-4 text-gray-700">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;