import profileImg from '../assets/hero.png';
import { defaultProfile } from '../portfolio/defaultData.js';
import './About.css';

const About = ({ profile = defaultProfile }) => (
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
      <h3>{profile.aboutHeading}</h3>
      <p>{profile.aboutParagraphOne}</p>
      <p>{profile.aboutParagraphTwo}</p>
      <a className="button about-button" href={profile.resumeLink || '#contact'}>More About Me</a>
    </div>
  </section>
);

export default About;
