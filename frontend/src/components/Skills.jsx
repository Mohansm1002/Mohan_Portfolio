import cssLogo from '../assets/CSS3_logo.png';
import htmlLogo from '../assets/HTML5-logo.png';
import javaLogo from '../assets/java-logo.svg';
import javascriptLogo from '../assets/javascript-logo.webp';
import pythonLogo from '../assets/Python-logo.png';
import reactLogo from '../assets/React-logo.png';
import sqlLogo from '../assets/Sql_logo.png';
import './Skills.css';

const technicalSkills = [
  { name: 'Java', level: 90, icon: 'Java', image: javaLogo },
  { name: 'HTML', level: 90, icon: 'HTML', image: htmlLogo },
  { name: 'CSS', level: 90, icon: 'CSS', image: cssLogo },
  { name: 'Python', level: 80, icon: 'Python', image: pythonLogo },
  { name: 'MySQL', level: 80, icon: 'SQL', image: sqlLogo },
  { name: 'JavaScript', level: 70, icon: 'JavaScript', image: javascriptLogo },
  { name: 'React.js', level: 70, icon: 'React', image: reactLogo },
  
];

const professionalSkills = [
  { name: 'Time Management', level: 90 },
  { name: 'Teamwork', level: 85 },
  { name: 'Communication', level: 75 },
  { name: 'Problem Solving', level: 75 },
];

const Skills = () => (
  <section id="skills" className="skills-section scroll-reveal">
    <h2 className="skills-title">My <span>Skills</span></h2>

    <div className="skills-grid">
      <div className="technical-skills">
        <h3>Technical Skills</h3>
        <div className="technical-list">
          {technicalSkills.map((skill) => (
            <div className="tech-skill" key={skill.name}>
              <div className="skill-icon" data-icon={skill.icon}>
                {skill.image ? <img src={skill.image} alt="" /> : skill.icon}
              </div>
              <div className="skill-row">
                <span>{skill.name}</span>
                <strong>{skill.level}%</strong>
              </div>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{ '--level': `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="professional-skills">
        <h3>Professional Skills</h3>
        <div className="circle-grid">
          {professionalSkills.map((skill) => (
            <div className="circle-skill" key={skill.name}>
              <div
                className="circle-progress"
                style={{ '--level': `${skill.level * 3.6}deg` }}
              >
                <span>{skill.level}%</span>
              </div>
              <p>{skill.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
