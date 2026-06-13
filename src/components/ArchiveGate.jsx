import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Lock, Rocket as RocketIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  CLEARANCE QUESTIONS                                                */
/*  Answers are all discoverable on the main site (About / Contact)   */
/*  or known to people who actually know Krish.                       */
/* ------------------------------------------------------------------ */
const CHECKPOINTS = [
  {
    prompt: 'Identify the fuel. This developer runs on ______ — never coffee.',
    hint: 'A certain malt drink. Check the “Beyond Code” section on the home page.',
    answers: ['horlicks'],
  },
  {
    prompt: 'Mission origin — which space organisation granted me an internship?',
    hint: 'Four letters. India’s finest. It’s on my timeline.',
    answers: ['isro', 'indianspaceresearchorganisation', 'indianspaceresearchorganization'],
  },
  {
    prompt: 'Stardate of first ignition — what year did the coding journey begin?',
    hint: 'A single year. The very first dot on “My Journey”.',
    answers: ['2022'],
  },
  {
    prompt: 'Name the open constellation I’m building — my open-source library.',
    hint: 'Devs unite here. It’s highlighted on the home page.',
    answers: ['devverse'],
  },
  {
    prompt: 'Home-base coordinates — which city do I launch from?',
    hint: 'A coastal metro in Tamil Nadu, India.',
    answers: ['chennai'],
  },
];

const normalize = (s) => s.trim().toLowerCase().replace(/[^a-z0-9]/g, '');

/* ------------------------------------------------------------------ */
/*  ROCKET — the entry-point graphic (animated SVG)                   */
/* ------------------------------------------------------------------ */
const Rocket = ({ launching }) => (
  <div className={launching ? 'rocket-launch' : 'rocket-float'}>
    <svg width="96" height="120" viewBox="0 0 96 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* flame */}
      <g className="rocket-flame" style={{ transformOrigin: '48px 96px' }}>
        <path d="M48 118c-9 0-15-9-15-18 0-6 4-11 8-16 3 5 4 8 7 8s4-3 7-8c4 5 8 10 8 16 0 9-6 18-15 18z" fill="#9b87f5" opacity="0.9" />
        <path d="M48 110c-5 0-8-5-8-10 0-3 2-6 4-9 2 3 2 4 4 4s2-1 4-4c2 3 4 6 4 9 0 5-3 10-8 10z" fill="#EDEBFF" />
      </g>
      {/* body */}
      <path d="M48 4c14 0 24 22 24 46 0 14-4 26-8 34H32c-4-8-8-20-8-34C24 26 34 4 48 4z" fill="#EDEBFF" />
      {/* nose tint */}
      <path d="M48 4c8 0 15 7 19 18-6-3-12-4-19-4s-13 1-19 4C33 11 40 4 48 4z" fill="#9b87f5" />
      {/* window */}
      <circle cx="48" cy="44" r="11" fill="#0F1729" />
      <circle cx="48" cy="44" r="11" stroke="#9b87f5" strokeWidth="3" />
      <circle cx="44" cy="40" r="3" fill="#9b87f5" opacity="0.7" />
      {/* fins */}
      <path d="M32 70c-10 4-16 12-16 22 8-2 14-6 16-12V70z" fill="#9b87f5" />
      <path d="M64 70c10 4 16 12 16 22-8-2-14-6-16-12V70z" fill="#9b87f5" />
    </svg>
  </div>
);

/* ------------------------------------------------------------------ */
/*  GATE                                                              */
/* ------------------------------------------------------------------ */
const ArchiveGate = ({ onUnlock }) => {
  const [stage, setStage] = useState('intro'); // 'intro' | 'quiz' | 'launch'
  const [step, setStep] = useState(0);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (stage === 'quiz' && inputRef.current) inputRef.current.focus();
  }, [stage, step]);

  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    const ok = CHECKPOINTS[step].answers.includes(normalize(value));
    if (!ok) {
      setError('Access denied. Re-check your coordinates.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setError('');
    setValue('');
    if (step < CHECKPOINTS.length - 1) {
      setStep((s) => s + 1);
    } else {
      // all correct → launch sequence
      setStage('launch');
      setTimeout(() => onUnlock(), 1700);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{ background: 'radial-gradient(circle at 50% 30%, #1A1F2C 0%, #0F1729 70%)', color: '#EDEBFF' }}
    >
      {/* starfield */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + (i % 3)}px`,
              height: `${1 + (i % 3)}px`,
              top: `${(i * 47.3) % 100}%`,
              left: `${(i * 71.7) % 100}%`,
              opacity: 0.15 + (i % 5) * 0.12,
              animation: `gate-twinkle ${3 + (i % 5)}s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      {/* back to base */}
      <Link
        to="/"
        className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase opacity-70 hover:opacity-100 transition-opacity"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to base
      </Link>

      {/* rocket */}
      <div className={`relative z-10 mb-8 ${shake ? 'gate-shake' : ''}`}>
        <Rocket launching={stage === 'launch'} />
      </div>

      <AnimatePresence mode="wait">
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center max-w-md"
          >
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase px-3 py-1 mb-6 rounded-full border" style={{ borderColor: 'rgba(155,135,245,0.4)', color: '#9b87f5' }}>
              <Lock className="w-3 h-3" /> Restricted Airspace
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#EDEBFF' }}>
              The Krish Archive
            </h1>
            <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: 'rgba(237,235,255,0.65)' }}>
              This is a private sector of the galaxy. Only those with clearance may
              enter. Pass the 5-point pre-flight check and the rocket is yours.
            </p>
            <button
              onClick={() => setStage('quiz')}
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5"
              style={{ background: '#9b87f5', color: '#0F1729' }}
            >
              <RocketIcon className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Begin pre-flight check
            </button>
          </motion.div>
        )}

        {stage === 'quiz' && (
          <motion.div
            key={`q-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className={`relative z-10 w-full max-w-md text-center ${shake ? 'gate-shake' : ''}`}
          >
            {/* fuel gauge */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {CHECKPOINTS.map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? 28 : 16,
                    background: i < step ? '#9b87f5' : i === step ? 'rgba(155,135,245,0.6)' : 'rgba(237,235,255,0.15)',
                  }}
                />
              ))}
            </div>

            <div className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: '#9b87f5' }}>
              Checkpoint {step + 1} / {CHECKPOINTS.length}
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 leading-snug px-2" style={{ color: '#EDEBFF' }}>
              {CHECKPOINTS[step].prompt}
            </h2>
            <p className="text-xs mb-6" style={{ color: 'rgba(237,235,255,0.45)' }}>
              {CHECKPOINTS[step].hint}
            </p>

            <form onSubmit={submit} className="flex flex-col items-center gap-3">
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type your answer…"
                className="w-full px-4 py-3 rounded-lg bg-transparent border text-center outline-none transition-colors focus:border-[#9b87f5]"
                style={{ borderColor: 'rgba(237,235,255,0.2)', color: '#EDEBFF' }}
                autoComplete="off"
                spellCheck="false"
              />
              {error && (
                <div className="text-xs" style={{ color: '#ff6b6b' }}>
                  {error}
                </div>
              )}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-medium transition-all hover:-translate-y-0.5"
                style={{ background: '#9b87f5', color: '#0F1729' }}
              >
                {step < CHECKPOINTS.length - 1 ? 'Verify →' : 'Ignite engines 🚀'}
              </button>
            </form>
          </motion.div>
        )}

        {stage === 'launch' && (
          <motion.div
            key="launch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10 text-center"
          >
            <div className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: '#9b87f5' }}>
              Clearance granted
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: '#EDEBFF' }}>
              Lift-off…
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes gate-twinkle { 0%,100% { opacity: .15; } 50% { opacity: .9; } }
        @keyframes gate-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes gate-flame { 0%,100% { transform: scaleY(1) scaleX(1); opacity: .9; } 50% { transform: scaleY(1.35) scaleX(.85); opacity: 1; } }
        @keyframes gate-launch { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-120vh); opacity: 0; } }
        @keyframes gate-shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-8px); } 40%,80% { transform: translateX(8px); } }
        .rocket-float { animation: gate-float 3s ease-in-out infinite; }
        .rocket-launch { animation: gate-launch 1.6s cubic-bezier(.5,0,.75,0) forwards; }
        .rocket-flame { animation: gate-flame .25s ease-in-out infinite; }
        .gate-shake { animation: gate-shake .45s ease-in-out; }
      `}</style>
    </div>
  );
};

export default ArchiveGate;
