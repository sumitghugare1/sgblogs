import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaWhatsapp,
  FaRegCopy, 
  FaRegBookmark, 
  FaBookmark,
  FaHeart,
  FaRegHeart
} from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();  
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/blog/${id}`); 
        setPost(response.data);
        
        // Initialize with random like count for demo purposes
        setLikeCount(Math.floor(Math.random() * 50) + 5);
        
        // Check local storage for liked status
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
        setLiked(likedPosts.includes(id));
        
        // Check local storage for saved status
        const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
        setSaved(savedPosts.includes(id));
        
        // Fetch related posts
        fetchRelatedPosts(response.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load the blog post. Please try again later.');
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async (currentPost) => {
      try {
        const response = await axios.get('http://localhost:5000/api/blog');
        // Filter out current post and get up to 3 posts
        const filtered = response.data
          .filter(p => p._id !== id)
          .slice(0, 3);
        setRelatedPosts(filtered);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };

    fetchPost();
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [id]);

  const handleLike = () => {
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);
    setLikeCount(prevCount => newLikeStatus ? prevCount + 1 : prevCount - 1);
    
    // Store liked status in local storage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (newLikeStatus) {
      localStorage.setItem('likedPosts', JSON.stringify([...likedPosts, id]));
    } else {
      localStorage.setItem('likedPosts', JSON.stringify(likedPosts.filter(postId => postId !== id)));
    }
  };

  const handleSave = () => {
    const newSaveStatus = !saved;
    setSaved(newSaveStatus);
    
    // Store saved status in local storage
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    if (newSaveStatus) {
      localStorage.setItem('savedPosts', JSON.stringify([...savedPosts, id]));
    } else {
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts.filter(postId => postId !== id)));
    }
  };

  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || 'Check out this blog post');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this article: ${post?.title}`);
    window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
  };

  const formatContent = (content) => {
    if (!content) return '';
    
    // Split content into paragraphs
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((para, index) => {
      // Check if paragraph should be a heading (simplified logic)
      if (para.startsWith('#') && para.length < 100) {
        return <h3 key={index} className="text-2xl font-bold text-gray-800 my-6">{para.replace(/^#+\s/, '')}</h3>;
      }
      
      // Check if paragraph contains a bullet point
      if (para.match(/^\s*[-*•]\s/)) {
        return (
          <ul key={index} className="list-disc list-inside my-4 text-gray-700">
            {para.split(/\n/).map((item, i) => (
              <li key={i} className="mb-2">{item.replace(/^\s*[-*•]\s/, '')}</li>
            ))}
          </ul>
        );
      }
      
      // Format regular paragraphs
      return <p key={index} className="text-gray-700 my-4 leading-relaxed">{para}</p>;
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md text-center">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/blog')} 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back to Blog
          </button>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800">Post not found</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - Matching Contact page style */}
      <div className="w-full bg-indigo-600 text-white py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl font-bold mb-4">Blog Posts</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Explore our collection of articles covering the latest insights, tips, and trends.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl py-12">
        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          {/* Hero Image with gradient overlay */}
          <div className="relative h-96">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <div className="mb-4">
                <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category || 'Technology'}
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
              <div className="flex items-center text-gray-200 text-sm">
                <span>{new Date(post.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
                <span className="mx-2">•</span>
                <span>{Math.ceil(post.content.length / 1000)} min read</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            {/* Social Sharing Bar - Floating */}
            <div className="fixed left-4 top-1/3 hidden lg:flex flex-col space-y-4 bg-white shadow-md p-3 rounded-full">
              <button 
                onClick={handleLike} 
                className="transition-transform hover:scale-110"
                title="Like this post"
              >
                {liked ? (
                  <FaHeart className="w-5 h-5 text-red-500" />
                ) : (
                  <FaRegHeart className="w-5 h-5 text-gray-500 hover:text-red-500" />
                )}
              </button>
              <button 
                onClick={shareOnFacebook} 
                className="text-blue-600 transition-transform hover:scale-110"
                title="Share on Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </button>
              <button 
                onClick={shareOnTwitter}
                className="text-blue-400 transition-transform hover:scale-110"
                title="Share on Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </button>
              <button 
                onClick={shareOnLinkedIn}
                className="text-blue-700 transition-transform hover:scale-110"
                title="Share on LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </button>
              <button 
                onClick={shareOnWhatsApp}
                className="text-green-500 transition-transform hover:scale-110"
                title="Share on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </button>
              <button 
                onClick={copyToClipboard}
                className={`${copied ? 'text-green-500' : 'text-gray-600'} transition-transform hover:scale-110`}
                title={copied ? "Link copied!" : "Copy link"}
              >
                <FaRegCopy className="w-5 h-5" />
              </button>
              <button 
                onClick={handleSave} 
                className="transition-transform hover:scale-110"
                title={saved ? "Unsave post" : "Save post"}
              >
                {saved ? (
                  <FaBookmark className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FaRegBookmark className="w-5 h-5 text-gray-600 hover:text-yellow-500" />
                )}
              </button>
            </div>
            
            {/* Content area with formatting */}
            <div className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </div>
            
            {/* Mobile sharing options */}
            <div className="mt-12 pt-6 border-t border-gray-200 lg:hidden">
              <h3 className="text-gray-700 font-medium mb-4">Share this article</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={handleLike} 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${liked ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-700'}`}
                >
                  {liked ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
                  <span>{likeCount}</span>
                </button>
                <button 
                  onClick={shareOnFacebook} 
                  className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <FaFacebookF className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button 
                  onClick={shareOnTwitter}
                  className="bg-blue-400 text-white px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <FaTwitter className="w-4 h-4" />
                  <span>Tweet</span>
                </button>
                <button 
                  onClick={copyToClipboard}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${copied ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-700'}`}
                >
                  <FaRegCopy className="w-4 h-4" />
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
                <button 
                  onClick={handleSave} 
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full ${saved ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-700'}`}
                >
                  {saved ? <FaBookmark className="w-4 h-4" /> : <FaRegBookmark className="w-4 h-4" />}
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 font-bold text-xl">
                {post.author ? post.author.charAt(0).toUpperCase() : 'A'}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                {post.author || 'Anonymous Author'}
              </h3>
              <p className="text-gray-600 text-sm">
                Writer & Content Creator
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <div key={relatedPost._id} className="group">
                  <a href={`/blog/${relatedPost._id}`} className="block">
                    <div className="relative h-40 mb-3 overflow-hidden rounded-lg">
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(relatedPost.date).toLocaleDateString()}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
