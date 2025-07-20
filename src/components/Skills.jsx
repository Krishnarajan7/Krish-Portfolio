import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";
import { Star } from "lucide-react";
import SectionHeader from "./common/SectionHeader";
import { Progress } from "./ui/progress";
import { useIsMobile } from "../hooks/use-mobile";

const SKILL_CATEGORIES = [
  {
    title: "Frontend",
    skills: [
      { name: "React", proficiency: 85 },
      { name: "JavaScript", proficiency: 90 },
      { name: "HTML/CSS", proficiency: 90 },
      { name: "Tailwind CSS", proficiency: 85 },
      { name: "BootStrap", proficiency: 75 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Python", proficiency: 85 },
      { name: "Node.js", proficiency: 80 },
      { name: "Django", proficiency: 75 },
      { name: "PostgreSQL", proficiency: 70 },
      { name: "RESTful APIs", proficiency: 85 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git/GitHub", proficiency: 90 },
      { name: "Docker", proficiency: 65 },
      { name: "Postman", proficiency: 70 },
      { name: "AWS", proficiency: 60 },
      { name: "VS Code", proficiency: 95 },
    ],
  },
];

const SkillItem = ({ name, proficiency, delay }) => {
  const progressRef = useRef(null);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setValue(proficiency);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (progressRef.current) {
      observer.observe(progressRef.current);
    }

    return () => {
      if (progressRef.current) {
        observer.unobserve(progressRef.current);
      }
    };
  }, [proficiency, delay]);

  return (
    <div className="mb-4" ref={progressRef}>
      <div className="flex justify-between mb-1">
        <span className="text-white/90 text-sm font-medium">{name}</span>
        <span className="text-white/50 text-xs">{value}%</span>
      </div>
      <Progress
        value={value}
        className="h-2 bg-space-light"
        aria-label={`${name} skill level: ${value}%`}
      />
    </div>
  );
};

// Custom star component with better positioning for all screen sizes
const DecoStar = ({ size = "md", position, className, animationDelay = 0 }) => {
  const sizeClasses = {
    sm: "h-2.5 w-2.5 sm:h-3 sm:w-3",
    md: "h-3 w-3 sm:h-4 sm:w-4",
    lg: "h-4 w-4 sm:h-5 sm:w-5",
  };

  return (
    <div className={cn("absolute", position, className)}>
      <Star
        className={cn(
          sizeClasses[size],
          "text-space-accent animate-twinkle-slow",
          className
        )}
        fill="currentColor"
        style={{ animationDelay: `${animationDelay}s` }}
      />
    </div>
  );
};

const Skills = ({ isDarkMode }) => {
  const isMobile = useIsMobile();

  return (
    <section
      id="skills"
      className={`py-16 sm:py-20 ${
        isDarkMode ? "bg-space-darker/50" : "bg-gray-50"
      }`}
    >
      <div className="space-container">
        <SectionHeader
          title="My Skills"
          subtitle="Navigating through the tech constellation"
        />

        <div className="relative mt-10 sm:mt-12">
          {/* Star constellation decoration - better positioned for mobile*/}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-[5%] left-[10%] w-1 h-1 bg-white rounded-full animate-twinkle"></div>
            <div className="absolute top-[15%] left-[25%] w-1.5 h-1.5 bg-white rounded-full animate-twinkle-slow"></div>
            <div className="absolute top-[70%] left-[35%] w-1 h-1 bg-white rounded-full animate-twinkle-fast"></div>
            <div className="absolute top-[85%] left-[80%] w-1 h-1 bg-white rounded-full animate-twinkle"></div>
            <div className="absolute top-[45%] left-[90%] w-2 h-2 bg-white rounded-full animate-twinkle-slow"></div>
          </div>

          {/* Better positioned decorative stars with responsive positioning */}
          {!isMobile && (
            <>
              <DecoStar position="-left-8 -top-6" animationDelay={0} />
              <DecoStar
                position="-right-6 top-20"
                size="sm"
                animationDelay={1.2}
              />
              <DecoStar
                position="left-1/4 -bottom-6"
                size="sm"
                animationDelay={0.7}
              />
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {SKILL_CATEGORIES.map((category, index) => (
              <div
                key={index}
                className={cn(
                  "cosmic-card p-5 sm:p-6 relative",
                  !isMobile && index === 1 && "md:transform md:-translate-y-4"
                )}
              >
                {/* Card's decorative star - repositioned to avoid overlap */}
                {!isMobile && (
                  <DecoStar
                    position="-top-2.5 -right-2.5"
                    size={index === 1 ? "lg" : "md"}
                    animationDelay={index * 0.5}
                  />
                )}

                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 pb-2 border-b border-white/10">
                  {category.title}
                </h3>
                {category.skills.map((skill, idx) => (
                  <SkillItem
                    key={idx}
                    name={skill.name}
                    proficiency={skill.proficiency}
                    delay={idx * 200 + index * 300}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 frosted-glass rounded-lg p-5 sm:p-6 relative">
            {/* Better positioned stars for all screen sizes */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex space-x-4 sm:space-x-8">
              <DecoStar
                size="sm"
                className="text-space-accent/70 animate-twinkle"
                animationDelay={0.3}
              />
              <DecoStar
                size="lg"
                className="text-space-accent animate-twinkle-slow"
                animationDelay={0.8}
              />
              <DecoStar
                size="sm"
                className="text-space-accent/70 animate-twinkle-fast"
                animationDelay={0.1}
              />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 mt-2">
              Additional Technologies & Concepts
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {[
                "Next.js",
                "Express",
                "JWT",
                "Firebase",
                "Azure",
                "Responsive Design",
                "Accessibility",
                "SASS",
                "Performance Optimization",
                "Netlify"
              ].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 sm:px-3 py-1 bg-space-light rounded-full text-white/80 text-xs sm:text-sm hover:bg-space-accent/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add some extra styling for the star animations */}
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes twinkle-slow {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes twinkle-fast {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.9;
          }
        }

        .animate-twinkle {
          animation: twinkle 4s ease-in-out infinite;
        }

        .animate-twinkle-slow {
          animation: twinkle-slow 6s ease-in-out infinite;
        }

        .animate-twinkle-fast {
          animation: twinkle-fast 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;
