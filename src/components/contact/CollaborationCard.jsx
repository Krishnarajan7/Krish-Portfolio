import React from "react";
import { ArrowRight } from "lucide-react";

const CollaborationCard = () => {
  return (
    <div className="cosmic-card p-8 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4">
          Let's collaborate!
        </h3>
        <p className="text-white/70 mb-6">
          I'm currently available for freelance projects, long-term
          collaborations, or full-time positions. If you have something
          interesting in mind, don't hesitate to reach out!
        </p>
        <a
          href="mailto:krishh.v777@gmail.com"
          className="inline-flex items-center text-space-accent hover:underline"
        >
          Get in touch <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>

      {/* Decorative elements */}
      <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-space-accent/10 blur-2xl"></div>
      <div className="absolute top-0 right-0 opacity-30 text-white/20">
        <div className="rotate-12">{"</>"}</div>
      </div>
    </div>
  );
};

export default CollaborationCard;
