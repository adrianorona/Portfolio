import React from 'react';
import './About.css';

const About = () => {
  const skills = [
    { name: 'Python', level: 85 },
    { name: 'Data Analysis', level: 80 },
    { name: 'Machine Learning', level: 75 },
    { name: 'Data Visualization', level: 82 },
    { name: 'SQL', level: 78 },
    { name: 'JavaScript', level: 70 },
  ];

  const tools = [
    'Python', 'Pandas', 'NumPy', 'Matplotlib', 
    'Seaborn', 'Scikit-learn', 'Jupyter Notebook', 'Power BI',
    'SQL', 'JavaScript', 'Git', 'GitHub'
  ];

  return (
    <section id="about" className="about">
      <div className="about-container">
        <h2 className="section-title">
          <span className="title-number">01.</span> About Me
        </h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello There! I'm Adrian, an aspiring <span className="highlight">Data Scientist / Data Analyst</span>. 
              I'm passionate about transforming raw data into meaningful insights and building 
              data-driven solutions.
            </p>
            <p>
              Currently exploring <span className="highlight">machine learning</span>, 
              data visualization, and statistical analysis. I believe in the power of data 
              to transform businesses and drive meaningful decisions.
            </p>
            <p>
              My goal is to become a skilled <span className="highlight">Data Scientist</span>, 
              creating impactful visualizations and dashboards that tell compelling stories 
              through data.
            </p>

            <div className="tools-section">
              <h3>Technologies I work with:</h3>
              <ul className="tools-list">
                {tools.map((tool, index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="about-skills">
            <div className="skills-card">
              <h3>Core Skills</h3>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="experience-card">
              <div className="exp-icon">📊</div>
              <h4>Data-Driven</h4>
              <p>Passionate about turning raw data into actionable insights</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
