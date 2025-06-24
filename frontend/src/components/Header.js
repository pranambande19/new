import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate('/login'); // Redirect to login after logout
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <div className="text-2xl font-bold text-blue-600">Logo</div>

      <button
        onClick={handleAuthClick}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </header>
  );
};

export default Header;
