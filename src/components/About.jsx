import React, { useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Star,
  Award,
  Code,
  Heart,
  Coffee,
  Rocket,
  Users,
  GraduationCap,
  Briefcase,
  Trophy,
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import SectionHeader from "./common/SectionHeader";

const About = ({ isDarkMode }) => {
  const aboutRef = useRef(null);
  const timelineRef = useRef(null);
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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  const timelineEvents = [
    {
      year: "2022",
      title: "Began Programming Journey",
      description:
        "Started learning programming fundamentals using Python, C, and C++.",
      icon: Code,
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "2023",
      title: "Focused on Problem Solving and DSA",
      description:
        "Sharpened algorithmic thinking and data structure knowledge through competitive programming and online challenges.",
      icon: Rocket,
      color: "from-purple-500 to-pink-500",
    },
    {
      year: "2024",
      title: "Delivered First Freelance Project",
      description:
        "Developed and deployed a website for Vedha Clothing — marking the beginning of my freelance journey.",
      icon: Trophy,
      color: "from-orange-500 to-red-500",
    },
    {
      year: "2025",
      title: "Expanded Freelance Portfolio",
      description:
        "Successfully completed three freelance projects, including a website for an international client.",
      icon: Briefcase,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="space-container">
        <SectionHeader
          title="About Me"
          subtitle="Get to know the person behind the code"
        />

        <div
          ref={aboutRef}
          className="opacity-0 transition-opacity duration-500"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left column - Main content */}
            <div className="space-y-8">
              {/* Introduction */}
              <div className="cosmic-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Rocket className="w-6 h-6 text-space-accent" />
                  <h3 className="text-xl font-bold text-white">Who I Am</h3>
                </div>
                <div className="space-y-4 text-white/80 leading-relaxed">
                  <p>
                    Hi there! I'm Krishnarajan, a passionate full-stack
                    developer who loves turning creative ideas into digital
                    reality. My journey in the tech universe began with
                    curiosity and has evolved into a mission to build
                    applications that make a real difference.
                  </p>
                  <p>
                    I believe in the power of clean code, innovative solutions,
                    and continuous learning. When I'm not coding, you'll find me
                    exploring new technologies, contributing to open source
                    projects, or mentoring fellow developers.
                  </p>
                </div>
              </div>

              {/* What I Do */}
              <div className="cosmic-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-6 h-6 text-space-accent" />
                  <h3 className="text-xl font-bold text-white">What I Do</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-space-light/50 rounded-lg border border-white/10">
                    <h4 className="font-semibold text-white mb-2">
                      Problem Solving & Algorithms
                    </h4>
                    <p className="text-white/70 text-sm text-justify leading-relaxed">
                      Practicing and applying data structures and algorithms
                      with platforms like Leetcode to build strong logical
                      thinking and coding skills.
                    </p>
                  </div>
                  <div className="p-4 bg-space-light/50 rounded-lg border border-white/10">
                    <h4 className="font-semibold text-white mb-2">
                      Frontend Projects
                    </h4>
                    <p className="text-white/70 text-sm text-justify leading-relaxed">
                      Building clean and responsive UIs using React, Tailwind
                      CSS, and JavaScript. Focused on accessibility,
                      interactivity, and performance.
                    </p>
                  </div>
                  <div className="p-4 bg-space-light/50 rounded-lg border border-white/10">
                    <h4 className="font-semibold text-white mb-2">
                      Learning Backend Concepts
                    </h4>
                    <p className="text-white/70 text-sm text-justify leading-relaxed">
                      Exploring backend fundamentals like APIs, server-side
                      logic, and databases using Node.js and Python, with a
                      focus on real-world use cases.
                    </p>
                  </div>
                  <div className="p-4 bg-space-light/50 rounded-lg border border-white/10">
                    <h4 className="font-semibold text-white mb-2">
                      Continuous Growth
                    </h4>
                    <p className="text-white/70 text-sm text-justify leading-relaxed">
                      Constantly improving through hands-on projects, coding
                      challenges, and learning modern web technologies to build
                      a solid developer foundation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Personal Interests */}
              <div className="cosmic-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-space-accent" />
                  <h3 className="text-xl font-bold text-white">Beyond Code</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-white/70">
                    <Coffee className="w-5 h-5 text-space-accent/80" />
                    <span className="text-sm">Horlicks Enthusiast</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Users className="w-5 h-5 text-space-accent/80" />
                    <span className="text-sm">Community Builder</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Star className="w-5 h-5 text-space-accent/80" />
                    <span className="text-sm">Open Source Contributor</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Award className="w-5 h-5 text-space-accent/80" />
                    <span className="text-sm">Lifelong Learner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Profile & Stats */}
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="cosmic-card p-6 lg:p-8 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-space-accent/10 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-space-nebula/10 to-transparent rounded-tr-full"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-space-accent to-space-nebula rounded-full flex items-center justify-center">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Krishnarajan
                      </h3>
                      <p className="text-space-accent">Full-Stack Developer</p>
                      <p className="text-white/60 text-sm">
                        Passionate about creating digital experiences
                      </p>
                    </div>
                  </div>

                  {/* Location & Availability */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-white/70">
                      <MapPin className="w-5 h-5 text-space-accent" />
                      <span>Based in India, Available Worldwide</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/70">
                      <Calendar className="w-5 h-5 text-space-accent" />
                      <span>Open for new opportunities</span>
                    </div>
                  </div>

                  {/* Achievement badge */}
                  <div className="p-3 bg-space-accent/10 rounded-lg border border-space-accent/20">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-space-accent" />
                      <span className="text-white/80 text-sm">
                        Certified Full-Stack Developer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute top-4 left-4">
                  <Star
                    className="w-4 h-4 text-space-accent/60 animate-twinkle"
                    fill="currentColor"
                  />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Star
                    className="w-3 h-3 text-space-nebula/60 animate-twinkle-slow"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="cosmic-card p-4 text-center">
                  <div className="text-2xl font-bold text-space-accent mb-1">
                    1+
                  </div>
                  <div className="text-white/60 text-sm">Years Experience</div>
                </div>
                <div className="cosmic-card p-4 text-center">
                  <div className="text-2xl font-bold text-space-accent mb-1">
                    4+
                  </div>
                  <div className="text-white/60 text-sm">
                    Projects Completed
                  </div>
                </div>
                <div className="cosmic-card p-4 text-center">
                  <div className="text-2xl font-bold text-space-accent mb-1">
                    15+
                  </div>
                  <div className="text-white/60 text-sm">
                    GitHub Repositories
                  </div>
                </div>
                <div className="cosmic-card p-4 text-center">
                  <div className="text-2xl font-bold text-space-accent mb-1">
                    24/7
                  </div>
                  <div className="text-white/60 text-sm">Learning Mode</div>
                </div>
              </div>

              {/* Core Technologies */}
              <div className="cosmic-card p-6">
                <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-space-accent" />
                  Core Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "React",
                    "Node.js",
                    "JavaScript",
                    "TailwindCSS",
                    "Python",
                    "Django",
                    "RestAPI",
                    "PostgreSQL",
                    "Postman",
                    "VS Code",
                  ].map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-space-light rounded-full text-white/70 text-sm border border-white/10 hover:border-space-accent/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Floating side elements */}
              {!isMobile && (
                <>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-space-accent/20 rounded-full animate-float"></div>
                  <div
                    className="absolute -bottom-6 -left-6 w-6 h-6 bg-space-nebula/20 rounded-full animate-float"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* My Journey Timeline */}
        <div
          ref={timelineRef}
          className="opacity-0 transition-opacity duration-500 mt-20"
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <GraduationCap className="w-8 h-8 text-space-accent" />
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                My Journey
              </h2>
              <Trophy className="w-8 h-8 text-space-accent" />
            </div>
            <div className="mx-auto w-20 h-1 bg-gradient-to-r from-space-accent to-space-nebula rounded-full mb-6"></div>
            <p className="text-white/60 max-w-2xl mx-auto">
              A timeline of my growth and milestones in the world of technology
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-space-accent via-space-nebula to-space-accent transform md:-translate-x-1/2"></div>

            <div className="space-y-8 md:space-y-12">
              {timelineEvents.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-space-accent rounded-full transform -translate-x-1/2 z-10 animate-pulse-glow"></div>

                  {/* Content card */}
                  <div
                    className={`cosmic-card p-6 ml-12 md:ml-0 md:w-5/12 ${
                      index % 2 === 0
                        ? "md:mr-auto md:pr-8"
                        : "md:ml-auto md:pl-8"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center`}
                      >
                        <event.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-space-accent font-bold text-lg">
                        {event.year}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {event.title}
                    </h3>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
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
