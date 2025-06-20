import React from "react";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-space-darker py-8 border-t border-white/5">
      <div className="space-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-center md:text-left">
              © {new Date().getFullYear()} Krishnarajan – Exploring Code &
              Cosmos 🌌
            </p>
          </div>

          <button
            className="p-3 rounded-full bg-space-accent/10 hover:bg-space-accent/20 transition-colors group"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5 text-space-accent group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
