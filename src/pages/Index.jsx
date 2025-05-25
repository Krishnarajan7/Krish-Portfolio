import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Stars from '../components/Stars';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ThemeToggle from '../components/ThemeToggle';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    }
  };

  useEffect(() => {
    // Set initial theme class
    document.body.classList.add('dark-mode');
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    // Simulate complete loading
    const timer = setTimeout(() => {
      clearInterval(interval);
      setLoadingProgress(100);
      setTimeout(() => setIsLoading(false), 500);
    }, 1800);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-space-darker overflow-hidden">
        <div className="relative flex flex-col items-center">
          {/* Improved loading animation with container */}
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Outer ring with gradient */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-space-accent border-r-space-nebula animate-spin" 
                style={{ animationDuration: '3s' }}></div>
            
            {/* Middle spinning ring */}
            <div className="absolute inset-[8px] rounded-full border-2 border-space-nebula/30 border-b-space-nebula animate-spin" 
                style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            
            {/* Inner ring with pulsing effect */}
            <div className="absolute inset-[20px] rounded-full border-[3px] border-white/10 animate-pulse-glow"></div>
            
            {/* Perfectly centered KR logo */}
            <div className="relative w-16 h-16 rounded-full bg-space-darker flex items-center justify-center z-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-space-accent/20 to-space-nebula/20 animate-pulse-slow"></div>
              <span className="text-white text-2xl font-bold">KR</span>
            </div>
          </div>
          
          {/* Loading progress bar */}
          <div className="mt-8 w-64 h-1.5 bg-space-light/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-space-accent to-space-nebula rounded-full transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          
          {/* Loading text with staggered dots animation */}
          <div className="mt-4 text-space-accent text-lg font-medium">
            <span className="inline-block">Loading</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
            <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>.</span>
          </div>
          
          {/* Background stars with better positioning */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
            {[...Array(50)].map((_, i) => {
              // Create a more even star distribution using polar coordinates
              const angle = (i / 50) * Math.PI * 2;
              // Vary the distance from center to create better distribution
              const distance = Math.random() * 200 + 150;
              // Calculate positions using sine and cosine
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              return (
                <div 
                  key={i}
                  className="absolute bg-white rounded-full"
                  style={{
                    top: `calc(50% + ${y}px)`,
                    left: `calc(50% + ${x}px)`,
                    width: `${Math.random() * 2.5 + 1}px`,
                    height: `${Math.random() * 2.5 + 1}px`,
                    opacity: Math.random() * 0.7 + 0.3,
                    animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Stars isDarkMode={isDarkMode} />
      <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Navbar isDarkMode={isDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Skills isDarkMode={isDarkMode} />
      <Projects isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />

      {/* Add some style to the scrollbar */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? '#0F1729' : '#F0F4F8'};
        }
        
        ::-webkit-scrollbar-thumb {
          background: #7E69AB;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #9b87f5;
        }
        
        @keyframes gradient-slide {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }
        
        .skill-bar-animation {
          width: var(--skill-percent);
          animation: skill-bar-progress 1.5s ease-out forwards;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Index;
