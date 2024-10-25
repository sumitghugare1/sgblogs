import React, { useState } from 'react';
import { FaComments } from 'react-icons/fa';  // Import a chat icon from react-icons

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);  // State to track if chatbot is open

  const toggleChatbot = () => {
    setIsOpen(!isOpen);  // Toggle the open state
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Small Icon Button to Toggle Chatbot */}
      <button
        onClick={toggleChatbot}
        className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        <FaComments size={24} /> {/* Chat Icon */}
      </button>

      {/* Chatbot iframe, visible only when isOpen is true */}
      {isOpen && (
        <div className="mt-4 shadow-lg rounded-lg">
          <iframe
            allow="microphone;"
            width="300"
            height="400"
            src="https://console.dialogflow.com/api-client/demo/embedded/dc551f9e-5252-45eb-9e35-e8172ed6b7c4"
            title="Chatbot"
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
