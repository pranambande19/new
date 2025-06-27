import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // adjust path

const Header = () => {
  const { isLoggedIn, logout, user } = useAuth(); // Ensure user has `profilePic`
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
      <div className="text-2xl font-bold text-blue-600">Logo</div>

      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <img
            src={user?.profilePic }
            alt="Profile"
            onClick={handleProfileClick}
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500 hover:scale-105 transition duration-300"
          />
        )}

        <button
          onClick={handleAuthClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>
    </header>
  );
};

export default Header;
