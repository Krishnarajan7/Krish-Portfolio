import React, { useEffect, useRef } from 'react';

/**
 * CustomCursor
 *
 * A brand arrow cursor that stays visible against ANY background. It samples
 * the background colour beneath the pointer and, when the brand purple would
 * blend in (low contrast — e.g. over the purple or light sections), swaps to
 * the higher-contrast secondary colour. Falls back to the native cursor on
 * touch devices and over text fields.
 */

const PRIMARY = '#9b87f5'; // brand purple
const SECONDARY_DARK = '#0F1729'; // space navy
const SECONDARY_LIGHT = '#EDEBFF'; // off-white
const MIN_CONTRAST = 3; // WCAG threshold for graphical objects

const hexToRgb = (h) => {
  const n = parseInt(h.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const parseColor = (s) => {
  const m = s && s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(',').map((x) => parseFloat(x.trim()));
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
};

const relLuminance = ({ r, g, b }) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

const contrast = (c1, c2) => {
  const L1 = relLuminance(c1);
  const L2 = relLuminance(c2);
  const hi = Math.max(L1, L2);
  const lo = Math.min(L1, L2);
  return (hi + 0.05) / (lo + 0.05);
};

const PRIMARY_RGB = hexToRgb(PRIMARY);
const DARK_RGB = hexToRgb(SECONDARY_DARK);
const LIGHT_RGB = hexToRgb(SECONDARY_LIGHT);

const isTextField = (el) =>
  el &&
  (el.matches?.('input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, [contenteditable="true"]'));

const CustomCursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(pointer: fine)').matches) return; // touch → skip

    const el = ref.current;
    if (!el) return;

    let lastSample = 0;

    // Walk up from the topmost element under the pointer to the first
    // element that actually paints a background colour.
    const sampleBg = (x, y) => {
      let node = document.elementFromPoint(x, y);
      while (node) {
        const c = parseColor(getComputedStyle(node).backgroundColor);
        if (c && c.a > 0) return c;
        node = node.parentElement;
      }
      return DARK_RGB; // sensible default
    };

    const onMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      // tip hotspot is at (1,1) in the svg → nudge by -1px
      el.style.transform = `translate3d(${x - 1}px, ${y - 1}px, 0)`;
      el.style.opacity = '1';

      // Hide our cursor over text fields so the native caret shows.
      const target = e.target;
      if (isTextField(target)) {
        el.style.opacity = '0';
        return;
      }

      const now = performance.now();
      if (now - lastSample < 50) return; // throttle colour sampling
      lastSample = now;

      const bg = sampleBg(x, y);
      let color = PRIMARY;
      if (contrast(PRIMARY_RGB, bg) < MIN_CONTRAST) {
        // brand purple would blend → pick the higher-contrast secondary
        color = contrast(DARK_RGB, bg) >= contrast(LIGHT_RGB, bg) ? SECONDARY_DARK : SECONDARY_LIGHT;
      }
      el.style.color = color;
    };

    const onLeave = () => { el.style.opacity = '0'; };
    const onDown = () => { el.style.transform += ' scale(0.85)'; };

    document.body.classList.add('custom-cursor-active');
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="custom-cursor" style={{ color: PRIMARY, opacity: 0 }}>
      <svg width="26" height="31" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.0163927 2.02202C0.0136971 1.67335 0.108149 1.33081 0.289166 1.03279C0.470182 0.734775 0.730611 0.493051 1.04127 0.334708C1.35193 0.176364 1.70054 0.107657 2.04805 0.136285C2.39556 0.164913 2.72823 0.289746 3.00879 0.496794L18.1122 11.6495C19.5625 12.7198 18.8142 15.0238 17.0118 15.0377L9.60132 15.095C9.31363 15.0971 9.03027 15.1652 8.7731 15.2942C8.51593 15.4231 8.29184 15.6094 8.11811 15.8387L3.53485 21.9107C2.45502 23.3423 0.173517 22.5883 0.15964 20.7934L0.0163927 2.02202Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};

export default CustomCursor;
