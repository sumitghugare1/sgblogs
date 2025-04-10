import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './Components/BlogPost'; 
import Contact from './pages/Contact';
import CreateBlog from './pages/CreateBlog'; 
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRoute from './Components/PrivateRoute'; 
import AdminLogin from './Components/AdminLogin'; 
import AdminDashboard from './Components/AdminDashboard';
import axios from 'axios';
import Chatbot from './Components/Chatbot'; 
import Profile from './Components/Profile';
import CreateAdmin from './Components/CreateAdmin';

// Admin route component with better error handling
const AdminRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  console.log("AdminRoute check:", { token: !!token, isAdmin });
  
  return token && isAdmin ? <Component {...rest} /> : <Navigate to="/admin/login" />;
};

const App = () => {
  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/blog'); 
        setPosts(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={
            <>
              {/* Modern Hero Section */}
              <section className="relative h-screen flex items-center">
                {/* Background with overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black opacity-40"></div>
                </div>
                
                {/* Hero content */}
                <div className="container mx-auto px-6 relative z-10 text-center">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
                    Discover <span className="text-blue-400">Insights</span> & <span className="text-blue-300">Ideas</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto">
                    Explore a world of thoughtful articles, expert perspectives, and inspiring stories
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/blog" className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transform hover:-translate-y-1 transition duration-300 ease-in-out shadow-lg">
                      Explore Articles
                    </Link>
                    <Link to="/register" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transform hover:-translate-y-1 transition duration-300 ease-in-out">
                      Join Our Community
                    </Link>
                  </div>
                </div>
                
                {/* Scroll indicator */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </div>
              </section>
              
              {/* Featured Posts Section */}
              <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6">
                  <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Featured Articles</h2>
                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      Dive into our most insightful and popular content
                    </p>
                  </div>
                  
                  {loading ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-600 py-8">{error}</div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                      {posts.slice(0, 6).map((post) => (
                        <div key={post._id} className="group bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                          <div className="relative h-60 overflow-hidden">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title} 
                              className="w-full h-full object-cover transition duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60 group-hover:opacity-80 transition duration-300"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition duration-300">
                              {post.title}
                            </h3>
                            <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
                            <Link 
                              to={`/blog/${post._id}`} 
                              className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition duration-300"
                            >
                              Read Article
                              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                              </svg>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {!loading && !error && posts.length > 6 && (
                    <div className="text-center mt-12">
                      <Link 
                        to="/blog"
                        className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
                      >
                        View All Articles
                      </Link>
                    </div>
                  )}
                </div>
              </section>
            </>
          } />

          {/* Existing Routes */}
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<PrivateRoute element={Blog} />} />
          <Route path="/create-blog" element={<PrivateRoute element={CreateBlog} />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />

          {/* Admin Routes - Fixed and with better error handling */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute element={AdminDashboard} />} />
          <Route path="/create-admin" element={<CreateAdmin />} />

          {/* Add a catch-all route for 404 pages */}
          <Route path="*" element={<div className="container mx-auto p-20 text-center">
            <h1 className="text-5xl font-bold mb-6 text-gray-800">404 - Page Not Found</h1>
            <p className="text-xl text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
            <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
              Return to Home
            </Link>
          </div>} />
        </Routes>
        
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
