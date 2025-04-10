const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');
const Blog = require('../models/Blog');
const mongoose = require('mongoose');

// Helper function to validate MongoDB ObjectId
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Debug middleware to log all admin requests
router.use((req, res, next) => {
  console.log(`Admin API Request: ${req.method} ${req.originalUrl}`);
  next();
});

// Test route that doesn't require authentication
router.get('/test-open', (req, res) => {
  console.log('Admin open test route accessed');
  res.json({ msg: 'Admin routes are accessible without auth' });
});

// Get all users (Admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    console.log('Admin requesting all users');
    const users = await User.find().select('-password');
    console.log(`Found ${users.length} users`);
    res.json(users);
  } catch (err) {
    console.error('Error in GET /users:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get single user by ID (Admin only)
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error in GET /users/:id:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete user (Admin only)
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error('Error in DELETE /users/:id:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get all blogs (Admin only)
router.get('/blogs', adminAuth, async (req, res) => {
  try {
    console.log('Admin requesting all blogs');
    const blogs = await Blog.find();
    console.log(`Found ${blogs.length} blogs`);
    res.json(blogs);
  } catch (err) {
    console.error('Error in GET /blogs:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Get single blog by ID (Admin only)
router.get('/blogs/:id', adminAuth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error('Error in GET /blogs/:id:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found' });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});

// Delete a blog post (Admin only)
router.delete('/blogs/:id', adminAuth, async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(`Admin attempting to delete blog with ID: ${blogId}`);
    
    // Validate if the ID is a valid MongoDB ObjectId
    if (!isValidObjectId(blogId)) {
      console.log(`Invalid blog ID format: ${blogId}`);
      return res.status(400).json({ msg: 'Invalid blog ID format' });
    }
    
    const blog = await Blog.findById(blogId);
    
    if (!blog) {
      console.log(`Blog with ID ${blogId} not found`);
      return res.status(404).json({ msg: 'Blog post not found' });
    }

    // Log extra information for debugging
    console.log(`Blog found: "${blog.title}"`);
    if (req.adminUser) {
      console.log(`Admin user ${req.adminUser.username} is deleting blog: ${blog.title}`);
    } else {
      console.log('Warning: req.adminUser is undefined!');
    }

    // Delete the blog
    await Blog.findByIdAndDelete(blogId);
    console.log(`Blog with ID ${blogId} deleted successfully`);
    
    res.json({ msg: 'Blog post deleted successfully', blogId });
  } catch (err) {
    console.error(`Error deleting blog ${req.params.id}:`, err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Blog post not found - Invalid ID format' });
    }
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

// Test route to verify admin routes are working
router.get('/test', (req, res) => {
  console.log('Admin test route accessed');
  res.json({ msg: 'Admin routes are working' });
});

module.exports = router;
