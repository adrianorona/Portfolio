import React from 'react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'UniSync Web App',
      description: 'A revamped university synchronization web application for better student and faculty collaboration and management.',
      tech: ['JavaScript', 'React', 'Node.js'],
      image: '🎓',
      github: 'https://github.com/adrianorona/unisync-web-app',
      demo: '#',
    },
    {
      id: 2,
      title: 'E-Alert App',
      description: 'Emergency App alert for responders that shows real-time location with Chat and Call features for quick emergency response.',
      tech: ['JavaScript', 'React Native', 'Firebase'],
      image: '🚨',
      github: 'https://github.com/adrianorona/e-alert-app',
      demo: '#',
    },
    {
      id: 3,
      title: 'Direcho Trabaho Data Science Course',
      description: 'Data Science course projects and exercises covering data analysis, visualization, and machine learning concepts.',
      tech: ['Python', 'Jupyter Notebook', 'Pandas', 'Matplotlib'],
      image: '📊',
      github: 'https://github.com/adrianorona/Direcho-Trabaho-Data-Science-Course',
      demo: '#',
    },
    {
      id: 4,
      title: 'Ramenila Main',
      description: 'A web application project for a ramen restaurant management and ordering system.',
      tech: ['JavaScript', 'React', 'CSS'],
      image: '🍜',
      github: 'https://github.com/adrianorona/ramenilaMain',
      demo: '#',
    },
    {
      id: 5,
      title: 'Portfolio Website',
      description: 'Personal portfolio website showcasing projects, skills, and professional experience.',
      tech: ['HTML', 'CSS', 'JavaScript'],
      image: '💼',
      github: 'https://github.com/adrianorona/Portfolio',
      demo: 'https://adrianorona.github.io/',
    },
    {
      id: 6,
      title: 'Data Visualization Projects',
      description: 'Collection of data visualization and dashboard projects using Power BI and Python libraries.',
      tech: ['Python', 'Power BI', 'Seaborn', 'Plotly'],
      image: '📈',
      github: 'https://github.com/adrianorona',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <h2 className="section-title">
          <span className="title-number">02.</span> Projects
        </h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-header">
                <span className="project-icon">{project.image}</span>
                <div className="project-links">
                  <a href={project.github} className="project-link" aria-label="GitHub">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                  <a href={project.demo} className="project-link" aria-label="Demo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
