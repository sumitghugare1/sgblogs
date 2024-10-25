import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Check if user is logged in by checking for the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    setIsLoggedIn(false); // Update login state
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">Home</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded">
            Login
          </Link>
        )}
      </div>

      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">
          SG Blogs
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/about" className="text-white hover:text-gray-300">About</Link>
          <Link to="/blog" className="text-white hover:text-gray-300">Blog</Link>
          <Link to="/contact" className="text-white hover:text-gray-300">Contact</Link>
          <Link to="/create-blog" className="text-white hover:text-gray-300">Create Blog</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link to="/" className="block text-white hover:bg-blue-500 px-4 py-2">Home</Link>
          <Link to="/about" className="block text-white hover:bg-blue-500 px-4 py-2">About</Link>
          <Link to="/blog" className="block text-white hover:bg-blue-500 px-4 py-2">Blog</Link>
          <Link to="/contact" className="block text-white hover:bg-blue-500 px-4 py-2">Contact</Link>
          <Link to="/create-blog" className="block text-white hover:bg-blue-500 px-4 py-2">Create Blog</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
