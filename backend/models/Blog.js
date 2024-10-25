const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Blog = mongoose.model('Blog', blogSchema,'blogs');

module.exports = Blog;
