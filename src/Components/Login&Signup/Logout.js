import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearToken } from '../../store/authSlice'; // Import clearToken from authSlice

const Logout = () => {
  const [loading, setLoading] = useState(false); // State to track loading status
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const api = process.env.REACT_APP_API_URL;

  const handleLogout = async () => {
    setLoading(true); // Set loading to true when the logout process starts

    try {
      // API call to handle logout
      await axios.post(`${api}/logout`); // Replace with your actual logout API endpoint

      // Clear the token from Redux and localStorage
      dispatch(clearToken());

      // Redirect the user to the login page after successful logout
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, handle error, such as showing an error message
    } finally {
      // Set loading to false when the process is complete (success or failure)
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-500 text-white max-sm:text-[12px] max-lg:text-[16px] max-lg:p-1 rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
      onClick={handleLogout}
    >
      {loading ? 'Logging out...' : 'Log Out'}
    </button>
  );
};

export default Logout;
