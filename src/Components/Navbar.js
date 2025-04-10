import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(!!token);
    setIsAdmin(adminStatus);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
  };

  const closeMenu = () => {
    setIsOpen(false);
    setShowLoginOptions(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg text-gray-800' : 'bg-transparent text-white'
    }`}>
      <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className={`rounded-full overflow-hidden p-2 ${
            scrolled ? 'bg-blue-600' : 'bg-white'
          }`}>
            <span className={`text-xl font-extrabold ${
              scrolled ? 'text-white' : 'text-blue-600'
            }`}>SG</span>
          </div>
          <span className={`text-2xl font-bold transition duration-300 ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}>Blogs</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/" active={location.pathname === '/'} scrolled={scrolled}>Home</NavLink>
          <NavLink to="/about" active={location.pathname === '/about'} scrolled={scrolled}>About</NavLink>
          <NavLink to="/blog" active={location.pathname === '/blog'} scrolled={scrolled}>Blog</NavLink>
          <NavLink to="/contact" active={location.pathname === '/contact'} scrolled={scrolled}>Contact</NavLink>
          
          {isLoggedIn && !isAdmin && (
            <NavLink to="/create-blog" active={location.pathname === '/create-blog'} scrolled={scrolled}>
              Create Blog
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin/dashboard" active={location.pathname === '/admin/dashboard'} scrolled={scrolled}>
              Dashboard
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to="/profile" active={location.pathname === '/profile'} scrolled={scrolled}>
              Profile
            </NavLink>
          )}
          
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`px-4 py-2 rounded-full transition duration-300 ${
                scrolled 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-red-500 bg-opacity-90 hover:bg-opacity-100 text-white'
              }`}>
              Logout
            </button>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setShowLoginOptions(!showLoginOptions)}
                className={`px-4 py-2 rounded-full transition duration-300 ${
                  scrolled 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-white bg-opacity-90 hover:bg-opacity-100 text-blue-600'
                }`}
              >
                Login
              </button>
              
              {showLoginOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 animate-fadeIn">
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition duration-300"
                    onClick={() => setShowLoginOptions(false)}
                  >
                    Login as User
                  </Link>
                  <Link 
                    to="/admin/login" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition duration-300"
                    onClick={() => setShowLoginOptions(false)}
                  >
                    Login as Admin
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`md:hidden focus:outline-none transition-colors ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`}
        >
          {isOpen 
            ? <AiOutlineClose className="w-7 h-7" /> 
            : <AiOutlineMenu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-xl rounded-b-lg overflow-hidden animate-slideDown">
          <MobileNavLink to="/" onClick={closeMenu}>Home</MobileNavLink>
          <MobileNavLink to="/about" onClick={closeMenu}>About</MobileNavLink>
          <MobileNavLink to="/blog" onClick={closeMenu}>Blog</MobileNavLink>
          <MobileNavLink to="/contact" onClick={closeMenu}>Contact</MobileNavLink>
          
          {isLoggedIn && !isAdmin && (
            <MobileNavLink to="/create-blog" onClick={closeMenu}>Create Blog</MobileNavLink>
          )}
          {isAdmin && (
            <MobileNavLink to="/admin/dashboard" onClick={closeMenu}>Admin Dashboard</MobileNavLink>
          )}
          {isLoggedIn && (
            <MobileNavLink to="/profile" onClick={closeMenu}>Profile</MobileNavLink>
          )}
          
          {isLoggedIn ? (
            <div className="px-4 py-3">
              <button 
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }} 
                className="w-full py-3 bg-red-500 text-white rounded-lg text-center font-medium hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 p-4">
              <Link 
                to="/login" 
                className="py-3 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition duration-300"
                onClick={closeMenu}
              >
                Login as User
              </Link>
              <Link 
                to="/admin/login" 
                className="py-3 bg-purple-600 text-white rounded-lg text-center font-medium hover:bg-purple-700 transition duration-300"
                onClick={closeMenu}
              >
                Login as Admin
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

// Helper Components for cleaner code
const NavLink = ({ to, children, active, scrolled }) => (
  <Link
    to={to}
    className={`px-4 py-2 rounded-full transition duration-300 font-medium ${
      active 
        ? scrolled 
          ? 'bg-blue-100 text-blue-700' 
          : 'bg-white bg-opacity-20 text-white'
        : scrolled
          ? 'text-gray-700 hover:bg-gray-100'
          : 'text-white hover:bg-white hover:bg-opacity-20'
    }`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    className="block px-4 py-3 text-gray-800 border-b border-gray-100 hover:bg-gray-50 transition duration-300"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
