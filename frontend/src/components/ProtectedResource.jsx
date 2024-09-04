// src/components/ProtectedResource.js
import React, { useState } from 'react';
import axios from 'axios';

const ProtectedResource = ({ accessToken }) => {
  const [message, setMessage] = useState('');

  const fetchProtectedResource = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/protected', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error fetching protected resource:', error);
    }
  };

  return (
    <div>
      <h2>Protected Resource</h2>
      <button onClick={fetchProtectedResource}>Fetch Protected Resource</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProtectedResource;
