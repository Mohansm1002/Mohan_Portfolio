import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useOutlet } from 'react-router-dom';
import {
  ADMIN_TOKEN_KEY,
  getAdminMessages,
  getCertifications,
  getProfessionalSkills,
  getProjects,
  getSkills,
} from '../api/portfolioApi.js';
import './admin.css';

const navLinks = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/profile', label: 'Profile' },
  { to: '/admin/skills', label: 'Skills' },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/certifications', label: 'Certifications' },
  { to: '/admin/messages', label: 'Messages' },
];

const DashboardOverview = () => {
  const [counts, setCounts] = useState({
    skills: 0,
    professionalSkills: 0,
    projects: 0,
    certifications: 0,
    messages: 0,
  });
  const [status, setStatus] = useState('Loading dashboard...');

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getSkills(),
      getProfessionalSkills(),
      getProjects(),
      getCertifications(),
      getAdminMessages(),
    ])
      .then(([skills, professionalSkills, projects, certifications, messages]) => {
        if (!isMounted) {
          return;
        }

        setCounts({
          skills: skills.length,
          professionalSkills: professionalSkills.length,
          projects: projects.length,
          certifications: certifications.length,
          messages: messages.length,
        });
        setStatus('');
      })
      .catch(() => {
        if (isMounted) {
          setStatus('Unable to load dashboard counts. Check backend and admin token.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="admin-panel">
      <div className="admin-panel-header">
        <div>
          <p className="admin-eyebrow">Overview</p>
          <h1>Dashboard</h1>
        </div>
      </div>
      {status && <p className="admin-status">{status}</p>}
      <div className="admin-metrics">
        <div><strong>{counts.skills}</strong><span>Technical Skills</span></div>
        <div><strong>{counts.professionalSkills}</strong><span>Professional Skills</span></div>
        <div><strong>{counts.projects}</strong><span>Projects</span></div>
        <div><strong>{counts.certifications}</strong><span>Certifications</span></div>
        <div><strong>{counts.messages}</strong><span>Messages</span></div>
      </div>
    </section>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const outlet = useOutlet();

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    navigate('/admin/login', { replace: true });
  };

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <div>
          <p className="admin-eyebrow">Mohan Portfolio</p>
          <h2>Admin</h2>
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          {navLinks.map((link) => (
            <NavLink
              end={link.end}
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-secondary-button" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      <div className="admin-content">
        {outlet || <DashboardOverview />}
      </div>
    </main>
  );
};

export default AdminDashboard;
