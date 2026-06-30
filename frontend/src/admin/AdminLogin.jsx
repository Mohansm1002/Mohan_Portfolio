import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ADMIN_TOKEN_KEY, loginAdmin } from '../api/portfolioApi.js';
import './admin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (localStorage.getItem(ADMIN_TOKEN_KEY)) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await loginAdmin(formData);
      localStorage.setItem(ADMIN_TOKEN_KEY, response.token);
      navigate('/admin', { replace: true });
    } catch (error) {
      console.error(error);
      setStatus('Invalid admin username or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <form className="admin-login-panel" onSubmit={handleSubmit}>
        <p className="admin-eyebrow">Portfolio Admin</p>
        <h1>Admin Login</h1>
        <label>
          Username
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="admin-primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        {status && <p className="admin-error">{status}</p>}
      </form>
    </main>
  );
};

export default AdminLogin;
