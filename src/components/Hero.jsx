import './Hero.css';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hi, my name is</p>
        <h1 className="hero-name">Adrian</h1>
        <h2 className="hero-title">
          I turn <span className="highlight">data</span> into{' '}
          <span className="highlight">insights</span>
        </h2>
        <p className="hero-description">
          Aspiring Data Scientist / Data Analyst passionate about transforming 
          raw data into meaningful insights. Exploring machine learning, 
          data visualization, and statistical analysis.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => scrollToSection('projects')}>
            View My Work
          </button>
          <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
            Get In Touch
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">6+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number">53+</span>
            <span className="stat-label">Contributions</span>
          </div>
          <div className="stat">
            <span className="stat-number">4</span>
            <span className="stat-label">Followers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
