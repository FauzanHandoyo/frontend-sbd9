import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [stores, setStores] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  useEffect(() => {
    const fetchStores = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        navigate('/signin'); 
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/store?userId=${userId}`);
        const result = await response.json();

        if (response.ok) {
          setStores(result.payload);
        } else {
          setMessage(`Error: ${result.message}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage('Failed to load stores.');
      }
    };

    fetchStores();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold mb-4">Welcome to the Store Page</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}

      <div className="w-full max-w-4xl bg-white p-6 rounded shadow-md">
        {stores.length > 0 ? (
          <ul>
            {stores.map((store) => (
              <li key={store.id} className="mb-4 border-b pb-2">
                <h2 className="text-lg font-bold">{store.name}</h2>
                <p>{store.address}</p>
              </li>
            ))}
          </ul>
        ) : (
          !message && <p>No stores available.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;