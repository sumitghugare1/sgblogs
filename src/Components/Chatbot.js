import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import nlp from 'compromise';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");


  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  
  const handleFeedback = (rating) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: `Rating: ${rating}` },
      { sender: "bot", text: "Thank you for your feedback!" },
    ]);
  };

  
  const getResponse = (message) => {
    const normalizedMessage = message.toLowerCase();

    if (/hello|hi|hey/.test(normalizedMessage)) {
      return "Hello! How can I assist you today?";
    } else if (/contact/.test(normalizedMessage)) {
      return "You can reach out to us on our Contact Us page: [Contact Us](https://localhost:3000/contact).";
    } else if (/about.*blog|blog/.test(normalizedMessage)) {
      return "Our blog covers web development, programming, and technology trends! Check it out [here](http://localhost:3000/blog).";
    } else if (/latest post|recent blog/.test(normalizedMessage)) {
      return "Our latest blog post is about React.js tips and tricks. Read it [here](http://localhost:3000/).";
    } else if (/services|tutorial/.test(normalizedMessage)) {
      return "We offer tutorials and resources for developers. Explore them [here](https://localhost:3000/tutorials).";
    } else if (/feedback|opinion|suggestion/.test(normalizedMessage)) {
      return "We appreciate your feedback! What would you like to share?";
    } else if (/help|support/.test(normalizedMessage)) {
      return "I’m here to help! You can also check out our Help page: [Help](https://localhost:3000/help).";
    } else {
      return "I'm here to help! Could you clarify or provide more details?";
    }
  };

  
  const sendMessage = (message) => {
    const response = getResponse(message);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: message },
      { sender: "bot", text: response },
    ]);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userMessage.trim()) {
      sendMessage(userMessage);
      setUserMessage(""); 
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        <FaComments size={24} />
      </button>

      {isOpen && (
        <div className="mt-4 shadow-lg rounded-lg p-4 bg-white w-80 h-96 flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${
                  msg.sender === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-lg p-2 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
