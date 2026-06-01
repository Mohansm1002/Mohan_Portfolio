import profileImg from '../assets/hero.png';
import './About.css';

const About = () => (
  <section id="about" className="about-section scroll-reveal">
    <div className="about-visual">
      <div className="about-orbit">
        <div className="about-ring">
          <img src={profileImg} alt="Mohan profile" />
        </div>
      </div>
    </div>

    <div className="about-content">
      <h2>About <span>Me</span></h2>
      <h3>Full Stack Developer!</h3>
      <p>
        I am a B.Tech Information Technology student from Francis Xavier
        Engineering College with strong interest in frontend development and
        full-stack application building. I enjoy turning ideas into clean,
        responsive interfaces using HTML, CSS, JavaScript, and React.js.
      </p>
      <p>
        Through my internship at Wizbees Technologies and academic projects, I
        have built food delivery, ticket booking, and machine learning based
        applications while practicing problem-solving, time management, and
        user-focused design.
      </p>
      <a className="button about-button" href="#contact">More About Me</a>
    </div>
  </section>
);

export default About;
