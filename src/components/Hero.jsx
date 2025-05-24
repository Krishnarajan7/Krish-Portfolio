import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const Hero = ({ isDarkMode }) => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-16 pb-12 flex items-center relative overflow-hidden">
      <div className="space-container grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div className="order-2 md:order-1" ref={contentRef} style={{ opacity: 0 }}>
          <div className="mb-2 inline-block">
            <div className="px-3 py-1 text-xs bg-space-accent/10 border border-space-accent/20 rounded-full text-space-accent animate-pulse-glow">
              Full Stack Developer
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-gradient">Hi, I'm Krishna Rajan</span> <span className="inline-block animate-float">👨‍🚀</span>
          </h1>
          
          <h2 className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-white/70">
            I build things for the web and beyond
            <br />
            <span className="text-gradient-purple font-medium">Exploring the tech universe</span>
          </h2>
          
          <p className="text-white/60 text-sm sm:text-base max-w-lg mb-6 sm:mb-8">
            Passionate about creating clean, efficient, and user-friendly applications that solve real-world problems. Always looking for the next challenge in the digital cosmos.
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <button 
              onClick={scrollToProjects}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-space-accent hover:bg-space-accent/90 text-white text-sm sm:text-base rounded-lg flex items-center gap-2 transition-all hover:translate-y-[-2px] hover:shadow-lg shadow-md shadow-space-accent/20"
            >
              Explore My Projects
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer" 
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-white/20 hover:border-space-accent/50 text-white text-sm sm:text-base rounded-lg flex items-center gap-2 transition-all hover:translate-y-[-2px] hover:bg-white/5 hover:shadow-md"
            >
              Download Resume
            </a>
          </div>
          
          <div className="flex items-center mt-8 sm:mt-10 space-x-4">
            <a href="https://github.com/Krishnarajan7" target="_blank" rel="noopener noreferrer" 
               className="text-white/70 hover:text-space-accent transition-colors duration-300"
               aria-label="GitHub profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/krishnarajan007" target="_blank" rel="noopener noreferrer"
               className="text-white/70 hover:text-space-accent transition-colors duration-300"
               aria-label="LinkedIn profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://leetcode.com/u/KrishCodes7/" target="_blank" rel="noopener noreferrer"
               className="text-white/70 hover:text-space-accent transition-colors duration-300"
               aria-label="LeetCode profile">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m7 8 10 8"></path>
                <path d="m7 16 10-8"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="order-1 md:order-2 flex justify-center md:justify-end" ref={imageRef} style={{ opacity: 0 }}>
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72">
            <div className="absolute inset-0 bg-gradient-to-tr from-space-accent to-space-nebula rounded-full opacity-10 blur-3xl"></div>
            
            {/* Add some floating particles around the astronaut */}
            {isDarkMode && (
              <>
                <div className="absolute w-2 h-2 rounded-full bg-space-accent/50 animate-twinkle-slow" style={{ top: '20%', left: '10%' }}></div>
                <div className="absolute w-3 h-3 rounded-full bg-space-nebula/50 animate-twinkle" style={{ top: '70%', left: '15%' }}></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-white/50 animate-twinkle-fast" style={{ top: '40%', left: '80%' }}></div>
                <div className="absolute w-2.5 h-2.5 rounded-full bg-space-accent/70 animate-twinkle-slow" style={{ top: '85%', left: '75%' }}></div>
              </>
            )}
            
            <img 
              src="/img/astronaut.png" 
              alt="Astronaut illustration" 
              className="w-full h-full object-contain animate-float"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/300x300/1A1F2C/FFFFFF?text=👨‍🚀";
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - hide on small screens when less space */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="text-white/50 text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
