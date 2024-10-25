import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPost = () => {
  const { id } = useParams();  // Get the post ID from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch the post using the `id` from the URL
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`); 
        setPost(response.data);  // Store the post data in state
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);  // Re-run the effect when `id` changes

  // Loading state: Return loading text while fetching data
  if (!post) {
    return <p>Loading...</p>;
  }

  // Render post details once data is available
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 text-sm mb-4">{post.date}</p>
          <div className="text-gray-700">{post.content}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
