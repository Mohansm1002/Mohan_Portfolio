import { useState } from 'react';
import { createContactMessage } from '../api/portfolioApi.js';
import { defaultProfile } from '../portfolio/defaultData.js';
import './Contact.css';

const contactSocialPaths = {
  Facebook: 'M14 8.2V6.7c0-.7.3-1.1 1.2-1.1H17V2.4c-.9-.1-1.8-.2-2.7-.2-2.7 0-4.6 1.7-4.6 4.7v1.3H7v3.6h2.7V22H14V11.8h2.9l.5-3.6H14Z',
  GitHub: 'M12 2.2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5A3.9 3.9 0 0 1 6.5 9c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.8 9.8 0 0 1 5.2 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v2.5c0 .3.2.6.7.5A10 10 0 0 0 12 2.2Z',
  Instagram: 'M7.8 2.5h8.4a5.3 5.3 0 0 1 5.3 5.3v8.4a5.3 5.3 0 0 1-5.3 5.3H7.8a5.3 5.3 0 0 1-5.3-5.3V7.8a5.3 5.3 0 0 1 5.3-5.3Zm0 2A3.3 3.3 0 0 0 4.5 7.8v8.4a3.3 3.3 0 0 0 3.3 3.3h8.4a3.3 3.3 0 0 0 3.3-3.3V7.8a3.3 3.3 0 0 0-3.3-3.3H7.8Zm4.2 3.2a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Zm0 2a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6Zm4.6-2.8a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z',
  LinkedIn: 'M5.1 8.8H1.9V22h3.2V8.8ZM3.5 2.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM22.1 14.7c0-3.8-2-6.2-5.1-6.2-1.5 0-2.8.7-3.5 1.8V8.8h-3.1V22h3.2v-6.7c0-1.9.9-3.2 2.5-3.2 1.5 0 2.4 1.1 2.4 3.1V22h3.2v-7.3h.4Z',
};

const Contact = ({ profile = defaultProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const socialLinks = [
    { label: 'Facebook', href: profile.facebookUrl, path: contactSocialPaths.Facebook },
    { label: 'GitHub', href: profile.githubUrl, path: contactSocialPaths.GitHub },
    { label: 'Instagram', href: profile.instagramUrl, path: contactSocialPaths.Instagram },
    { label: 'LinkedIn', href: profile.linkedinUrl, path: contactSocialPaths.LinkedIn },
  ].filter((link) => link.href);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createContactMessage(formData);
      setStatus('Message sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('Unable to send right now. Please contact me by email.');
    }
  };

  return (
    <section id="contact" className="contact-section scroll-reveal">
      <div className="contact-info">
        <h2>Contact <span>Me</span></h2>
        <h3>Let's Work Together</h3>
        <p>
          I am open to entry-level frontend and full-stack development
          opportunities where I can apply my skills in React.js, Java, Python,
          MySQL, and responsive web design to build practical, user-friendly
          applications.
        </p>

        <div className="contact-lines">
          <a href={`mailto:${profile.email}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M2.5 6.8 12 12.9l9.5-6.1V18a2 2 0 0 1-2 2h-15a2 2 0 0 1-2-2V6.8Zm17-2.8a2 2 0 0 1 1.6.8L12 10.6 2.9 4.8A2 2 0 0 1 4.5 4h15Z" />
            </svg>
            {profile.email}
          </a>
          <a href={`tel:${profile.phone}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6.6 2.8 9 2.3c.7-.1 1.4.2 1.7.9l1.1 2.7c.3.7.1 1.4-.4 1.9L10 9c.9 1.8 2.3 3.2 4 4l1.3-1.4c.5-.5 1.3-.7 1.9-.4l2.7 1.1c.7.3 1.1 1 .9 1.7l-.5 2.4c-.2.9-1 1.5-1.9 1.5A14.4 14.4 0 0 1 4.9 4.7c0-.9.7-1.7 1.7-1.9Z" />
            </svg>
            {profile.phone}
          </a>
        </div>

        <div className="contact-social" aria-label="Contact social links">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              aria-label={link.label}
              key={link.label}
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d={link.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="Enter Your Name" value={formData.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} required />
        <input name="subject" type="text" placeholder="Enter Your Subject" value={formData.subject} onChange={handleChange} required />
        <textarea name="message" placeholder="Enter Your Message" value={formData.message} onChange={handleChange} required />
        <button type="submit">Submit</button>
        {status && <p className="contact-status">{status}</p>}
      </form>
    </section>
  );
};

export default Contact;
