import { useEffect, useState } from 'react';
import cssLogo from '../assets/CSS3_logo.png';
import foodDeliveryImage from '../assets/food_delivery.png';
import htmlLogo from '../assets/HTML5-logo.png';
import javaLogo from '../assets/java-logo.svg';
import laptopPriceImage from '../assets/laptop_price.png';
import mlLogo from '../assets/ML2_logo.png';
import pythonLogo from '../assets/Python-logo.png';
import reactLogo from '../assets/React-logo.png';
import sqlLogo from '../assets/Sql_logo.png';
import trainTicketImage from '../assets/train_ticket.png';
import './Projects.css';

const projects = [
  {
    title: 'Food Delivery Application',
    stack: 'HTML, CSS, React.js',
    technologies: [
      { name: 'HTML', image: htmlLogo, className: 'html' },
      { name: 'CSS', image: cssLogo, className: 'css' },
      { name: 'React.js', image: reactLogo, className: 'react' },
    ],
    type: 'Frontend application',
    accent: 'food',
    image: foodDeliveryImage,
    description:
      'A responsive food delivery web application for browsing menus and placing orders with a smooth customer experience.',
    highlights: [
      'Designed user-friendly restaurant and menu screens with HTML and CSS.',
      'Built cart update flows for real-time item changes.',
      'Structured the React interface for scalable, reusable components.',
    ],
  },
  {
    title: 'Train Ticket Booking System',
    stack: 'Java',
    technologies: [
      { name: 'Java', image: javaLogo, className: 'java' },
    ],
    type: 'Booking system',
    accent: 'train',
    image: trainTicketImage,
    description:
      'A console-based ticket booking system for reserving and managing train tickets with clear object-oriented structure.',
    highlights: [
      'Implemented user input handling, seat availability checks, booking, and cancellation.',
      'Applied object-oriented programming concepts for maintainable logic.',
      'Organized the flow to make ticket management simple and reliable.',
    ],
  },
  {
    title: 'Laptop Price Prediction',
    stack: 'Python, Machine Learning',
    technologies: [
      { name: 'Python', image: pythonLogo, className: 'python' },
      { name: 'Machine Learning', image: mlLogo, className: 'ml' },
    ],
    type: 'Prediction model',
    accent: 'laptop',
    image: laptopPriceImage,
    description:
      'A machine learning application that predicts laptop prices from specifications and presents results through an interactive UI.',
    highlights: [
      'Trained a Random Forest model for improved price prediction accuracy.',
      'Prepared specification-based inputs for real-time predictions.',
      'Built a user-friendly interface for quick laptop price estimation.',
    ],
  },
];

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const renderTechStack = (technologies) => (
    <div className="project-tech-stack">
      {technologies.map((tech) => (
        <span className="project-tech-chip" key={tech.name}>
          <span
            className={`project-tech-icon project-tech-icon-${tech.className}`}
            aria-hidden="true"
          >
            {tech.image ? <img src={tech.image} alt="" /> : tech.icon}
          </span>
          {tech.name}
        </span>
      ))}
    </div>
  );

  useEffect(() => {
    if (!activeProject) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };

    document.body.classList.add('project-open');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('project-open');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  return (
    <section id="projects" className="projects-section scroll-reveal">
      <div className="projects-heading">
        
        <h2>My <span>Projects</span></h2>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <button
            className={`project-card project-card-${project.accent}`}
            key={project.title}
            onClick={() => setActiveProject(project)}
            style={{ '--delay': `${index * 0.12}s` }}
            type="button"
          >
            <div className="project-preview" aria-hidden="true">
              <img src={project.image} alt="" />
            </div>
            <div className="project-info">
              <p>{project.type}</p>
              <h3>{project.title}</h3>
              {renderTechStack(project.technologies)}
            </div>
          </button>
        ))}
      </div>

      <div
        className={`project-overlay ${activeProject ? 'is-open' : ''}`}
        aria-hidden={!activeProject}
        onClick={() => setActiveProject(null)}
      >
        {activeProject && (
          <article
            className={`project-detail project-detail-${activeProject.accent}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="project-close"
              onClick={() => setActiveProject(null)}
              type="button"
              aria-label="Close project detail"
            >
              x
            </button>

            <div className="project-detail-visual" aria-hidden="true">
              <span className="detail-glow" />
              <img
                className="detail-screen"
                src={activeProject.image}
                alt=""
              />
              <span className="detail-pill detail-pill-one" />
              <span className="detail-pill detail-pill-two" />
            </div>

            <div className="project-detail-content">
              <p className="project-detail-type">{activeProject.type}</p>
              <h2>{activeProject.title}</h2>
              <p className="project-detail-description">{activeProject.description}</p>
              {renderTechStack(activeProject.technologies)}
              <ul>
                {activeProject.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        )}
      </div>
    </section>
  );
};

export default Projects;
