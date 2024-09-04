import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = ({ accessToken }) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    if (!accessToken) {
      console.error('Not authenticated');
      return;
    }
    try {
      await axios.post(
        'http://localhost:3000/messages',
        { content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setContent('');
      fetchMessages();
    } catch (error) {
      console.error('Error creating message:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <form onSubmit={handleCreateMessage}>
        <div>
          <label>Message:</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Messages;
