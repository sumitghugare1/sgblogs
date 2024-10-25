import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        Welcome to My Blog! We are passionate about sharing insightful and engaging content with our readers.
      </p>
      <p className="mb-4">
        Our mission is to provide high-quality articles that inspire, inform, and entertain. Whether you're here to learn something new, explore different perspectives, or simply enjoy some great reads, we've got you covered.
      </p>
      <p className="mb-4">
        Our team consists of experienced writers, creators, and experts in various fields, all working together to bring you the best content possible. We believe in the power of words and the impact they can have on our readers.
      </p>
      <p className="mb-4">
        Thank you for visiting our blog. We hope you enjoy your time here and find something that resonates with you. If you have any questions, suggestions, or feedback, please don't hesitate to reach out to us.
      </p>
      <p className="text-xl font-semibold mb-6">Happy Reading!</p>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Follow Us on Social Media</h2>
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
            <i className="fab fa-facebook-f fa-2x"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
            <i className="fab fa-twitter fa-2x"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
