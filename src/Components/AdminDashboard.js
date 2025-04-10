import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('blogs');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to refresh the token status display
  const [tokenStatus, setTokenStatus] = useState({});
  
  useEffect(() => {
    // Check token status
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');
    setTokenStatus({ 
      hasToken: !!token, 
      isAdmin: isAdmin === 'true',
      tokenPreview: token ? `${token.substr(0, 15)}...` : 'No token' 
    });
    
    // First test if API server is reachable
    axios.get('http://localhost:5000/api/test')
      .then(() => console.log('Server is reachable'))
      .catch(err => setError('Cannot reach API server. Please check if backend is running.'));
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('No token found');
          setError('Authentication error: No token found');
          setLoading(false);
          return;
        }
        
        console.log('Fetching data with token', token);
        
        // Test admin auth
        try {
          await axios.get('http://localhost:5000/api/admin/test', {
            headers: { 'x-auth-token': token }
          });
          console.log('Admin authentication successful');
        } catch (err) {
          console.error('Admin auth test failed:', err);
          setError('Admin authentication failed. Please login again.');
          setLoading(false);
          return;
        }
        
        // Fetch blogs
        try {
          const blogsResponse = await axios.get('http://localhost:5000/api/blog');
          console.log('Blogs fetched:', blogsResponse.data.length);
          setBlogs(blogsResponse.data);
        } catch (err) {
          console.error('Failed to fetch blogs:', err);
        }
        
        // Fetch users from the admin API endpoint
        try {
          console.log('Attempting to fetch users with token:', token);
          const usersResponse = await axios.get('http://localhost:5000/api/admin/users', {
            headers: { 'x-auth-token': token }
          });
          setUsers(usersResponse.data);
          console.log('Users fetched:', usersResponse.data.length);
        } catch (userError) {
          console.error('Failed to fetch users:', userError);
          // Keep the dashboard working even if users can't be fetched
          setUsers([
            { _id: '1', username: 'Loading users failed', email: 'Please check console for errors' }
          ]);
          setError('Failed to fetch users: ' + (userError.response?.data?.msg || userError.message));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to fetch data. Please check your connection and permissions.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteBlog = async (id) => {
    try {
      console.log(`Attempting to delete blog with ID: ${id}`);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Proceed with deletion
      const response = await axios.delete(`http://localhost:5000/api/admin/blogs/${id}`, {
        headers: { 
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Delete response:', response.data);
      
      // Remove the deleted blog from state
      setBlogs(blogs.filter(blog => blog._id !== id));
      alert('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      
      // Check specific error types
      if (error.response?.status === 404) {
        alert('Blog not found. It may have been already deleted.');
      } else if (error.response?.status === 401) {
        alert('Authentication error. Please login again.');
        navigate('/admin/login');
      } else {
        alert('Failed to delete blog: ' + (error.response?.data?.msg || error.message));
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { 'x-auth-token': token }
      });
      
      // Remove the deleted user from state
      setUsers(users.filter(user => user._id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user: ' + (error.response?.data?.msg || error.message));
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-gray-700">Loading dashboard data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="w-full bg-indigo-600 text-white py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-5xl font-bold mb-4">Admin Dashboard</h1>
              <p className="text-xl opacity-90 max-w-2xl">
                Manage your blog posts and users from this central control panel.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <a href="/create-admin" className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-3 rounded-lg shadow-md font-semibold transition-all flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Create Admin
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto p-6 pt-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Total Blogs</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-800">{blogs.length}</div>
              <p className="text-gray-500 mt-2">Published articles</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-purple-500 to-purple-700 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-gray-800">{users.length}</div>
              <p className="text-gray-500 mt-2">Registered accounts</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-green-500 to-green-700 text-white flex justify-between items-center">
              <h3 className="text-lg font-semibold">System Status</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="p-6">
              <div className="flex items-center">
                <span className={`h-4 w-4 rounded-full mr-2 ${tokenStatus.isAdmin ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="text-lg font-semibold text-gray-800">{tokenStatus.isAdmin ? 'Active' : 'Limited'}</span>
              </div>
              <p className="text-gray-500 mt-2">Admin privileges {tokenStatus.isAdmin ? 'enabled' : 'disabled'}</p>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow-md animate-fadeIn">
            <div className="flex items-center">
              <svg className="h-6 w-6 mr-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Tab navigation with improved styling */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button 
              className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none transition-colors ${activeTab === 'blogs' ? 'bg-indigo-50 border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'}`}
              onClick={() => setActiveTab('blogs')}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>Manage Blogs</span>
              </div>
            </button>
            <button 
              className={`flex-1 py-4 px-6 font-medium text-sm focus:outline-none transition-colors ${activeTab === 'users' ? 'bg-indigo-50 border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'}`}
              onClick={() => setActiveTab('users')}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Manage Users</span>
              </div>
            </button>
          </div>
        </div>

        {/* Content areas with improved styling */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 animate-fadeIn">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-indigo-50">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Blog Posts</h2>
                <p className="text-gray-600 mt-1">Manage all blog content from here</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                {blogs.length} Posts
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-semibold text-left">
                    <th className="py-4 px-6 uppercase text-xs tracking-wider">ID</th>
                    <th className="py-4 px-6 uppercase text-xs tracking-wider">Title</th>
                    <th className="py-4 px-6 uppercase text-xs tracking-wider">Date</th>
                    <th className="py-4 px-6 uppercase text-xs tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <tr key={blog._id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 text-sm text-gray-500">{blog._id.substring(0, 8)}...</td>
                        <td className="py-4 px-6 font-medium">{blog.title}</td>
                        <td className="py-4 px-6">{new Date(blog.date).toLocaleDateString()}</td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <a href={`/blog/${blog._id}`} target="_blank" rel="noopener noreferrer" 
                               className="bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </a>
                            <button 
                              className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded transition-colors"
                              onClick={() => handleDeleteBlog(blog._id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 px-6 text-center text-gray-500 italic">No blog posts found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 animate-fadeIn">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
                <p className="text-gray-600 mt-1">Manage all registered accounts</p>
              </div>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                {users.length} Users
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 font-semibold text-left">
                    <th className="py-4 px-6 uppercase text-xs tracking-wider">Username</th>
                    <th className="py-4 px-6 uppercase text-xs tracking-wider">Email</th>
                    <th className="py-4 px-6 uppercase text-xs tracking-wider">Status</th>
                    <th className="py-4 px-6 uppercase text-xs tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user._id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-medium">{user.username}</td>
                        <td className="py-4 px-6">{user.email}</td>
                        <td className="py-4 px-6">
                          {user.isAdmin ? (
                            <span className="bg-purple-100 text-purple-800 text-xs py-1 px-2 rounded-full">
                              Admin
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded-full">
                              User
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <button 
                            className="bg-red-100 text-red-700 hover:bg-red-200 p-2 rounded transition-colors"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 px-6 text-center text-gray-500 italic">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
