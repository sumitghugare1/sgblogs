import React from 'react';

const Post = ({ title, date, content, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-500 text-sm mb-4">{date}</p>
        <p className="text-gray-700 mb-4">{content}</p>
        <button className="text-blue-500 hover:underline">Read More</button>
      </div>
    </div>
  );
};

export default Post;
