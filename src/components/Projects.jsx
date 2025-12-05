import React, { useState, useRef, useEffect } from "react";
import {
  Github,
  ArrowUpRight,
  Star,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import SectionHeader from "./common/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PROJECTS = [
  {
    title: "MiMacademy",
    description:
      "A modern, responsive website for MiM Academy — a UK-based coaching institute. Built with clean UI/UX practices to showcase courses, testimonials, and contact information.",
    image: "/assets/images/MiMacademy.png",
    tech: ["HTML5", "React", "Tailwind", "JavaScript", "CSS3"],
    github: "https://github.com/Krishnarajan7/MiMacademy",
    demo: "https://mimacademy.org",
    featured: true,
  },
  {
    title: "EduVerse",
    description:
      "My ERP system is a full-stack web application built using Python (Django REST API) for the backend and React with Tailwind CSS for the frontend.",
    image: "/assets/images/EduVerse.png",
    tech: ["Python", "Django", "REST API", "React", "Tailwind"],
    github: "https://github.com/Krishnarajan7/EduVerse",
    demo: "https://eduverse-erp.netlify.app/",
    featured: true,
  },
  {
    title: "Growvest Academy",
    description:
      "A modern educational platform that teaches mutual fund investing and personal finance, built with React, Node.js, Tailwind CSS, and PostgreSQL. Includes payment gateway integration for premium content.",
    image: "/assets/images/grovvest.png",
    tech: ["React", "Tailwind", "HTML", "JavaScript"],
    github: "https://github.com/Krishnarajan7/grow_with_25",
    demo: "https://growvestaca.in/",
    featured: true,
  },
  {
    title: "Phoenix Data Consulting",
    description:
      "Phoenix Data Consulting is a Next Gen IT solutions provider, built with React, Tailwind CSS, and Shadcn UI to deliver a modern, responsive, and accessible web experience.",
    image: "/assets/images/phoenix.png",
    tech: ["React", "JavasScript", "Tailwind CSS", "Shadcn UI"],
    github: "https://github.com/Krishnarajan7/PhoenixDataConsulting",
    demo: "https://phoenixdataconsulting.in/",
    featured: true,
  },
  {
    title: "Space Porfolio",
    description:
      "My personal portfolio is built with React, Tailwind CSS, and JavaScript, featuring a sleek, space-inspired design. It highlights my projects and skills with responsive UI, smooth animations, and a modern, cosmic aesthetic.",
    image: "/assets/images/Portfolio.png",
    tech: ["React", "Tailwind CSS", "JavaScript", "React Router"],
    github: "https://github.com/Krishnarajan7/Krish-Portfolio",
    demo: "https://krish-dev-portfolio.netlify.app/",
    featured: true,
  },
  {
    title: "HalleyShop",
    description:
      "HalleyShop is a modern e-commerce platform with role-based access for customers and admins, secure authentication, and customer management. Built with Node.js, Express, Prisma, and JWT, it delivers scalable, API-driven architecture with strong validation and permissions.",
    image: "/assets/images/halley.png",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Prisma",
      "PostgreSQL",
      "JWT Authentication",
      "bcryptjs",
      "Zod Validation",
      "Multer",
      "Cloudinary",
    ],
    github: "https://github.com/Krishnarajan7/halleyshop",
    demo: "https://halleyshop.netlify.app/",
    featured: true,
  },
  // {
  //   title: "P2P Career Guidnce",
  //   description:
  //     "A career development platform offering placements, career guidance, and courses. Built with React and Express.js, it integrates OAuth authentication and modern backend technologies to provide a secure and seamless user experience.",
  //   image: "/assets/images/career.png",
  //   tech: [
  //     "React",
  //     "Express.js",
  //     "Node.js",
  //     "OAuth",
  //     "REST APIs",
  //     "JWT",
  //     "PostgresSQL",
  //   ],
  //   // github: "https://github.com/Krishnarajan7/CareerGuide",
  //   demo: "https://p2pcareerguidance.com",
  //   featured: true,
  // },
  {
    title: "RightChoice Trust",
    description:
      "Right Choice is built using modern web technologies like HTML, CSS, and JavaScript, ensuring a fast and responsive user experience.",
    image: "/assets/images/Rightchoice.png",
    tech: ["React", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"],
    github: "https://github.com/Krishnarajan7/RightChoice-Trust",
    demo: "https://rightchoicetrust.com/",
    featured: true,
  },
  {
    title: "GeNcert",
    description:
      "GenCert is a lightweight web tool for instantly creating professional training or achievement certificates with customizable templates. It supports bulk data import, QR code verification, and a mobile-friendly interface—making certificate creation simple and fast for educators, event organizers, and businesses.",
    image: "/assets/images/gencert.png",
    tech: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Python",
      "Flask",
      "Pandas",
      "OpenPyXL",
      "ReportLab",
      "qrcode",
    ],
    github: "https://github.com/Krishnarajan7/GeNcert",
    demo: "https://gencerty.netlify.app/",
    featured: true,
  },
  {
    title: "Vedha Clothing",
    description:
      "Vedha Clothing is a modern e-commerce platform crafted to showcase timeless Indian fashion. Built using responsive web technologies like HTML5, CSS3, JavaScript.",
    image: "/assets/images/Vedhaclothing.png",
    tech: ["Node.js", "React", "JavaScript", "Tailwind CSS", "MongoDB"],
    github: "https://github.com/Krishnarajan7/Client-Website-1",
    demo: "https://vedhaclothing.in/",
    featured: true,
  },
];

const ProjectCard = ({ project }) => {
  const isMobile = useIsMobile();

  return (
    <div className="cosmic-card group relative h-full overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
      {/* Cosmic background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-accent/5 to-space-nebula/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-space-accent/20 via-transparent to-space-nebula/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

      <div className="relative z-10">
        <div className="relative overflow-hidden rounded-t-lg">
          <AspectRatio ratio={16 / 9}>
            <img
              src={project.image}
              alt={`${project.title} preview`}
              loading="lazy"
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              onError={(e) => {
                const target = e.target;
                target.onerror = null;
                target.src = `https://placehold.co/800x450/0F1729/9b87f5?text=${encodeURIComponent(
                  project.title.replace(" ", "+")
                )}`;
              }}
            />
          </AspectRatio>

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-space-darker/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

          {project.featured && (
            <div className="absolute top-3 left-3">
              <div className="relative">
                <div className="absolute inset-0 bg-space-accent/30 blur-md rounded-full animate-pulse-glow"></div>
                <Badge className="relative flex items-center gap-1 bg-space-accent text-white border-none px-3 py-1 rounded-full font-medium shadow-lg">
                  <Star className="w-3 h-3" fill="currentColor" />
                  Featured
                </Badge>
              </div>
            </div>
          )}

          <div className="absolute top-3 right-3 flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn p-2.5 rounded-full backdrop-blur-md bg-white/90 dark:bg-space-dark/90 text-gray-800 dark:text-white border border-gray-300/80 dark:border-space-accent/30 hover:bg-space-accent hover:text-white hover:border-space-accent hover:scale-110 transition-all duration-300 shadow-lg"
              aria-label={`View ${project.title} source code on GitHub`}
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn p-2.5 rounded-full backdrop-blur-md bg-white/90 dark:bg-space-dark/90 text-gray-800 dark:text-white border border-gray-300/80 dark:border-space-accent/30 hover:bg-space-accent hover:text-white hover:border-space-accent hover:scale-110 transition-all duration-300 shadow-lg"
              aria-label={`View ${project.title} live demo`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-gray-500 dark:text-white group-hover:text-gradient transition-all duration-300">
              {project.title}
            </h3>
            <p className=" dark:text-white/80 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tech.slice(0, isMobile ? 3 : 5).map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium rounded-full bg-space-accent/10 text-space-accent border border-space-accent/20 hover:bg-space-accent/20 hover:border-space-accent/40 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > (isMobile ? 3 : 5) && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-space-nebula/10 text-space-nebula border border-space-nebula/20">
                +{project.tech.length - (isMobile ? 3 : 5)} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute top-4 left-4 w-1 h-1 bg-space-accent rounded-full opacity-40 animate-twinkle"></div>
      <div className="absolute bottom-8 right-8 w-1.5 h-1.5 bg-space-nebula rounded-full opacity-30 animate-twinkle-slow"></div>
      <div className="absolute top-1/2 left-8 w-0.5 h-0.5 bg-gray-400 dark:bg-white rounded-full opacity-50 animate-twinkle-fast"></div>
    </div>
  );
};

const Projects = ({ isDarkMode }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const hasMoreProjects = visibleCount < PROJECTS.length;
  const isMobile = useIsMobile();

  // Calculate card width including gap
  const getCardWidth = () => {
    if (!carouselRef.current) return 324; // 300px + 24px gap
    const container = carouselRef.current;
    const containerWidth = container.clientWidth;
    return Math.min(350, containerWidth * 0.85) + 24; // responsive width + gap
  };

  const scrollToIndex = (index) => {
    if (!carouselRef.current) return;

    const cardWidth = getCardWidth();
    const scrollLeft = index * cardWidth;

    carouselRef.current.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const cardWidth = getCardWidth();
    const scrollLeft = container.scrollLeft;
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (newIndex !== currentIndex) {
      setCurrentIndex(Math.min(newIndex, PROJECTS.length - 1));
    }
  };

  const nextProject = () => {
    const nextIndex = Math.min(currentIndex + 1, PROJECTS.length - 1);
    scrollToIndex(nextIndex);
  };

  const prevProject = () => {
    const prevIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentIndex]);

  const loadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + (isMobile ? 2 : 3), PROJECTS.length)
    );
  };

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="space-container">
        <SectionHeader
          title="My Projects"
          subtitle="Explore the digital constellations I've created"
        />

        {isMobile ? (
          <div className="relative">
            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between items-center z-10 pointer-events-none">
              <button
                onClick={prevProject}
                disabled={currentIndex === 0}
                className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                  currentIndex === 0
                    ? "bg-white/30 text-gray-400 cursor-not-allowed"
                    : "bg-white/90 dark:bg-space-dark/90 text-gray-800 dark:text-white hover:bg-space-accent hover:text-white hover:scale-110 shadow-lg"
                }`}
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextProject}
                disabled={currentIndex >= PROJECTS.length - 1}
                className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                  currentIndex >= PROJECTS.length - 1
                    ? "bg-white/30 text-gray-400 cursor-not-allowed"
                    : "bg-white/90 dark:bg-space-dark/90 text-gray-800 dark:text-white hover:bg-space-accent hover:text-white hover:scale-110 shadow-lg"
                }`}
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 scrollbar-hide"
              style={{
                scrollBehavior: "smooth",
                scrollSnapType: "x mandatory",
              }}
              aria-label="Projects carousel"
            >
              {PROJECTS.map((project, idx) => (
                <div
                  key={idx}
                  className="min-w-[300px] w-[85%] max-w-[350px] snap-center snap-always flex-shrink-0"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {/* Enhanced clickable carousel indicators */}
            <div className="flex justify-center mt-6 gap-2 px-4">
              {PROJECTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-space-accent/50 ${
                    idx === currentIndex
                      ? "w-8 h-3 bg-space-accent shadow-lg shadow-space-accent/30"
                      : "w-3 h-3 bg-gray-400 dark:bg-space-accent/30 hover:bg-space-accent/60 hover:scale-110"
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>

            {/* Enhanced swipe hint with project counter */}
            <div className="text-center mt-3">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-white/50">
                <span>
                  {currentIndex + 1} of {PROJECTS.length}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  Swipe to explore
                  <svg
                    className="w-4 h-4 animate-pulse"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {PROJECTS.slice(0, visibleCount).map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        )}

        {hasMoreProjects && !isMobile && (
          <div className="mt-10 sm:mt-12 text-center">
            <button
              onClick={loadMore}
              className="group px-6 py-3 rounded-lg bg-space-accent/10 dark:bg-space-accent/10 border border-space-accent/30 text-space-accent hover:bg-space-accent hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-medium"
            >
              <span className="flex items-center gap-2">
                Load More Projects
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
              </span>
            </button>
          </div>
        )}

        {/* Enhanced Profile links section */}
        <div className="mt-20 sm:mt-24">
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-gradient">
              Check Out My Profiles
            </h3>
            <p className="text-gray-500 dark:text-white/70 max-w-md mx-auto">
              Connect with me across different platforms and explore my coding
              journey
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="https://github.com/Krishnarajan7"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl cosmic-card border border-space-accent/20 hover:border-space-accent/40 transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 rounded-lg bg-space-accent/10 group-hover:bg-space-accent/20 transition-colors">
                <Github className="w-5 h-5 text-space-accent" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-gray-500  dark:text-white">
                  GitHub
                </span>
                <span className="text-xs  dark:text-white/80">
                  Explore the Repo Galaxy
                </span>
              </div>
            </a>

            <a
              href="https://leetcode.com/u/KrishCodes7/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl cosmic-card border border-space-nebula/20 hover:border-space-nebula/40 transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 rounded-lg bg-space-nebula/10 group-hover:bg-space-nebula/20 transition-colors">
                <Code className="w-5 h-5 text-space-nebula" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-orange-500 dark:text-white">
                  LeetCode
                </span>
                <span className="text-xs  dark:text-white/80">
                  Dive Into Code Mania
                </span>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/krishnarajan007"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-4 rounded-xl cosmic-card border border-space-accent/20 hover:border-space-accent/40 transition-all duration-300 hover:scale-105"
            >
              <div className="p-2 rounded-lg bg-gradient-to-br from-space-accent/10 to-space-nebula/10 group-hover:from-space-accent/20 group-hover:to-space-nebula/20 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-space-accent"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-blue-500 dark:text-white">
                  LinkedIn
                </span>
                <span className="text-xs  dark:text-white/80">
                  Connect & Collaborate
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
