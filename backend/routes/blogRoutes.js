
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); 


router.post('/', async (req, res) => {
  try {
    const { title, date, content, excerpt, imageUrl } = req.body;

    
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

    await newBlog.save(); 
    res.status(201).json({ success: true, message: 'Blog post created successfully', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ success: false, error: 'Failed to create blog post' });
  }
});


router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); 
    res.json(blogs); 
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
});


router.get('/:id', async (req, res) => {
  try {
    console.log("Fetching post with ID:", req.params.id); 

    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.status(200).json(post); 
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch post' });
  }
});



module.exports = router;