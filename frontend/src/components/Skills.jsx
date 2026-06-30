import { useEffect, useRef, useState } from 'react';
import { getProfessionalSkills, getSkills } from '../api/portfolioApi.js';
import {
  defaultProfessionalSkills,
  defaultTechnicalSkills,
  resolveImage,
} from '../portfolio/defaultData.js';
import './Skills.css';

const clampLevel = (level) => {
  const numericLevel = Number(level);

  if (!Number.isFinite(numericLevel)) {
    return 0;
  }

  return Math.min(100, Math.max(0, numericLevel));
};

const getSkillKey = (skill, index) => {
  if (skill?.id !== undefined && skill?.id !== null) {
    return `skill-${skill.id}`;
  }

  return `${skill?.name || 'skill'}-${index}`;
};

const createLevelMap = (skills, progress = 0) =>
  skills.reduce((levels, skill, index) => {
    levels[getSkillKey(skill, index)] = Math.round(clampLevel(skill.level) * progress);
    return levels;
  }, {});

const getSkillsSignature = (skills) =>
  skills
    .map((skill) =>
      [
        skill?.name || '',
        clampLevel(skill?.level),
        skill?.icon || '',
        skill?.imageKey || '',
        skill?.imageUrl || '',
      ].join(':')
    )
    .join('|');

const keepIfSameSkills = (currentSkills, nextSkills) =>
  getSkillsSignature(currentSkills) === getSkillsSignature(nextSkills)
    ? currentSkills
    : nextSkills;

const Skills = () => {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [technicalSkills, setTechnicalSkills] = useState(defaultTechnicalSkills);
  const [professionalSkills, setProfessionalSkills] = useState(defaultProfessionalSkills);
  const [skillsStatus, setSkillsStatus] = useState('');
  const [technicalLevels, setTechnicalLevels] = useState({});
  const [professionalLevels, setProfessionalLevels] = useState({});

  useEffect(() => {
    let isMounted = true;

    Promise.all([getSkills(), getProfessionalSkills()])
      .then(([technicalData, professionalData]) => {
        if (!isMounted) {
          return;
        }

        setProfessionalSkills((currentSkills) =>
          keepIfSameSkills(
            currentSkills,
            professionalData.length ? professionalData : defaultProfessionalSkills
          )
        );
        setTechnicalSkills((currentSkills) =>
          keepIfSameSkills(
            currentSkills,
            technicalData.length ? technicalData : defaultTechnicalSkills
          )
        );
        setSkillsStatus('');
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setTechnicalSkills(defaultTechnicalSkills);
        setProfessionalSkills(defaultProfessionalSkills);
        setSkillsStatus('Skills API unavailable. Showing saved fallback content.');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return undefined;
    }

    const revealSkills = () => {
      if (!hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        setSkillsVisible(true);
      }
    };

    if (section.classList.contains('is-visible')) {
      revealSkills();
    }

    const checkCurrentPosition = () => {
      const rect = section.getBoundingClientRect();

      if (rect.top < window.innerHeight * 0.88 && rect.bottom > 0) {
        revealSkills();
      }
    };

    const visibilityFrame = requestAnimationFrame(checkCurrentPosition);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealSkills();
        }
      },
      { rootMargin: '0px 0px 1% 0px', threshold: 0.05 }
    );

    observer.observe(section);

    const mutationObserver = new MutationObserver(() => {
      if (section.classList.contains('is-visible')) {
        revealSkills();
      }
    });

    mutationObserver.observe(section, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(visibilityFrame);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!skillsVisible) {
      return undefined;
    }

    const prefersReducedMotion =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

    let animationFrame;
    let resetFrame;

    resetFrame = requestAnimationFrame(() => {
      setTechnicalLevels(createLevelMap(technicalSkills, 0));
      setProfessionalLevels(createLevelMap(professionalSkills, 0));

      if (prefersReducedMotion) {
        animationFrame = requestAnimationFrame(() => {
          setTechnicalLevels(createLevelMap(technicalSkills, 1));
          setProfessionalLevels(createLevelMap(professionalSkills, 1));
        });
        return;
      }

      const duration = 1600;
      const startedAt = performance.now();

      const animateLevels = (now) => {
        const elapsed = now - startedAt;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setTechnicalLevels(createLevelMap(technicalSkills, easedProgress));
        setProfessionalLevels(createLevelMap(professionalSkills, easedProgress));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateLevels);
        }
      };

      animationFrame = requestAnimationFrame(animateLevels);
    });

    return () => {
      cancelAnimationFrame(resetFrame);

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [skillsVisible, technicalSkills, professionalSkills]);

  return (
    <section
      id="skills"
      className={`skills-section scroll-reveal ${skillsVisible ? 'skills-animated' : ''}`}
      ref={sectionRef}
    >
      <h2 className="skills-title">My <span>Skills</span></h2>
      {skillsStatus && <p className="portfolio-data-status">{skillsStatus}</p>}

      <div className="skills-grid">
        <div className="technical-skills">
          <h3>Technical Skills</h3>
          <div className="technical-list">
            {technicalSkills.map((skill, index) => {
              const skillKey = getSkillKey(skill, index);
              const skillLevel = clampLevel(skill.level);
              const animatedLevel = technicalLevels[skillKey] ?? 0;
              const imageSrc = resolveImage(skill);

              return (
                <div
                  className="tech-skill"
                  key={skillKey}
                  style={{ '--skill-index': index }}
                >
                  <div className="skill-icon" data-icon={skill.icon}>
                    {imageSrc ? <img src={imageSrc} alt="" /> : skill.icon}
                  </div>
                  <div className="skill-row">
                    <span>{skill.name}</span>
                    <strong>{animatedLevel}%</strong>
                  </div>
                  <div className="skill-track">
                    <div
                      className="skill-fill"
                      style={{
                        '--level': `${skillLevel}%`,
                        '--animated-level': `${animatedLevel}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="professional-skills">
          <h3>Professional Skills</h3>
          <div className="circle-grid">
            {professionalSkills.map((skill, index) => {
              const skillKey = getSkillKey(skill, index);
              const skillLevel = clampLevel(skill.level);
              const animatedLevel = professionalLevels[skillKey] ?? 0;

              return (
                <div
                  className="circle-skill"
                  key={skillKey}
                  style={{ '--skill-index': index }}
                >
                  <div
                    className="circle-progress"
                    style={{
                      '--level': `${animatedLevel * 3.6}deg`,
                      '--final-level': `${skillLevel * 3.6}deg`,
                    }}
                  >
                    <span>{animatedLevel}%</span>
                  </div>
                  <p>{skill.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
