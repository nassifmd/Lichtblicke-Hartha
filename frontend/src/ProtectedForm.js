import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProtectedForm.css';

const ProtectedForm = () => {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [formData, setFormData] = useState({
    project: '',
    date: '',
    name: '',
    phone: '',
    email: '',
    comments: ''
  });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const res = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');

      setStatus('Message sent successfully!');
      setFormData({ project: '', date: '', name: '', phone: '', email: '', comments: '' });
    } catch (err) {
      setStatus('Failed to send. Please try again later.');
    }
  };

  if (!authorized) return null;

  return (
    <div className="form-container">
      <form className="project-form" onSubmit={handleSubmit}>
        <h2>Project Form</h2>
        <input name="project" maxLength="25" placeholder="Project Name" value={formData.project} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input name="name" maxLength="25" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input name="phone" maxLength="25" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="email" name="email" maxLength="50" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <textarea name="comments" maxLength="300" placeholder="Comments" value={formData.comments} onChange={handleChange}></textarea>

        <button type="submit">Send</button>
        {status && <p className="form-status">{status}</p>}
      </form>
    </div>
  );
};

export default ProtectedForm;
