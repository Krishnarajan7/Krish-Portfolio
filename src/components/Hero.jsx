import React, { useRef, useEffect, useState } from "react";
import { ArrowRight, Github, Star } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const Hero = ({ isDarkMode }) => {
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
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
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const fullName = "Krishnarajan";
  const [displayedLetters, setDisplayedLetters] = useState(
    Array(fullName.length).fill("")
  );

  useEffect(() => {
    const letters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";
    const timeouts = [];

    fullName.split("").forEach((char, index) => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayedLetters((prev) => {
          const updated = [...prev];
          updated[index] = letters[Math.floor(Math.random() * letters.length)];
          return updated;
        });

        iteration++;
        if (iteration > 15 + index * 4) {
          clearInterval(interval);
          setDisplayedLetters((prev) => {
            const updated = [...prev];
            updated[index] = char;
            return updated;
          });
        }
      }, 50);

      // Store interval reference for cleanup
      timeouts.push(interval);
    });

    return () => {
      timeouts.forEach(clearInterval);
    };
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen pt-16 pb-12 flex items-center relative overflow-hidden"
    >
      <div className="space-container grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
        <div
          className="order-2 md:order-1"
          ref={contentRef}
          style={{ opacity: 0 }}
        >
          <div className="mb-2 inline-block">
            <div className="px-3 py-1 text-xs bg-space-accent/10 border border-space-accent/20 rounded-full text-space-accent animate-pulse-glow">
              Full Stack Developer
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 tracking-wide font-mono bg-transparent">
            <span className="text-gradient bg-transparent">
              {"Hey there, I'm"}
              <span className="no-wrap bg-transparent">
                {displayedLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="inline-block transition-all duration-100 ease-in-out bg-transparent"
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-white/70">
            I build things for the web and beyond
            <br />
            <span className="text-gradient-purple font-medium">
              Exploring the tech universe
            </span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base max-w-lg mb-6 sm:mb-8">
            A passionate freelance developer who started this journey 2.6 years
            ago, crafting clean, efficient, and user-friendly applications that
            solve real-world problems. Always exploring the next challenge in the
            digital cosmos.
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
              href="/assets/resume/Krishnarajan-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2.5 sm:py-3 border border-white/20 hover:border-space-accent/50 text-white text-sm sm:text-base rounded-lg flex items-center gap-2 transition-all hover:translate-y-[-2px] hover:bg-white/5 hover:shadow-md"
            >
              Download Resume
            </a>
          </div>

          {/* Open Source — DevVerse highlight */}
          <a
            href="https://github.com/Krishnarajan7/DevVerse"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="DevVerse — open source collection on GitHub"
            className="group relative mt-6 sm:mt-8 flex items-start gap-3 sm:gap-4 w-full max-w-lg rounded-xl border border-space-accent/30 bg-gradient-to-r from-space-accent/10 via-space-nebula/5 to-transparent p-3 sm:p-4 transition-all duration-300 hover:border-space-accent/60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-space-accent/10"
          >
            {/* Hover tooltip — explains the initiative */}
            <span
              role="tooltip"
              className="pointer-events-none absolute bottom-full left-0 mb-3 w-full max-w-sm rounded-lg border border-space-accent/20 bg-space-darker/95 backdrop-blur-md p-3 text-xs leading-relaxed text-white/80 opacity-0 translate-y-1 shadow-xl shadow-black/40 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 z-20"
            >
              <span className="block font-semibold text-space-accent mb-1">
                DevVerse — a community dev library
              </span>
              A growing, open collection of website templates and real projects, free for
              everyone to learn from and reuse.{" "}
              <span className="text-white">
                Got a template or project? Fork it, add yours, and open a PR — every
                contribution helps fellow devs build faster. 🚀
              </span>
              {/* Arrow */}
              <span className="absolute -bottom-1 left-6 w-2.5 h-2.5 rotate-45 bg-space-darker/95 border-r border-b border-space-accent/20" />
            </span>

            <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-space-accent/15 flex items-center justify-center text-space-accent group-hover:scale-110 transition-transform duration-300">
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-white font-semibold text-sm sm:text-base">
                  DevVerse
                </span>
                <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded-full bg-green-500/15 text-green-400 border border-green-500/20 font-medium whitespace-nowrap">
                  Open Source
                </span>
              </div>
              <p className="text-white/60 text-xs sm:text-sm leading-snug mt-0.5">
                An open collection of templates &amp; projects — any dev can contribute.
              </p>
            </div>
            <div className="flex-shrink-0 self-center flex items-center gap-1.5 text-white/50 group-hover:text-space-accent transition-colors duration-300">
              <Star className="w-4 h-4" />
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </a>

          <div className="flex items-center mt-8 sm:mt-10 space-x-4">
            <a
              href="https://github.com/Krishnarajan7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-space-accent transition-colors duration-300"
              aria-label="GitHub profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/krishnarajan007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-space-accent transition-colors duration-300"
              aria-label="LinkedIn profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://leetcode.com/u/KrishCodes7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-space-accent transition-colors duration-300"
              aria-label="LeetCode profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
              </svg>
            </a>
          </div>
        </div>

        <div
          className="order-1 md:order-2 flex justify-center md:justify-end"
          ref={imageRef}
          style={{ opacity: 0 }}
        >
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72">
            <div className="absolute inset-0 bg-gradient-to-tr from-space-accent to-space-nebula rounded-full opacity-10 blur-3xl"></div>

            {isDarkMode && (
              <>
                <div
                  className="absolute w-2 h-2 rounded-full bg-space-accent/50 animate-twinkle-slow"
                  style={{ top: "0%", left: "10%" }}
                ></div>
                <div
                  className="absolute w-3 h-3 rounded-full bg-space-nebula/50 animate-twinkle"
                  style={{ top: "90%", left: "15%" }}
                ></div>
                <div
                  className="absolute w-1.5 h-1.5 rounded-full bg-white/50 animate-twinkle-fast"
                  style={{ top: "40%", left: "94%" }}
                ></div>
                <div
                  className="absolute w-2.5 h-2.5 rounded-full bg-space-accent/70 animate-twinkle-slow"
                  style={{ top: "85%", left: "75%" }}
                ></div>
              </>
            )}

            <picture>
              <source 
                srcSet="/assets/images/Krish.webp" 
                type="image/webp" 
              />
              <img
                src="/assets/images/Krish.jpg"  
                alt="Krishnarajan profile picture"
                className="w-full h-full rounded-full object-cover shadow-lg border-4 border-purple-500 animate-float"
                loading="eager"
                width="288"  
                height="288"
                srcSet="
                  /assets/images/Krish-192.webp 192w,
                  /assets/images/Krish-288.webp 288w,
                  /assets/images/Krish-576.webp 576w
                "
                sizes="(max-width: 768px) 192px, (max-width: 1024px) 288px, 576px"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/images/Krish.jpg";  // Clean fallback
                }}
              />
            </picture>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;