"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  className,
}) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={cn("select-none uppercase cursor-pointer", className)}
    >
      <defs>
        {/* Dark mode gradient */}
        <linearGradient
          id="textGradientDark"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          <>
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="25%" stopColor="#9b87f5" />
            <stop offset="50%" stopColor="#c084fc" />
            <stop offset="75%" stopColor="#e879f9" />
            <stop offset="100%" stopColor="#9b87f5" />
          </>
        </linearGradient>
        
        {/* Light mode gradient - original demo colors */}
        <linearGradient
          id="textGradientLight"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          <>
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="25%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#80eeb4" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </>
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        className="fill-transparent stroke-white/20 dark:stroke-white/20 font-[helvetica] text-7xl font-bold"
        animate={{
          opacity: hovered ? 0.9 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.text>
      
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#9b87f5] dark:stroke-[#9b87f5] font-[helvetica] text-7xl font-bold"
        style={{ stroke: 'var(--stroke-color, #9b87f5)' }}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
          filter: hovered ? "url(#glow)" : "none",
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.text>
      
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
        style={{ 
          stroke: 'url(#textGradientDark)',
        }}
        animate={{
          strokeWidth: hovered ? 0.6 : 0.4,
          filter: hovered ? "url(#glow)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.text>
      
      {/* Light mode version */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold hidden dark:hidden"
        style={{ 
          stroke: 'url(#textGradientLight)',
        }}
        animate={{
          strokeWidth: hovered ? 0.6 : 0.4,
          filter: hovered ? "url(#glow)" : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F172966 50%, #9b87f533 100%)",
      }}
    />
  );
};
