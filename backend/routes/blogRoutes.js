// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Import your Blog model

// POST request to /api/blog (create a new blog post)
router.post('/', async (req, res) => {
  try {
    const { title, date, content, excerpt, imageUrl } = req.body;

    // Validate required fields
    if (!title || !date || !content || !excerpt || !imageUrl) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newBlog = new Blog({
      title,
      date,
      content,
      excerpt,
      imageUrl,
    });

    await newBlog.save(); // Save the blog post to the database
    res.status(201).json({ success: true, message: 'Blog post created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ success: false, error: 'Failed to create blog post' });
  }
});

// GET request to /api/blog (fetch all blog posts)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    res.json(blogs); // Return the blog posts as JSON
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
});

// GET request to /api/blog/:id (fetch a single blog post)
router.get('/:id', async (req, res) => {
  try {
    console.log("Fetching post with ID:", req.params.id); // Log the incoming ID

    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.status(200).json(post); // Send the post data as a response
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch post' });
  }
});



module.exports = router;