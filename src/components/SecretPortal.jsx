import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SecretPortal
 *
 * A subtle, discoverable entry point to the hidden archive (/journey).
 * Instead of an obvious button, it's a slowly drifting, faintly glowing
 * asteroid — a curious explorer will notice it and click through; everyone
 * else scrolls past. The rocket is reserved for the clearance gate.
 */
const SecretPortal = () => {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      <Link
        to="/journey"
        aria-label="Enter the restricted sector"
        className="secret-asteroid group relative inline-block focus:outline-none"
      >
        {/* faint glow halo */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -m-6 rounded-full opacity-40 group-hover:opacity-90 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(circle, rgba(155,135,245,0.35) 0%, transparent 70%)',
          }}
        />

        {/* the asteroid */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-500 group-hover:scale-110"
        >
          {/* irregular rock body */}
          <path
            d="M50 8 L70 14 L86 30 L92 52 L82 74 L62 90 L38 88 L16 76 L8 52 L14 28 L30 14 Z"
            fill="#262b3a"
            stroke="rgba(155,135,245,0.45)"
            strokeWidth="2"
          />
          {/* rim light */}
          <path
            d="M50 8 L70 14 L86 30 L92 52"
            fill="none"
            stroke="rgba(155,135,245,0.7)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* craters */}
          <ellipse cx="40" cy="40" rx="9" ry="7" fill="#1a1f2c" />
          <ellipse cx="40" cy="40" rx="9" ry="7" fill="none" stroke="rgba(155,135,245,0.25)" strokeWidth="1.5" />
          <ellipse cx="64" cy="58" rx="6" ry="5" fill="#1a1f2c" />
          <ellipse cx="34" cy="66" rx="4" ry="3.5" fill="#1a1f2c" />
          <circle cx="68" cy="36" r="2.5" fill="#1a1f2c" />
        </svg>

        {/* whisper of a label — only on hover */}
        <span
          className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-[10px] tracking-[0.35em] uppercase text-space-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Restricted sector
        </span>
      </Link>

      <style>{`
        @keyframes secret-drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50%      { transform: translate(6px, -10px) rotate(8deg); }
        }
        .secret-asteroid {
          animation: secret-drift 9s ease-in-out infinite;
          filter: drop-shadow(0 0 6px rgba(155,135,245,0.25));
        }
        .secret-asteroid:hover {
          filter: drop-shadow(0 0 14px rgba(155,135,245,0.6));
        }
        @media (prefers-reduced-motion: reduce) {
          .secret-asteroid { animation: none; }
        }
      `}</style>
    </div>
  );
};

export default SecretPortal;
