import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './Components/BlogPost'; 
import Contact from './pages/Contact';
import CreateBlog from './pages/CreateBlog'; 
import Login from './Components/Login';
import Register from './Components/Register';
import PrivateRoute from './Components/PrivateRoute'; 
import axios from 'axios';
import Chatbot from './Components/Chatbot';


const App = () => {
  const [posts, setPosts] = useState([]); 

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog'); 
        setPosts(response.data); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          {/* Main Blog Page Route */}
          <Route path="/" element={
            <>
              <Header />
              <main className="flex-grow container mx-auto p-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                        <p className="text-gray-500 mb-4">{post.date}</p>
                        <p className="text-gray-700 mb-4">{post.excerpt}</p>
                        <Link to={`/blog/${post._id}`} className="text-blue-500 hover:underline">
                          Read More
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            </>
          } />

          {/* About Page */}
          <Route path="/about" element={<About />} />
          
          {/* Private Routes */}
          <Route path="/blog" element={<PrivateRoute element={Blog} />} />
          <Route path="/create-blog" element={<PrivateRoute element={CreateBlog} />} />
          
          {/* Blog Post Details */}
          <Route path="/blog/:id" element={<BlogPost />} />  {/* Display single post */}
          
          {/* Contact Page */}
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Chatbot /> {/* Add Chatbot here */}

        <Footer />
      </div>
    </Router>
  );
};

export default App;
