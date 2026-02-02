import { useEffect, useRef } from 'react';
import './StarfieldBackground.css';

const StarfieldBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 1500);
      console.log('Creating stars:', numStars, 'Canvas size:', canvas.width, 'x', canvas.height);
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseRadius: Math.random() * 2 + 1,
          radius: Math.random() * 2 + 1,
          baseOpacity: Math.random() * 0.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.003 + 0.001,
          twinkleOffset: Math.random() * Math.PI * 2,
          glowIntensity: 0,
        });
      }
    };

    const draw = (timestamp) => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const hoverRadius = 150;

      stars.forEach((star) => {
        const dx = star.x - mouseX;
        const dy = star.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetRadius = star.baseRadius;
        let targetOpacity = star.baseOpacity;
        let targetGlow = 0;

        if (distance < hoverRadius) {
          const intensity = 1 - (distance / hoverRadius);
          targetRadius = star.baseRadius + intensity * 5;
          targetOpacity = Math.min(1, star.baseOpacity + intensity * 0.6);
          targetGlow = intensity;
        }

        star.radius += (targetRadius - star.radius) * 0.12;
        star.opacity += (targetOpacity - star.opacity) * 0.12;
        star.glowIntensity += (targetGlow - star.glowIntensity) * 0.12;

        const twinkle = Math.sin(timestamp * star.twinkleSpeed + star.twinkleOffset) * 0.15 + 0.85;
        const finalOpacity = star.opacity * twinkle;

        if (star.glowIntensity > 0.02) {
          const glowRadius = star.radius * 10;
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowRadius);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.glowIntensity * 0.5})`);
          gradient.addColorStop(0.2, `rgba(200, 220, 255, ${star.glowIntensity * 0.25})`);
          gradient.addColorStop(0.5, `rgba(150, 180, 255, ${star.glowIntensity * 0.08})`);
          gradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      setCanvasSize();
      createStars();
    };

    setCanvasSize();
    createStars();
    animationId = requestAnimationFrame(draw);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield-background" />;
};

export default StarfieldBackground;
