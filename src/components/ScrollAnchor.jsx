import React, { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// FontAwesome "link" (fa-link) — one chain-link segment, tiled to build the chain.
const LINK_PATH =
  "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59l-.001.01-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.32 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.37.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z";

const ANCHOR_PATH =
  "M12.971 352h32.394C67.172 454.735 181.944 512 288 512c106.229 0 220.853-57.38 242.635-160h32.394c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0l-67.029 67.029c-7.56 7.56-2.206 20.485 8.485 20.485h35.146c-20.29 54.317-84.963 86.588-144.117 94.015V256h52c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-52v-5.47c37.281-13.178 63.995-48.725 64-90.518C384.005 43.772 341.605.738 289.37.01 235.723-.739 192 42.525 192 96c0 41.798 26.716 77.35 64 90.53V192h-52c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h52v190.015c-58.936-7.399-123.82-39.679-144.117-94.015h35.146c10.691 0 16.045-12.926 8.485-20.485l-67.029-67.029c-4.686-4.686-12.284-4.686-16.971 0L4.485 331.515C-3.074 339.074 2.28 352 12.971 352zM288 64c17.645 0 32 14.355 32 32s-14.355 32-32 32-32-14.355-32-32 14.355-32 32-32z";

// Chain-link sizing (tweak these to make the chain denser / looser).
const LINK_SIZE = 26; // rendered size of one link icon
const LINK_ADVANCE = 17; // vertical distance gained per link (overlap = LINK_SIZE - this)

/**
 * ScrollAnchor
 *
 * A desktop-only chain pinned to the LEFT edge. The chain is a column of
 * repeated chain-link icons that grows downward to meet the anchor, and the
 * anchor slides with the page scroll. The chain only ever trails *above*
 * (behind) the anchor — there's nothing in front/below it.
 */
const ScrollAnchor = ({ size = 56 }) => {
  const railRef = useRef(null);
  const [railHeight, setRailHeight] = useState(0);
  const travel = Math.max(0, railHeight - size);

  // Page scroll progress: 0 at the top, 1 at the bottom.
  // Mapped directly to position (no spring) so the chain length stays exactly
  // proportional to scroll — no bounce/stretch at the top or footer.
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, travel]);

  // Chain grows to just behind the anchor's top, so it never shows below it.
  const chainHeight = useTransform(y, (v) => v + size * 0.42);

  useLayoutEffect(() => {
    const measure = () => {
      if (railRef.current) setRailHeight(railRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const linkCount = Math.ceil(railHeight / LINK_ADVANCE) + 2;

  return (
    <div
      ref={railRef}
      aria-hidden="true"
      className="fixed top-0 left-4 lg:left-8 h-screen z-30 pointer-events-none hidden md:flex justify-center"
      style={{ width: size }}
    >
      {/* Chain — clipped to its current height, so it only renders behind/above the anchor */}
      <motion.div
        style={{ height: chainHeight }}
        className="absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden flex flex-col items-center justify-start text-space-accent/60"
      >
        {Array.from({ length: linkCount }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width={LINK_SIZE}
            height={LINK_SIZE}
            fill="currentColor"
            className="shrink-0"
            style={{
              marginTop: i === 0 ? 0 : LINK_ADVANCE - LINK_SIZE,
              transform: "rotate(45deg)",
            }}
          >
            <path d={LINK_PATH} />
          </svg>
        ))}
      </motion.div>

      {/* Anchor — sits on top of the chain */}
      <motion.div
        style={{ y, width: size, height: size }}
        className="relative z-10 text-space-accent drop-shadow-[0_0_8px_rgba(126,105,171,0.6)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="currentColor"
          width={size}
          height={size}
        >
          <path d={ANCHOR_PATH} />
        </svg>
      </motion.div>
    </div>
  );
};

export default ScrollAnchor;
