/**
 * Seed & Fallback Data for S.Thirukumaran's Portfolio
 * Matches all specifications and content requested by the user.
 */

const seedPortfolioData = {
  profile: {
    name: 'S.Thirukumaran',
    role: 'Full Stack Developer',
    location: 'India',
    shortDescription:
      'A passionate Full Stack Developer from India who loves building modern websites, responsive web applications, backend systems, and interactive digital experiences.',
    aboutParagraph:
      'Hi This is S.Thirukumaran who is passionating in coding and acting as a Full Stack Developer. I used to go Badminton class for my happiness and passion in that sports. I completed my schooling in S.T.Johns Se Sec School and Jr College in Mandaveli. Currently pursuing BE-CSE in SRM Easwari Engineering College.',
    typingRoles: [
      'Full Stack Developer',
      'React Developer',
      'Frontend Developer',
      'Node.js Developer',
    ],
    contactEmail: 'thirus1712@gmail.com',
    contactPhone: '8838010780',
    socials: {
      github: 'https://github.com/thirus1712',
      linkedin: 'https://linkedin.com/in/thirukumaran-s',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  techStackCards: [
    {
      id: 1,
      category: 'Frontend',
      icon: 'code',
      technologies: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'React.js'],
    },
    {
      id: 2,
      category: 'Backend',
      icon: 'server',
      technologies: ['Node.js', 'Express.js'],
    },
    {
      id: 3,
      category: 'Database',
      icon: 'database',
      technologies: ['MySQL', 'MongoDB'],
    },
    {
      id: 4,
      category: 'Deployment',
      icon: 'cloud',
      technologies: ['Vercel Hosting Platform'],
    },
  ],
  skills: {
    frontend: [
      { name: 'React.js', percentage: 92 },
      { name: 'Node.js', percentage: 88 },
      { name: 'JavaScript (ES6)', percentage: 95 },
      { name: 'HTML5', percentage: 98 },
      { name: 'CSS3', percentage: 94 },
      { name: 'Bootstrap', percentage: 88 },
    ],
    backend: [
      { name: 'SQL', percentage: 87 },
      { name: 'MongoDB', percentage: 90 },
      { name: 'MySQL', percentage: 89 },
    ],
  },
  experience: [
    {
      id: 1,
      role: 'Full Stack Developer',
      company: 'CodeAlpha',
      period: 'Internship / Developer',
      description:
        'Worked as a Full Stack Developer at CodeAlpha. Responsibilities included building responsive web applications using React.js, JavaScript, Node.js, Express.js, MongoDB, and SQL. Developed frontend interfaces and backend APIs.',
    },
  ],
  education: [
    {
      id: 1,
      type: 'College',
      degree: 'BE – Computer Science and Engineering',
      institution: 'SRM Easwari Engineering College',
      location: 'Ramapuram, Chennai',
      status: 'Currently Pursuing',
    },
    {
      id: 2,
      type: 'Schooling',
      degree: 'Senior Secondary & Higher Secondary',
      institution: 'S.T.Johns Se Sec School and Jr College',
      location: 'Mandaveli, Chennai',
      status: 'Completed',
    },
  ],
  services: [
    {
      id: 1,
      title: 'Web Design',
      icon: 'code',
      description:
        'Design modern responsive websites using HTML, CSS, JavaScript and React with beautiful UI and responsive layouts.',
    },
    {
      id: 2,
      title: 'UI/UX Design',
      icon: 'palette',
      description:
        'Create attractive user interfaces, responsive layouts, wireframes, animations, and interactive user experiences.',
    },
    {
      id: 3,
      title: 'App Design',
      icon: 'smartphone',
      description:
        'Design interactive mobile applications and responsive web applications with modern user-centered design principles.',
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Social Media App',
      tag: 'Social Media Mobile App',
      description:
        'A modern social networking application connecting people through messaging, sharing, communities, and real-time interactions.',
      image: '/images/project_social.jpg',
      technologies: ['React.js', 'Node.js', 'Express', 'MongoDB'],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 2,
      title: 'Music App',
      tag: 'Music Streaming App',
      description:
        'A music streaming application with playlists, albums, favorites, personalized recommendations, and modern audio experience.',
      image: '/images/project_music.jpg',
      technologies: ['React.js', 'Node.js', 'Web Audio API', 'MySQL'],
      demoUrl: '#',
      githubUrl: '#',
    },
    {
      id: 3,
      title: 'Online Shopping App',
      tag: 'Online Shopping App',
      description:
        'An e-commerce shopping application with product catalog, secure checkout, shopping cart, order tracking, and payment integration.',
      image: '/images/project_ecommerce.jpg',
      technologies: ['React.js', 'Express.js', 'MongoDB', 'Stripe'],
      demoUrl: '#',
      githubUrl: '#',
    },
  ],
};

module.exports = { seedPortfolioData };
