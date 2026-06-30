import cssLogo from '../assets/CSS3_logo.png';
import foodDeliveryImage from '../assets/food_delivery.png';
import htmlLogo from '../assets/HTML5-logo.png';
import javaLogo from '../assets/java-logo.svg';
import javaCertificate from '../assets/java_c.png';
import javascriptLogo from '../assets/javascript-logo.webp';
import laptopPriceImage from '../assets/laptop_price.png';
import mlLogo from '../assets/ML2_logo.png';
import nptelCertificate from '../assets/nptel_pyt_cer.png';
import pythonLogo from '../assets/Python-logo.png';
import pythonCertificate from '../assets/python_c.png';
import reactLogo from '../assets/React-logo.png';
import sqlLogo from '../assets/Sql_logo.png';
import trainTicketImage from '../assets/train_ticket.png';

export const imageMap = {
  css: cssLogo,
  food_delivery: foodDeliveryImage,
  html: htmlLogo,
  java: javaLogo,
  java_c: javaCertificate,
  javascript: javascriptLogo,
  laptop_price: laptopPriceImage,
  ml: mlLogo,
  nptel_pyt_cer: nptelCertificate,
  python: pythonLogo,
  python_c: pythonCertificate,
  react: reactLogo,
  sql: sqlLogo,
  train_ticket: trainTicketImage,
};

export const resolveImage = (item, fallbackKey = '') =>
  item?.imageUrl || imageMap[item?.imageKey] || imageMap[fallbackKey] || '';

export const defaultProfile = {
  heroIntro: "Hello, It's Me",
  name: 'MOHAN S',
  role: 'Frontend Developer',
  heroCopy:
    'B.Tech IT student and frontend developer skilled in HTML, CSS, JavaScript, React.js, Java, Python, and MySQL, focused on building responsive and user-friendly web applications.',
  aboutHeading: 'Full Stack Developer!',
  aboutParagraphOne:
    'I am a B.Tech Information Technology student from Francis Xavier Engineering College with strong interest in frontend development and full-stack application building. I enjoy turning ideas into clean, responsive interfaces using HTML, CSS, JavaScript, and React.js.',
  aboutParagraphTwo:
    'Through my internship at Wizbees Technologies and academic projects, I have built food delivery, ticket booking, and machine learning based applications while practicing problem-solving, time management, and user-focused design.',
  resumeLink: '#contact',
  email: 'mohansm1002@gmail.com',
  phone: '+91 6380751915',
  facebookUrl: 'https://www.facebook.com/profile.php?id=100071509903847',
  githubUrl: 'https://github.com/Mohansm1002',
  linkedinUrl:
    'https://www.linkedin.com/in/mohan-mohan-b45222259?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  instagramUrl:
    'https://www.instagram.com/__call__me__mohan_?igsh=MXd5bHpiOHBoamQxMA==',
};

export const defaultTechnicalSkills = [
  { name: 'Java', level: 90, icon: 'Java', imageKey: 'java' },
  { name: 'HTML', level: 90, icon: 'HTML', imageKey: 'html' },
  { name: 'CSS', level: 90, icon: 'CSS', imageKey: 'css' },
  { name: 'Python', level: 80, icon: 'Python', imageKey: 'python' },
  { name: 'MySQL', level: 80, icon: 'SQL', imageKey: 'sql' },
  { name: 'JavaScript', level: 70, icon: 'JavaScript', imageKey: 'javascript' },
  { name: 'React.js', level: 70, icon: 'React', imageKey: 'react' },
];

export const defaultProfessionalSkills = [
  { name: 'Time Management', level: 90 },
  { name: 'Teamwork', level: 85 },
  { name: 'Communication', level: 75 },
  { name: 'Problem Solving', level: 75 },
];

export const defaultProjects = [
  {
    title: 'Food Delivery Application',
    stack: 'HTML, CSS, React.js',
    technologies: [
      { name: 'HTML', imageKey: 'html', className: 'html' },
      { name: 'CSS', imageKey: 'css', className: 'css' },
      { name: 'React.js', imageKey: 'react', className: 'react' },
    ],
    type: 'Frontend application',
    accent: 'food',
    imageKey: 'food_delivery',
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
    technologies: [{ name: 'Java', imageKey: 'java', className: 'java' }],
    type: 'Booking system',
    accent: 'train',
    imageKey: 'train_ticket',
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
      { name: 'Python', imageKey: 'python', className: 'python' },
      { name: 'Machine Learning', imageKey: 'ml', className: 'ml' },
    ],
    type: 'Prediction model',
    accent: 'laptop',
    imageKey: 'laptop_price',
    description:
      'A machine learning application that predicts laptop prices from specifications and presents results through an interactive UI.',
    highlights: [
      'Trained a Random Forest model for improved price prediction accuracy.',
      'Prepared specification-based inputs for real-time predictions.',
      'Built a user-friendly interface for quick laptop price estimation.',
    ],
  },
];

export const defaultCertifications = [
  {
    title: 'The Joy of Computing Using Python',
    issuer: 'NPTEL (IIT Madras)',
    date: 'Jul - Oct 2024',
    score: '53%',
    duration: '12 Weeks',
    roll: 'NPTEL24CS113S853000629',
    credits: '3 or 4',
    imageKey: 'nptel_pyt_cer',
    description:
      'Learned Python programming fundamentals, data structures, problem solving and real-world applications.',
  },
  {
    title: "Cybernaut's Tech Trio Course on Java",
    issuer: 'Cybernaut Edu-Tech LLP',
    date: '25 Sep 2024',
    score: '85%',
    duration: 'Self-paced',
    roll: 'CYB-JAVA-2024',
    credits: 'Verified',
    imageKey: 'java_c',
    description:
      'Completed comprehensive Java course covering OOP, Collections, Exception Handling, and core Java concepts.',
  },
  {
    title: "Cybernaut's Tech Trio Course on Python",
    issuer: 'Cybernaut Edu-Tech LLP',
    date: '14 Nov 2024',
    score: '88%',
    duration: 'Self-paced',
    roll: 'CYB-PY-2024',
    credits: 'Verified',
    imageKey: 'python_c',
    description:
      'Completed comprehensive Python course covering data structures, problem solving and Python programming fundamentals.',
  },
];
