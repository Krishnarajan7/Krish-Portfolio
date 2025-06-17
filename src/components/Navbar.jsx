import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = ({ isDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Update navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update active section
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  const navbarBgClass = isDarkMode 
    ? (scrolled ? 'bg-space-darker/90 backdrop-blur-lg border-b border-white/5 shadow-lg' : 'bg-transparent') 
    : (scrolled ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-md' : 'bg-transparent');

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navbarBgClass}`}
    >
      <div className="space-container flex items-center justify-between px-4 py-4">
        {/* Logo - optimized for mobile */}
        <a 
          href="#home" 
          className="flex items-center space-x-2 group"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-space-accent to-space-nebula p-0.5 group-hover:scale-110 transition-all duration-500 animate-pulse-slow">
            <div className="w-full h-full rounded-full flex items-center justify-center bg-space-darker">
              <span className="text-white font-bold text-sm sm:text-xl">KR</span>
            </div>
          </div>
          <span className={`text-sm sm:text-lg font-semibold tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Krishna<span className="text-space-accent">rajan</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm font-medium transition-all duration-300 hover:text-space-accent relative px-2 py-1 overflow-hidden group ${
                activeSection === item.id ? 'text-space-accent' : isDarkMode ? 'text-white/80' : 'text-gray-700'
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-space-accent transform transition-transform duration-300 ease-out ${
                activeSection === item.id ? 'scale-x-100' : 'scale-x-0'
              } origin-left group-hover:scale-x-100`}></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button - improved touch area */}
        <button 
          className="md:hidden p-2 focus:outline-none" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} transition-all duration-300 ${menuOpen ? 'transform rotate-45 translate-y-1.5' : 'mb-1.5'}`}></div>
          <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} transition-all duration-300 ${menuOpen ? 'opacity-0' : 'mb-1.5'}`}></div>
          <div className={`w-6 h-0.5 ${isDarkMode ? 'bg-white' : 'bg-gray-800'} transition-all duration-300 ${menuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></div>
        </button>
      </div>

      {/* Mobile Navigation - improved styling and touch targets */}
      <div className={`md:hidden transition-all duration-500 overflow-hidden ${
        menuOpen ? 'max-h-screen opacity-100 mt-2' : 'max-h-0 opacity-0'
      }`}>
        <div className="flex flex-col space-y-0 p-4 frosted-glass rounded-lg mx-4 mb-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-base font-medium py-3 transition-colors hover:text-space-accent ${
                activeSection === item.id ? 'text-space-accent' : isDarkMode ? 'text-white/90' : 'text-gray-800'
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
