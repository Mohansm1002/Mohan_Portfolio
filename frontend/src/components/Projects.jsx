import { useEffect, useState } from 'react';
import { getProjects } from '../api/portfolioApi.js';
import { defaultProjects, resolveImage } from '../portfolio/defaultData.js';
import './Projects.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [projectsStatus, setProjectsStatus] = useState('Loading projects...');

  const renderTechStack = (technologies) => (
    <div className="project-tech-stack">
      {(technologies || []).map((tech) => (
        <span className="project-tech-chip" key={tech.name}>
          <span
            className={`project-tech-icon project-tech-icon-${tech.className}`}
            aria-hidden="true"
          >
            {resolveImage(tech) ? <img src={resolveImage(tech)} alt="" /> : tech.name}
          </span>
          {tech.name}
        </span>
      ))}
    </div>
  );

  useEffect(() => {
    let isMounted = true;

    getProjects()
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setProjects(data.length ? data : defaultProjects);
        setProjectsStatus('');
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setProjects(defaultProjects);
        setProjectsStatus('Projects API unavailable. Showing saved fallback content.');
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
      {projectsStatus && <p className="portfolio-data-status">{projectsStatus}</p>}

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
              <img src={resolveImage(project)} alt="" />
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
                src={resolveImage(activeProject)}
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
                {(activeProject.highlights || []).map((highlight) => (
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
