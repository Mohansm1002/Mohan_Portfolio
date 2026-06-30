import { useEffect, useState } from 'react';
import { deleteAdminMessage, getAdminMessages } from '../api/portfolioApi.js';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [status, setStatus] = useState('Loading messages...');

  const loadMessages = async () => {
    setStatus('Loading messages...');
    try {
      const data = await getAdminMessages();
      setMessages(data);
      setStatus('');
    } catch (error) {
      console.error(error);
      setStatus('Unable to load contact messages.');
    }
  };

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      loadMessages();
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const removeMessage = async (id) => {
    try {
      await deleteAdminMessage(id);
      if (activeMessage?.id === id) {
        setActiveMessage(null);
      }
      await loadMessages();
    } catch (error) {
      console.error(error);
      setStatus('Unable to delete message.');
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-eyebrow">Inbox</p>
          <h1>Contact Messages</h1>
        </div>
      </div>
      {status && <p className="admin-status">{status}</p>}

      <div className="admin-list">
        {messages.map((message) => (
          <article className="admin-list-item" key={message.id}>
            <div>
              <h2>{message.subject}</h2>
              <p>{message.name} | {message.email}</p>
            </div>
            <div className="admin-row-actions">
              <button type="button" onClick={() => setActiveMessage(message)}>View</button>
              <button type="button" onClick={() => removeMessage(message.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>

      {activeMessage && (
        <section className="admin-detail">
          <h2>{activeMessage.subject}</h2>
          <p><strong>Name:</strong> {activeMessage.name}</p>
          <p><strong>Email:</strong> {activeMessage.email}</p>
          <p><strong>Received:</strong> {activeMessage.createdAt || 'Not available'}</p>
          <p>{activeMessage.message}</p>
        </section>
      )}
    </section>
  );
};

export default ManageMessages;
