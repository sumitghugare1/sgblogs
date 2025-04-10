import React from 'react';
import founderImg from '../images/founder.png';

const About = () => {
  const teamMembers = [
    {
      name: "Sumit ghugare",
      role: "Founder & Editor",
      bio: "A passionate 3rd year Computer Science Engineering student with a keen interest in modern web technologies. Sumit founded this blog to share his journey as an aspiring full stack developer while creating a platform for insightful tech content.",
      image: founderImg
    },
    {
      name: "Michael Chen",
      role: "Tech Writer",
      bio: "Michael specializes in breaking down complex technical topics into engaging, accessible content.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    },
    {
      name: "Priya Patel",
      role: "Creative Director",
      bio: "Priya brings her unique visual perspective to our content, ensuring everything we publish is beautiful and engaging.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="w-full bg-indigo-600 text-white py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl font-bold mb-6">About Our Journey</h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Passionate about delivering insightful content that informs, inspires, and connects our growing community of readers around the world.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto max-w-5xl px-6 py-16">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12 transform hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            Welcome to My Blog! We are passionate about sharing insightful and engaging content with our readers.
            Our mission is to provide high-quality articles that inspire, inform, and entertain. Whether you're here to learn something new, explore different perspectives, or simply enjoy some great reads, we've got you covered.
          </p>
          <p className="text-lg text-gray-600">
            Our team consists of experienced writers, creators, and experts in various fields, all working together to bring you the best content possible. We believe in the power of words and the impact they can have on our readers.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Innovation</h3>
                <p className="text-sm text-gray-600">Always exploring new ideas</p>
              </div>
            </div>
            
            <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Diversity</h3>
                <p className="text-sm text-gray-600">Embracing different perspectives</p>
              </div>
            </div>
            
            <div className="flex items-center bg-purple-50 px-4 py-2 rounded-lg">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Timeliness</h3>
                <p className="text-sm text-gray-600">Delivering relevant content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="bg-indigo-700 text-white rounded-xl p-8 md:p-12 mb-16 relative">
          <svg className="absolute top-4 left-4 w-16 h-16 text-indigo-500 opacity-30" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
          <p className="text-xl md:text-2xl italic mb-6 relative z-10">
            "This blog has become my daily source of inspiration. The articles are thoughtfully written and always provide a fresh perspective on topics I care about."
          </p>
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-white overflow-hidden mr-4">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Reader" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="font-semibold">Alex Morgan</p>
              <p className="text-indigo-200 text-sm">Loyal Reader since 2020</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Connect With Us</h2>
          <p className="text-gray-600 mb-8">Join our community on social media for daily updates, behind-the-scenes content, and more!</p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-600 transition-all duration-300">
                <i className="fab fa-facebook-f text-blue-600 text-2xl group-hover:text-white transition-colors"></i>
              </div>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-400 transition-all duration-300">
                <i className="fab fa-twitter text-blue-400 text-2xl group-hover:text-white transition-colors"></i>
              </div>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-pink-100 p-4 rounded-full group-hover:bg-pink-500 transition-all duration-300">
                <i className="fab fa-instagram text-pink-500 text-2xl group-hover:text-white transition-colors"></i>
              </div>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-blue-100 p-4 rounded-full group-hover:bg-blue-700 transition-all duration-300">
                <i className="fab fa-linkedin text-blue-700 text-2xl group-hover:text-white transition-colors"></i>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
