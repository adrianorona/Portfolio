import React from 'react';
import './About.css';

const About = () => {
  const tools = [
    { name: 'Python', icon: '🐍' },
    { name: 'Pandas', icon: '🐼' },
    { name: 'NumPy', icon: '🔢' },
    { name: 'Matplotlib', icon: '📊' },
    { name: 'Seaborn', icon: '📈' },
    { name: 'Scikit-learn', icon: '🤖' },
    { name: 'Jupyter Notebook', icon: '📓' },
    { name: 'Power BI', icon: '📉' },
    { name: 'SQL', icon: '🗃️' },
    { name: 'JavaScript', icon: '⚡' },
    { name: 'Git', icon: '🔀' },
    { name: 'GitHub', icon: '🐙' },
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

            <div className="experience-card">
              <div className="exp-icon">📊</div>
              <h4>Data-Driven</h4>
              <p>Passionate about turning raw data into actionable insights</p>
            </div>
          </div>

          <div className="about-skills">
            <div className="skills-card">
              <h3>Technologies I Work With</h3>
              <div className="tech-grid">
                {tools.map((tool, index) => (
                  <div key={index} className="tech-item">
                    <span className="tech-icon">{tool.icon}</span>
                    <span className="tech-name">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
