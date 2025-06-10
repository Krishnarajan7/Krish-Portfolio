import React, { useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const BackgroundDetails = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Create floating elements
    const elements = [];
    const elementCount = isMobile ? 15 : 25;
    
    // Initialize elements
    for (let i = 0; i < elementCount; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (isMobile ? 3 : 5) + 2,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        type: Math.random() > 0.7 ? 'square' : 'circle',
        pulsePhase: Math.random() * Math.PI * 2,
        color: isDarkMode ? 'rgba(155, 135, 245, ' : 'rgba(59, 130, 246, '
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isDarkMode) {
        // Only show elements in dark mode to avoid cluttering light mode
        requestAnimationFrame(animate);
        return;
      }
      
      elements.forEach(element => {
        // Update position
        element.x += element.vx;
        element.y += element.vy;
        
        // Bounce off edges
        if (element.x < 0 || element.x > canvas.width) element.vx *= -1;
        if (element.y < 0 || element.y > canvas.height) element.vy *= -1;
        
        // Keep within bounds
        element.x = Math.max(0, Math.min(canvas.width, element.x));
        element.y = Math.max(0, Math.min(canvas.height, element.y));
        
        // Pulse effect
        element.pulsePhase += 0.02;
        const pulseOpacity = element.opacity * (0.5 + Math.sin(element.pulsePhase) * 0.5);
        
        // Draw element
        ctx.save();
        
        if (element.type === 'circle') {
          // Bubble/circle
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2);
          ctx.fillStyle = element.color + pulseOpacity + ')';
          ctx.fill();
          
          // Add subtle glow
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = element.color + (pulseOpacity * 0.3) + ')';
          ctx.fill();
        } else {
          // Square/diamond
          ctx.translate(element.x, element.y);
          ctx.rotate(element.pulsePhase * 0.5);
          ctx.fillStyle = element.color + pulseOpacity + ')';
          ctx.fillRect(-element.radius/2, -element.radius/2, element.radius, element.radius);
          
          // Add border
          ctx.strokeStyle = element.color + (pulseOpacity * 0.8) + ')';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(-element.radius/2, -element.radius/2, element.radius, element.radius);
        }
        
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isDarkMode, isMobile]);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-screen h-full z-[-2] pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Additional CSS-based details */}
      {isDarkMode && (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          {/* Floating geometric shapes */}
          <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-space-accent/20 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-[20%] right-[10%] w-1 h-1 bg-space-nebula/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-[40%] left-[15%] w-1.5 h-1.5 bg-space-accent/15 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-[60%] right-[20%] w-1 h-1 bg-space-nebula/25 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-[80%] left-[25%] w-2 h-2 bg-space-accent/10 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-[30%] right-[30%] w-1 h-1 bg-space-nebula/20 rounded-full animate-float" style={{ animationDelay: '5s' }}></div>
          
          {/* Subtle gradient overlays */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-space-accent/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-space-nebula/5 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-radial from-space-accent/3 to-transparent rounded-full blur-3xl"></div>
        </div>
      )}
    </>
  );
};

export default BackgroundDetails;
