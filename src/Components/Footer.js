import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Top Wave Effect */}
      <div className="text-blue-600 bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 140">
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            d="M0,128L80,117.3C160,107,320,85,480,96C640,107,800,149,960,149.3C1120,149,1280,107,1360,85.3L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-white rounded-full p-2">
                <span className="text-xl font-extrabold text-blue-600">SG</span>
              </div>
              <span className="text-2xl font-bold text-white">Blogs</span>
            </div>
            <p className="mb-6 text-gray-400">
              Sharing insights, inspiration, and information through thoughtful content created for curious minds.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://facebook.com" icon={<FaFacebookF />} />
              <SocialLink href="https://twitter.com" icon={<FaTwitter />} />
              <SocialLink href="https://instagram.com" icon={<FaInstagram />} />
              <SocialLink href="https://linkedin.com" icon={<FaLinkedinIn />} />
              <SocialLink href="https://github.com" icon={<FaGithub />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-600"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/login">Login</FooterLink>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative">
              Categories
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-600"></span>
            </h3>
            <ul className="space-y-3">
              <FooterLink to="/blog">Technology</FooterLink>
              <FooterLink to="/blog">Programming</FooterLink>
              <FooterLink to="/blog">Web Development</FooterLink>
              <FooterLink to="/blog">UI/UX Design</FooterLink>
              <FooterLink to="/blog">Digital Marketing</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative">
              Subscribe
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-600"></span>
            </h3>
            <p className="mb-4 text-gray-400">Subscribe to our newsletter for the latest updates</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-3 rounded-l-lg flex-1 bg-gray-800 border-none focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SG Blogs. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white transition duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper components
const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bg-gray-800 hover:bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center transition duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link 
      to={to} 
      className="text-gray-400 hover:text-white transition duration-300"
    >
      {children}
    </Link>
  </li>
);

export default Footer;
