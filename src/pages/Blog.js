import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Extract unique categories from posts (assuming posts have categories in their data)
  const getCategories = () => {
    const categories = posts.map(post => post.category || 'Uncategorized');
    return ['All', ...new Set(categories)];
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/blog');
        setPosts(response.data);
        setFilteredPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts', error);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search term and active category
  useEffect(() => {
    const results = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredPosts(results);
  }, [searchTerm, activeCategory, posts]);

  // Get a featured post (just using the first post in this example)
  const featuredPost = posts.length > 0 ? posts[0] : null;
  
  // Create skeleton loader for cards
  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-56 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header Section - Matching Contact page style */}
      <div className="w-full bg-indigo-600 text-white py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl font-bold mb-4">Our Blog</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Dive into our collection of articles covering the latest in web development, 
            design trends, and technology insights.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4 sm:px-6">
        {/* Search and Filter Bar */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {getCategories().map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-10">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Featured Post */}
        {!loading && !error && featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">✨</span> Featured Article
            </h2>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Featured</span>
                  <h3 className="text-3xl font-bold text-gray-800 mt-3 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-4">{featuredPost.date}</p>
                  <Link
                    to={`/blog/${featuredPost._id}`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Read Full Article
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Number of posts indication */}
        {!loading && !error && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-700 font-medium">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'} 
              {searchTerm && ` matching "${searchTerm}"`}
              {activeCategory !== 'All' && ` in ${activeCategory}`}
            </p>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        
        {/* No Results */}
        {!loading && !error && filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No posts found</h3>
            <p className="mt-1 text-gray-500">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && !error && filteredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.filter(post => post !== featuredPost).map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  {post.category && (
                    <span className="absolute top-4 left-4 bg-blue-600 bg-opacity-90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  )}
                </div>
                <div className="p-6 flex-grow">
                  <p className="text-gray-500 text-sm mb-2">{post.date}</p>
                  <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="px-6 pb-6">
                  <Link
                    to={`/blog/${post._id}`}
                    className="group inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                  >
                    Read Article
                    <svg 
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
