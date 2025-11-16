import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Youtube, Code } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const Navbar = ({ isDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Improved scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);

      // Better active section detection
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY + viewportHeight * 0.3; // 30% from top

      let newActiveSection = 'hero';
      
      sections.forEach((section) => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          newActiveSection = section.id;
        }
      });

      // Special case for hero section when at top
      if (window.scrollY < 100) {
        newActiveSection = 'hero';
      }

      setActiveSection(newActiveSection);
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = id === 'hero' ? 0 : element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  const navbarBgClass = isDarkMode 
    ? (scrolled ? 'bg-space-darker/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' : 'bg-transparent') 
    : (scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' : 'bg-transparent');

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navbarBgClass}`}>
        <div className="space-container flex items-center justify-between px-4 py-4">
          <button 
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-space-accent to-space-nebula p-0.5 group-hover:scale-110 transition-all duration-500 overflow-hidden">
              <img
                src="/assets/images/logo.jpeg"
                alt="Krishna Rajan Logo"
                className="w-full h-full rounded-full object-cover bg-space-darker"
              />
            </div>
            <span className={`text-sm sm:text-lg font-semibold tracking-wider ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Krishna<span className="text-space-accent">Rajan</span>
            </span>
          </button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 items-center justify-center relative">
            <div className={`flex items-center gap-1 backdrop-blur-xl py-2 px-2 rounded-full border transition-all duration-300 ${
              isDarkMode 
                ? 'bg-space-dark/80 border-white/10' 
                : 'bg-white/90 border-blue-200/60'
            }`}>
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300 ${
                      isDarkMode 
                        ? 'text-white/80 hover:text-space-accent' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full -z-0"
                        style={{
                          background: isDarkMode 
                            ? 'linear-gradient(135deg, rgba(126, 105, 171, 0.3), rgba(155, 135, 245, 0.2))'
                            : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.3))'
                        }}
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      >
                        {/* Lamp effect */}
                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-t-full ${
                          isDarkMode ? 'bg-space-accent' : 'bg-blue-500'
                        }`}>
                          <div className={`absolute w-12 h-8 rounded-full blur-lg -top-3 -left-2 opacity-60 ${
                            isDarkMode ? 'bg-space-accent/40' : 'bg-blue-500/40'
                          }`} />
                          <div className={`absolute w-8 h-6 rounded-full blur-md -top-2 opacity-80 ${
                            isDarkMode ? 'bg-space-accent/50' : 'bg-blue-500/50'
                          }`} />
                          <div className={`absolute w-4 h-4 rounded-full blur-sm top-0 left-2 ${
                            isDarkMode ? 'bg-space-accent/60' : 'bg-blue-500/60'
                          }`} />
                        </div>
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Social Icons */}
            <div className="hidden md:flex items-center space-x-3">
              <a
                href="https://github.com/Krishnarajan7" // Replace with actual link
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-space-dark/50 border border-white/10 text-white/80 hover:text-space-accent' 
                    : 'bg-white/50 border border-gray-200/50 text-gray-600 hover:text-blue-600'
                }`}
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/krishnarajan007" 
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-space-dark/50 border border-white/10 text-white/80 hover:text-space-accent' 
                    : 'bg-white/50 border border-gray-200/50 text-gray-600 hover:text-blue-600'
                }`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@KrishCodes-IO" 
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-space-dark/50 border border-white/10 text-white/80 hover:text-space-accent' 
                    : 'bg-white/50 border border-gray-200/50 text-gray-600 hover:text-blue-600'
                }`}
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://leetcode.com/u/KrishCodes7/" 
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDarkMode 
                    ? 'bg-space-dark/50 border border-white/10 text-white/80 hover:text-space-accent' 
                    : 'bg-white/50 border border-gray-200/50 text-gray-600 hover:text-blue-600'
                }`}
              >
                <Code className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 focus:outline-none relative z-50" 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={menuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? (
                  <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
                ) : (
                  <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} />
                )}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Full Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-space-darker/95' : 'bg-white/95'} backdrop-blur-xl`} />
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-8">
              <div className={`flex flex-col items-center gap-2 backdrop-blur-xl py-6 px-8 rounded-3xl border ${
                isDarkMode 
                  ? 'bg-space-dark/80 border-white/10' 
                  : 'bg-white/90 border-blue-200/60'
              }`}>
                {NAV_ITEMS.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      onClick={() => scrollToSection(item.id)}
                      className={`relative cursor-pointer text-lg font-semibold px-8 py-3 rounded-full transition-all duration-300 w-full ${
                        isDarkMode 
                          ? 'text-white/80 hover:text-space-accent' 
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeMobileTab"
                          className="absolute inset-0 rounded-full -z-0"
                          style={{
                            background: isDarkMode 
                              ? 'linear-gradient(135deg, rgba(126, 105, 171, 0.3), rgba(155, 135, 245, 0.2))'
                              : 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.3))'
                          }}
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;