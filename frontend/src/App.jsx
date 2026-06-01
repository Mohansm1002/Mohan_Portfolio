import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Certifications from './components/Certifications.jsx';
import Projects from './components/Projects.jsx';
import Contact from './components/Contact.jsx';
import profileImg from './assets/hero.png';
import './App.css';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sections.forEach((section) => section.classList.remove('section-current'));
            entry.target.classList.add('is-visible');
            entry.target.classList.add('section-active');
            entry.target.classList.add('section-current');

            window.setTimeout(() => {
              entry.target.classList.remove('section-active');
            }, 850);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pageHeight > 0 ? window.scrollY / pageHeight : 0;

      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const getCurrentSection = () => {
      const sections = [...document.querySelectorAll('section[id]')];

      return sections.reduce((closest, section) => {
        const distance = Math.abs(section.getBoundingClientRect().top);
        const closestDistance = closest
          ? Math.abs(closest.getBoundingClientRect().top)
          : Number.POSITIVE_INFINITY;

        return distance < closestDistance ? section : closest;
      }, null);
    };

    const handleSectionLink = (event) => {
      const link = event.target.closest('a[href^="#"]');

      if (!link || link.getAttribute('href') === '#') {
        return;
      }

      const target = document.querySelector(link.getAttribute('href'));

      if (!target) {
        return;
      }

      event.preventDefault();
      const current = document.querySelector('section.section-current') || getCurrentSection();

      setIsNavigating(true);
      current?.classList.add('section-leaving');

      window.setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('section-entering');
        target.classList.add('section-active');
      }, 160);

      window.setTimeout(() => {
        setIsNavigating(false);
        current?.classList.remove('section-leaving');
        target.classList.remove('section-entering');
        target.classList.remove('section-active');
      }, 900);
    };

    document.addEventListener('click', handleSectionLink);

    return () => document.removeEventListener('click', handleSectionLink);
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ '--scroll-progress': scrollProgress }}
        aria-hidden="true"
      />
      <div
        className={`section-sweep ${isNavigating ? 'is-active' : ''}`}
        aria-hidden="true"
      />
      <Navbar />
      <section id="home" className="hero">
        <div className="hero-content">
          <p className="hero-kicker">Hello, It's Me</p>
          <h1>MOHAN</h1>
          <h2>
            And I'm a <span className="typing-text">Frontend Developer</span>
          </h2>
          <p className="hero-copy">
            B.Tech IT student and frontend developer skilled in HTML, CSS,
            JavaScript, React.js, Java, Python, and MySQL, focused on building
            responsive and user-friendly web applications.
          </p>
          <div className="social-links" aria-label="Social links">
            <a
              href="https://www.facebook.com/profile.php?id=100071509903847"
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 8.2V6.7c0-.7.3-1.1 1.2-1.1H17V2.4c-.9-.1-1.8-.2-2.7-.2-2.7 0-4.6 1.7-4.6 4.7v1.3H7v3.6h2.7V22H14V11.8h2.9l.5-3.6H14Z" />
              </svg>
            </a>
            <a
              href="https://github.com/Mohansm1002"
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.2-4.7-5A3.9 3.9 0 0 1 6.5 9c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.8 9.8 0 0 1 5.2 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v2.5c0 .3.2.6.7.5A10 10 0 0 0 12 2.2Z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mohan-mohan-b45222259?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5.1 8.8H1.9V22h3.2V8.8ZM3.5 2.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM22.1 14.7c0-3.8-2-6.2-5.1-6.2-1.5 0-2.8.7-3.5 1.8V8.8h-3.1V22h3.2v-6.7c0-1.9.9-3.2 2.5-3.2 1.5 0 2.4 1.1 2.4 3.1V22h3.2v-7.3h.4Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/__call__me__mohan_?igsh=MXd5bHpiOHBoamQxMA=="
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.8 2.5h8.4a5.3 5.3 0 0 1 5.3 5.3v8.4a5.3 5.3 0 0 1-5.3 5.3H7.8a5.3 5.3 0 0 1-5.3-5.3V7.8a5.3 5.3 0 0 1 5.3-5.3Zm0 2A3.3 3.3 0 0 0 4.5 7.8v8.4a3.3 3.3 0 0 0 3.3 3.3h8.4a3.3 3.3 0 0 0 3.3-3.3V7.8a3.3 3.3 0 0 0-3.3-3.3H7.8Zm4.2 3.2a4.3 4.3 0 1 1 0 8.6 4.3 4.3 0 0 1 0-8.6Zm0 2a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6Zm4.6-2.8a1 1 0 1 1 0 2.1 1 1 0 0 1 0-2.1Z" />
              </svg>
            </a>
          </div>
          <a className="button hero-button" href="#contact">Contact Me</a>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="portrait-orbit">
            <div className="portrait-ring">
              <img src={profileImg} alt="" />
            </div>
          </div>
        </div>
      </section>
      <About />
      <Skills />
      <Certifications />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
