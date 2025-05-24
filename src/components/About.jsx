import React, { useRef, useEffect } from 'react';
import { Code, Rocket, Star, BookOpen, Coffee, Zap } from 'lucide-react';
import SectionHeader from './common/SectionHeader';

const About = ({ isDarkMode }) => {
  const profileRef = useRef(null);
  const contentRef = useRef(null);
  const moonRef = useRef(null);
  const experienceRef = useRef(null);

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

    if (profileRef.current) {
      observer.observe(profileRef.current);
    }
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => {
      if (profileRef.current) {
        observer.unobserve(profileRef.current);
      }
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
      if (experienceRef.current) {
        observer.unobserve(experienceRef.current);
      }
    };
  }, []);

  // Add moon animation effect
  useEffect(() => {
    if (!moonRef.current || !isDarkMode) return;
    
    const updateMoonPosition = () => {
      if (!moonRef.current) return;
      
      const now = Date.now() / 10000; // Slowed down rotation for smoother motion
      const radius = 150; // Distance from center
      const x = Math.cos(now) * radius;
      const y = Math.sin(now) * radius;
      
      moonRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${now * 15}deg)`;
      
      requestAnimationFrame(updateMoonPosition);
    };
    
    const animationId = requestAnimationFrame(updateMoonPosition);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);

  return (
    <section id="about" className="py-20 relative">
      <div className="space-container">
        <SectionHeader
          title="About Me"
          subtitle="Get to know the person behind the code"
        />
        
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="relative" ref={profileRef} style={{ opacity: 0 }}>
            <div className="cosmic-card p-1.5 relative">
              <div className="relative w-full aspect-square overflow-hidden rounded-lg">
                <img 
                  src="/img/profile.jpg" 
                  alt="Krishna Rajan" 
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x400/1A1F2C/FFFFFF?text=Krishna+Rajan";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-4">
                  <h3 className="text-xl font-bold text-white">Krishna Rajan</h3>
                  <p className="text-space-accent">Full Stack Developer</p>
                </div>
              </div>
            </div>
            
            {isDarkMode && (
              <div 
                ref={moonRef}
                className="absolute w-20 h-20 transition-opacity duration-1000 overflow-hidden rounded-full"
                style={{ 
                  top: '35%', 
                  left: '35%',
                  transition: 'transform 0.8s ease-out',
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg"
                    alt="Moon" 
                    className="w-full h-full object-cover rounded-full"
                  />
                  {/* Add a subtle shadow overlay */}
                  <div className="absolute inset-0 rounded-full shadow-inner bg-gradient-to-tr from-transparent to-black/20"></div>
                  {/* Add a subtle glow effect */}
                  <div className="absolute inset-0 rounded-full shadow-xl" style={{
                    boxShadow: '0 0 25px 5px rgba(255, 255, 255, 0.4)'
                  }}></div>
                </div>
              </div>
            )}
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-space-accent/20 blur-xl"></div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-space-nebula/20 blur-xl"></div>
          </div>
          
          <div className="space-y-6" ref={contentRef} style={{ opacity: 0 }}>
            <h3 className="text-2xl font-bold text-white">Building impactful web experiences one galaxy at a time</h3>
            
            <p className="text-white/70">
              I'm a passionate Full Stack Developer with 5+ years of experience crafting elegant solutions to complex problems. My journey in tech began with a deep curiosity about how websites work, which evolved into a professional career building applications that make a difference.
            </p>
            
            <p className="text-white/70">
              With expertise in modern web technologies like React, Node.js, and cloud services, I enjoy crafting responsive, performant, and accessible web applications that deliver exceptional user experiences. I'm particularly interested in creating solutions that bridge the gap between complex technical challenges and intuitive user interfaces.
            </p>
            
            <p className="text-white/70">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, and staying updated with the latest industry trends. I believe in continuous learning and pushing the boundaries of what's possible with code.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="frosted-glass rounded-lg p-4 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-space-accent/20 flex items-center justify-center mb-3">
                  <Code className="h-5 w-5 text-space-accent" />
                </div>
                <h4 className="text-white font-medium mb-1">Clean Code</h4>
                <p className="text-white/60 text-sm">Well-structured, maintainable solutions</p>
              </div>
              
              <div className="frosted-glass rounded-lg p-4 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-space-accent/20 flex items-center justify-center mb-3">
                  <Rocket className="h-5 w-5 text-space-accent" />
                </div>
                <h4 className="text-white font-medium mb-1">Innovation</h4>
                <p className="text-white/60 text-sm">Embracing new technologies</p>
              </div>
              
              <div className="frosted-glass rounded-lg p-4 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-space-accent/20 flex items-center justify-center mb-3">
                  <Star className="h-5 w-5 text-space-accent" />
                </div>
                <h4 className="text-white font-medium mb-1">Excellence</h4>
                <p className="text-white/60 text-sm">Attention to detail in every project</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Experience Section */}
        <div ref={experienceRef} style={{ opacity: 0 }} className="mt-20">
          <h3 className="text-2xl font-bold text-white text-center mb-10">My Journey</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Education Column */}
            <div className="space-y-6">
              <h4 className="text-xl font-medium text-white flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-space-accent" />
                Education
              </h4>
              
              <div className="cosmic-card p-6 relative">
                <div className="absolute top-0 left-6 h-full w-0.5 bg-space-accent/20"></div>
                
                <div className="relative pl-6 pb-8">
                  <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-space-accent -ml-1.5"></div>
                  <h5 className="text-white font-medium">Master of Computer Science</h5>
                  <p className="text-space-accent">Stanford University</p>
                  <p className="text-white/50 text-sm">2016 - 2018</p>
                  <p className="text-white/70 mt-2">
                    Specialized in artificial intelligence and web technologies with a focus on building scalable applications.
                  </p>
                </div>
                
                <div className="relative pl-6">
                  <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-space-accent -ml-1.5"></div>
                  <h5 className="text-white font-medium">Bachelor of Engineering</h5>
                  <p className="text-space-accent">MIT</p>
                  <p className="text-white/50 text-sm">2012 - 2016</p>
                  <p className="text-white/70 mt-2">
                    Graduated with honors in Computer Science, with minors in Mathematics and Design Thinking.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Work Experience Column */}
            <div className="space-y-6">
              <h4 className="text-xl font-medium text-white flex items-center gap-2">
                <Coffee className="h-5 w-5 text-space-accent" />
                Work Experience
              </h4>
              
              <div className="cosmic-card p-6 relative">
                <div className="absolute top-0 left-6 h-full w-0.5 bg-space-accent/20"></div>
                
                <div className="relative pl-6 pb-8">
                  <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-space-accent -ml-1.5"></div>
                  <h5 className="text-white font-medium">Senior Full Stack Developer</h5>
                  <p className="text-space-accent">Tech Innovations Inc.</p>
                  <p className="text-white/50 text-sm">2020 - Present</p>
                  <p className="text-white/70 mt-2">
                    Leading development of enterprise SaaS applications using React, Node.js, and AWS. Mentoring junior developers and implementing CI/CD pipelines.
                  </p>
                </div>
                
                <div className="relative pl-6 pb-8">
                  <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-space-accent -ml-1.5"></div>
                  <h5 className="text-white font-medium">Full Stack Developer</h5>
                  <p className="text-space-accent">Digital Solutions Co.</p>
                  <p className="text-white/50 text-sm">2018 - 2020</p>
                  <p className="text-white/70 mt-2">
                    Developed and maintained multiple web applications using React, Express, and MongoDB. Implemented responsive designs and optimized performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Interests Section */}
          <div className="mt-16">
            <h4 className="text-xl font-medium text-white flex items-center gap-2 mb-6">
              <Zap className="h-5 w-5 text-space-accent" />
              What I'm Passionate About
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Open Source", icon: "🌐" },
                { title: "AI & Machine Learning", icon: "🤖" },
                { title: "UI/UX Design", icon: "🎨" },
                { title: "Cloud Architecture", icon: "☁️" },
                { title: "DevOps", icon: "⚙️" },
                { title: "Web Accessibility", icon: "♿" },
                { title: "Tech Mentoring", icon: "👨‍🏫" },
                { title: "Blockchain", icon: "🔗" }
              ].map((interest, idx) => (
                <div key={idx} className="frosted-glass rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="text-2xl mb-2">{interest.icon}</div>
                  <h5 className="text-white font-medium">{interest.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
