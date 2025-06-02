import React, { useState } from 'react';
import { Github, ArrowUpRight, Star, Code, Trophy } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import SectionHeader from './common/SectionHeader';

const PROJECTS = [
  {
    title: "Cosmic Commerce",
    description: "A full-stack e-commerce platform with React frontend and Node.js backend. Features include user authentication, product listing, cart functionality, and payment processing.",
    image: "/img/project1.jpg",
    tech: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    github: "https://github.com/krishnarajan7/cosmic-commerce",
    demo: "https://cosmic-commerce.demo.com",
    featured: true
  },
  {
    title: "Galaxy Chat",
    description: "Real-time chat application with private and group messaging features. Uses Socket.io for real-time communication and Firebase for authentication and data storage.",
    image: "/img/project2.jpg",
    tech: ["React", "Firebase", "Socket.io", "Tailwind CSS"],
    github: "https://github.com/krishnarajan7/galaxy-chat",
    demo: "https://galaxy-chat.demo.com",
    featured: true
  },
  {
    title: "Orbit Dashboard",
    description: "Admin dashboard template with dark theme, data visualization, and customizable widgets. Fully responsive and built with modern web technologies.",
    image: "/img/project3.jpg",
    tech: ["React", "Tailwind CSS", "Chart.js", "React Router"],
    github: "https://github.com/krishnarajan7/orbit-dashboard",
    demo: "https://orbit-dashboard.demo.com",
    featured: true
  },
  {
    title: "Stellar Weather",
    description: "Weather application that displays real-time weather data and forecasts. Includes location detection, search functionality, and interactive maps.",
    image: "/img/project4.jpg", 
    tech: ["React", "OpenWeather API", "Mapbox", "CSS"],
    github: "https://github.com/krishnarajan7/stellar-weather",
    demo: "https://stellar-weather.demo.com"
  },
  {
    title: "Nebula Notes",
    description: "Note-taking application with markdown support, categories, and search functionality. Syncs data across devices using local storage and optional cloud backup.",
    image: "/img/project5.jpg",
    tech: ["React", "Local Storage", "Markdown", "IndexedDB"],
    github: "https://github.com/krishnarajan7/nebula-notes",
    demo: "https://nebula-notes.demo.com"
  },
  {
    title: "Space Fitness",
    description: "Fitness tracking application that allows users to create workout plans, track progress, and visualize performance over time.",
    image: "/img/project6.jpg",
    tech: ["React Native", "Firebase", "Chart.js", "Expo"],
    github: "https://github.com/krishnarajan7/space-fitness",
    demo: "https://space-fitness.demo.com"
  },
  {
    title: "Algorithm Visualizer",
    description: "Interactive visualization tool for common algorithms including sorting, pathfinding, and graph algorithms. Educational tool that helps understand complex algorithms.",
    image: "/img/project7.jpg",
    tech: ["React", "JavaScript", "Data Structures", "Canvas API"],
    github: "https://github.com/krishnarajan7/algorithm-visualizer",
    demo: "https://algorithm-visualizer.demo.com"
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with React, featuring dark mode, smooth animations, and responsive design. Showcasing projects, skills, and contact information.",
    image: "/img/project8.jpg",
    tech: ["React", "Tailwind CSS", "Animation", "Responsive Design"],
    github: "https://github.com/krishnarajan7/portfolio",
    demo: "https://krishnarajan.dev"
  }
];

const ProjectCard = ({ project }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="cosmic-card overflow-hidden group relative h-full">
      <div className="h-40 sm:h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/800x400/1A1F2C/FFFFFF?text=${encodeURIComponent(project.title.replace(' ', '+'))}`;
          }}
        />
        {project.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-space-darker/80 px-2 py-1 rounded-full backdrop-blur-sm">
            <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
            <span className="text-xs text-white/90">Featured</span>
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-space-darker/80 p-2 rounded-full backdrop-blur-sm hover:bg-space-dark transition-colors"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <Github className="w-4 h-4 text-white" />
          </a>
          <a 
            href={project.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-space-darker/80 p-2 rounded-full backdrop-blur-sm hover:bg-space-dark transition-colors"
            aria-label={`View ${project.title} live demo`}
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>
      <div className="p-4 sm:p-6 relative flex flex-col h-[calc(100%-10rem)] sm:h-[calc(100%-12rem)]">
        <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-white/70 text-xs sm:text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
          {project.tech.slice(0, isMobile ? 3 : 5).map((tech, idx) => (
            <span 
              key={idx} 
              className="px-2 py-0.5 sm:py-1 bg-space-light rounded-md text-white/70 text-xs"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > (isMobile ? 3 : 5) && (
            <span className="px-2 py-0.5 sm:py-1 bg-space-light/50 rounded-md text-white/50 text-xs">
              +{project.tech.length - (isMobile ? 3 : 5)} more
            </span>
          )}
        </div>
      </div>
      {/* Animated border effect */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
        <div className="absolute -inset-1 rounded-lg opacity-40"
             style={{
               background: 'linear-gradient(90deg, #9b87f5, #D946EF, #9b87f5)',
               backgroundSize: '200% 100%',
               animation: 'gradient-slide 2s linear infinite'
             }}></div>
      </div>
    </div>
  );
};

const Projects = ({ isDarkMode }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const hasMoreProjects = visibleCount < PROJECTS.length;
  const isMobile = useIsMobile();
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + (isMobile ? 2 : 3), PROJECTS.length));
  };
  
  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="space-container">
        <SectionHeader 
          title="My Projects" 
          subtitle="Explore the digital constellations I've created" 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {PROJECTS.slice(0, visibleCount).map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
        
        {hasMoreProjects && (
          <div className="mt-10 sm:mt-12 text-center">
            <button 
              onClick={loadMore}
              className="px-5 sm:px-6 py-2.5 sm:py-3 border border-space-accent/50 text-white rounded-lg transition-all hover:bg-space-accent/10"
            >
              Load More Projects
            </button>
          </div>
        )}

        {/* Profile links - improved for mobile */}
        <div className="mt-16 sm:mt-20 text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-white">Check Out My Profiles</h3>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a 
              href="https://github.com/Krishnarajan7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-space-light rounded-lg hover:bg-space-accent/20 transition-colors"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-sm sm:text-base text-white">GitHub</span>
            </a>
            <a 
              href="https://leetcode.com/u/KrishCodes7/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-space-light rounded-lg hover:bg-space-accent/20 transition-colors"
            >
              <Code className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span className="text-sm sm:text-base text-white">LeetCode</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/krishnarajan007" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-space-light rounded-lg hover:bg-space-accent/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-4 h-4 sm:w-5 sm:h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span className="text-sm sm:text-base text-white">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
