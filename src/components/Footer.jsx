import React from 'react';
import { TextHoverEffect } from "@/components/ui/hover-footer";

const Footer = () => {
  return (
    <footer className="relative h-[200px] md:h-[400px] overflow-hidden flex items-end">
      {/* Text hover effect and copyright */}
      <div className="flex flex-col h-[180px] md:h-[450px] w-full items-center justify-end pb-4 px-4">
        <TextHoverEffect text="KRISH" className="z-50" />
        <p className="text-white/80 text-xs md:text-sm text-center">
          &copy; 2026 Krishnarajan. All rights reserved 🤍
        </p>
      </div>
    </footer>
  );
};

export default Footer;