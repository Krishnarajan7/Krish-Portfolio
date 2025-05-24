import React, { useEffect, useRef } from 'react';

const RevolvingMoon = ({ isDarkMode }) => {
  const moonRef = useRef(null);
  
  useEffect(() => {
    if (!moonRef.current || !isDarkMode) return;
    
    const updateMoonPosition = () => {
      if (!moonRef.current) return;
      
      const now = Date.now() / 10000; // Slowed down rotation for smoother motion
      const radius = 150; // Distance from center
      const x = Math.cos(now) * radius;
      const y = Math.sin(now) * radius;
      
      // Added z-index control to prevent overlap issues
      moonRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${now * 15}deg)`;
      
      requestAnimationFrame(updateMoonPosition);
    };
    
    const animationId = requestAnimationFrame(updateMoonPosition);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);
  
  // Return null for the RevolvingMoon component in the main layout
  // It will only be shown when explicitly included in About.jsx
  return null;
};

export default RevolvingMoon;
