import React, { useEffect, useRef } from "react";
import { Star } from "lucide-react";
const SectionHeader = ({ title, subtitle }) => {
  const headerRef = useRef(null);

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

    const currentRef = headerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className="text-center mb-16 opacity-0 transition-opacity duration-500 relative group"
    >
      {/* Decorative stars */}
      <div className="section-stars">
        <Star
          className="h-4 w-4 text-space-accent/70 animate-twinkle-fast"
          fill="currentColor"
        />
        <Star
          className="h-5 w-5 text-space-accent animate-twinkle"
          fill="currentColor"
        />
        <Star
          className="h-4 w-4 text-space-accent/70 animate-twinkle-slow"
          fill="currentColor"
        />
      </div>

      {/* Left and right stars */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 hidden md:block">
        <Star
          className="h-4 w-4 text-space-accent/60 animate-twinkle"
          fill="currentColor"
        />
      </div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 hidden md:block">
        <Star
          className="h-4 w-4 text-space-accent/60 animate-twinkle-slow"
          fill="currentColor"
        />
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient relative">
        {title}
        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-space-accent to-space-nebula w-0 group-hover:w-full transition-all duration-700 rounded-full"></span>
      </h2>
      <div className="mx-auto w-20 h-1 bg-gradient-to-r from-space-accent to-space-nebula rounded-full mb-6"></div>
      <p className="text-gray-600 dark:text-white/70 max-w-2xl mx-auto text-lg">{subtitle}</p>

      {/* Bottom stars */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 flex space-x-8">
        <Star
          className="h-3 w-3 text-space-accent/40 animate-twinkle-fast"
          fill="currentColor"
        />
        <Star
          className="h-3 w-3 text-space-accent/40 animate-twinkle"
          fill="currentColor"
        />
        <Star
          className="h-3 w-3 text-space-accent/40 animate-twinkle-slow"
          fill="currentColor"
        />
      </div>

      {/* Additional stars on the sides and bottom */}
      <div className="absolute bottom-0 left-1/4 transform translate-y-8 hidden sm:block">
        <Star
          className="h-2 w-2 text-space-accent/30 animate-twinkle-slow"
          fill="currentColor"
        />
      </div>
      <div className="absolute bottom-0 right-1/4 transform translate-y-6 hidden sm:block">
        <Star
          className="h-2 w-2 text-space-accent/30 animate-twinkle-fast"
          fill="currentColor"
        />
      </div>
      <div className="absolute bottom-[-20px] left-1/3 transform translate-y-8 hidden lg:block">
        <Star
          className="h-3 w-3 text-space-accent/20 animate-twinkle"
          fill="currentColor"
        />
      </div>
      <div className="absolute bottom-[-15px] right-1/3 transform translate-y-6 hidden lg:block">
        <Star
          className="h-3 w-3 text-space-accent/20 animate-twinkle-slow"
          fill="currentColor"
        />
      </div>
    </div>
  );
};

export default SectionHeader;