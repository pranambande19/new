import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Optional: can use to show a loader

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('https://new-13vf.onrender.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('❌ Failed to fetch user profile:', err.message);
      localStorage.removeItem('token');
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = (token) => {
    localStorage.setItem('token', token);
    fetchUserProfile();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user,setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
