import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './Achievements.css';

const Achievements = () => {
  const [showCert, setShowCert] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const certifications = [
    {
      id: 1,
      title: 'Data Science - Python Certificate (30 hours)',
      issuer: 'Direcho Trabaho',
      date: '2025',
      icon: '📜',
      pdf: '/certifications/Lee Adrian Norona - Certificate of Completion.pdf',
      description: 'Data Pre-processing, Excel Fundamentals & Advanced Formulas, Data Analysis and Visualization, Data Entry Techniques, Visual Encoding, SQL & Python Fundamentals, Capstone Project',
    },
  ];

  const achievements = [
    {
      id: 1,
      title: 'GitHub Contributor',
      description: 'Active contributor to multiple open-source projects',
      icon: '💻',
    },
    {
      id: 2,
      title: 'Emergency App Developer',
      description: 'Co-developed E-Alert App for emergency responders',
      icon: '🚨',
    },
    {
      id: 3,
      title: 'Web App Developer',
      description: 'Contributed to UniSync university web application',
      icon: '🎓',
    },
    {
      id: 4,
      title: 'Data Science Enthusiast',
      description: 'Completed multiple data science projects and courses',
      icon: '📊',
    },
  ];

  const openCertificate = (cert) => {
    setSelectedCert(cert);
    setShowCert(true);
  };

  const closeCertificate = () => {
    setShowCert(false);
    setSelectedCert(null);
  };

  return (
    <section id="achievements" className={`achievements ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
      <div className="achievements-container">
        <h2 className="section-title">
          <span className="title-number">03.</span> Achievements
        </h2>

        <div className="achievements-content">
          <div className="certifications-section">
            <h3 className="subsection-title">Certifications</h3>
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <div 
                  key={cert.id} 
                  className="cert-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                  onClick={() => openCertificate(cert)}
                >
                  <span className="cert-icon">{cert.icon}</span>
                  <div className="cert-info">
                    <h4 className="cert-title">{cert.title}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <span className="cert-view">View Certificate →</span>
                </div>
              ))}
            </div>
          </div>

          <div className="awards-section">
            <h3 className="subsection-title">Accomplishments</h3>
            <div className="awards-grid">
              {achievements.map((achievement, index) => (
                <div 
                  key={achievement.id} 
                  className="award-card"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <span className="award-icon">{achievement.icon}</span>
                  <h4 className="award-title">{achievement.title}</h4>
                  <p className="award-description">{achievement.description}</p>
                </div>
              ))}
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">53+</span>
                <span className="stat-label">GitHub Contributions</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">6+</span>
                <span className="stat-label">Repositories</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">4</span>
                <span className="stat-label">Collaborators</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCert && selectedCert && createPortal(
        <div className="cert-modal-overlay" onClick={closeCertificate}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={closeCertificate}>
              ✕
            </button>
            <h3 className="cert-modal-title">{selectedCert.title}</h3>
            <p className="cert-modal-issuer">{selectedCert.issuer} • {selectedCert.date}</p>
            <p className="cert-modal-description">{selectedCert.description}</p>
            <div className="cert-pdf-container">
              <iframe 
                src={`${selectedCert.pdf}#toolbar=0&navpanes=0`}
                title={selectedCert.title}
                className="cert-pdf-viewer"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Achievements;
