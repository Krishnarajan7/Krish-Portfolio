import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const Stars = ({ isDarkMode }) => {
  const starsRef = useRef(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!starsRef.current) return;
    
    const canvas = starsRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full screen without overflow
    const resizeCanvas = () => {
      // Important: Use clientWidth/clientHeight to avoid overflow
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
      drawStars();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create stars with improved placement
    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Only draw stars in dark mode
      if (!isDarkMode) return;
      
      // Further reduced density for better visual experience and performance on mobile
      const starCount = isMobile 
        ? Math.floor((canvas.width * canvas.height) / 18000) // Even fewer stars on mobile 
        : Math.floor((canvas.width * canvas.height) / 10000);
      
      // Create more intelligent buffer zones around UI elements
      const avoidAreas = [
        // Navbar area
        { x: 0, y: 0, width: canvas.width, height: 120 },
        
        // Hero section - wider buffer
        { x: 0, y: 120, width: canvas.width, height: 600 },
        
        // About section - dynamic based on device
        { x: 0, y: 730, width: canvas.width, height: 650 },
        
        // Skills section headers and content - expanded avoidance
        { x: 0, y: 1330, width: canvas.width, height: 700 },
        
        // Skills section card titles and star icons - specific zones
        { x: 0, y: 1400, width: canvas.width, height: 100 },
        { x: 0, y: 1500, width: canvas.width, height: 100 },
        { x: 0, y: 1600, width: canvas.width, height: 100 },
        
        // Additional Technologies section
        { x: 0, y: 1880, width: canvas.width, height: 350 },
        
        // Projects header
        { x: 0, y: 2130, width: canvas.width, height: 200 },
        
        // Projects content - expanded
        { x: 0, y: 2280, width: canvas.width, height: 900 },
        
        // Contact section
        { x: 0, y: 3080, width: canvas.width, height: 700 },
        
        // Footer buffer
        { x: 0, y: canvas.height - 200, width: canvas.width, height: 200 },
      ];
      
      function isInAvoidArea(x, y) {
        for (let area of avoidAreas) {
          if (x >= area.x && x <= area.x + area.width && 
              y >= area.y && y <= area.y + area.height) {
            return true;
          }
        }
        return false;
      }
      
      let attempts = 0;
      const maxAttempts = starCount * 5; // Prevent infinite loop
      let starsPlaced = 0;
      
      while (starsPlaced < starCount && attempts < maxAttempts) {
        attempts++;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        if (!isInAvoidArea(x, y)) {
          // Use smaller stars on mobile for better performance and appearance
          const radius = isMobile ? Math.random() * 0.7 : Math.random() * 1.2;
          const opacity = Math.random() * 0.5 + 0.2;
          
          // Enhanced twinkling effect with different frequencies
          if (starsPlaced % 5 === 0) { 
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * (0.5 + Math.sin(Date.now() * 0.0001 + starsPlaced) * 0.5)})`;
            ctx.fill();
          } else if (starsPlaced % 7 === 0) {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity * (0.6 + Math.cos(Date.now() * 0.00012 + starsPlaced) * 0.4)})`;
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.fill();
          }
          
          // Add 'special' stars with a subtle glow - less frequent on mobile
          if (!isMobile && starsPlaced % 50 === 0) {
            ctx.beginPath();
            const glowRadius = radius * 4;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
            gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`);
            gradient.addColorStop(1, 'rgba(155, 135, 245, 0)');
            ctx.fillStyle = gradient;
            ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Add rare large stars with special glow - disable on mobile
          if (!isMobile && starsPlaced % 100 === 0) {
            ctx.beginPath();
            const specialGlowRadius = radius * 6;
            const specialGradient = ctx.createRadialGradient(x, y, 0, x, y, specialGlowRadius);
            specialGradient.addColorStop(0, `rgba(220, 220, 255, ${opacity * 0.9})`);
            specialGradient.addColorStop(0.5, `rgba(180, 180, 255, ${opacity * 0.5})`);
            specialGradient.addColorStop(1, 'rgba(100, 100, 255, 0)');
            ctx.fillStyle = specialGradient;
            ctx.arc(x, y, specialGlowRadius, 0, Math.PI * 2);
            ctx.fill();
          }
          
          starsPlaced++;
        }
      }
      
      requestAnimationFrame(drawStars);
    }
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode, isMobile]);
  
  return (
    <canvas 
      ref={starsRef} 
      className="fixed top-0 left-0 w-screen h-full z-[-1] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default Stars;
