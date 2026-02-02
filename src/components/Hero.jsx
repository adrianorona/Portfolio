import { useState, useEffect, useRef } from 'react';
import './Hero.css';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef(null);
  const fullText = 'I turn data into insights';

  // Typing effect
  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText(fullText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 80);
      return () => clearInterval(interval);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Counter animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Count up animation component
  const CountUp = ({ end, suffix = '' }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!countersStarted) return;
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [countersStarted, end]);
    
    return <>{count}{suffix}</>;
  };

  // Render typed text with highlights
  const renderTypedText = () => {
    const dataIndex = fullText.indexOf('data');
    const insightsIndex = fullText.indexOf('insights');
    
    return (
      <>
        {displayText.split('').map((char, i) => {
          const isData = i >= dataIndex && i < dataIndex + 4;
          const isInsights = i >= insightsIndex && i < insightsIndex + 8;
          return (
            <span key={i} className={isData || isInsights ? 'highlight' : ''}>
              {char}
            </span>
          );
        })}
        <span className={`cursor ${showCursor ? 'visible' : ''}`}>|</span>
      </>
    );
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-greeting">Hi, my name is</p>
        <h1 className="hero-name">Adrian</h1>
        <h2 className="hero-title">{renderTypedText()}</h2>
        <p className="hero-description">
          Aspiring Data Scientist / Data Analyst passionate about transforming 
          raw data into meaningful insights. Exploring machine learning, 
          data visualization, and statistical analysis.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={() => scrollToSection('projects')}>
            <span>View My Work</span>
          </button>
          <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
            <span>Get In Touch</span>
          </button>
        </div>
        <div className="hero-stats" ref={statsRef}>
          <div className="stat">
            <span className="stat-number"><CountUp end={6} suffix="+" /></span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="stat">
            <span className="stat-number"><CountUp end={53} suffix="+" /></span>
            <span className="stat-label">Contributions</span>
          </div>
          <div className="stat">
            <span className="stat-number"><CountUp end={4} /></span>
            <span className="stat-label">Followers</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
