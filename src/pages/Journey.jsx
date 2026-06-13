import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ScrollAnchor from '../components/ScrollAnchor';

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const chapters = [
  {
    no: '01',
    year: '2022',
    tag: 'THE SPARK',
    title: 'The first lines of code.',
    body: `This is where it all began. I started programming — messy, curious, and completely hooked. My first "Hello World" was ugly and broken, and the proudest moment I'd had in a while. No classroom needed, just curiosity and Wi-Fi.`,
    pull: 'Tutorial hell only ends when you build on your own.',
    stamp: 'BEGIN',
  },
  {
    no: '02',
    year: '2023',
    tag: 'PROBLEM SOLVING',
    title: 'Falling for data structures & algorithms.',
    body: `I stopped just writing code and started thinking in it. DSA turned every problem into a puzzle box. Hours on LeetCode (KrishCodes7) sharpened the logic that everything else would be built on — structured thinking with a keyboard.`,
    pull: 'Logic is a muscle. I trained it daily.',
    stamp: 'DSA / 23',
  },
  {
    no: '03',
    year: '2024',
    tag: 'FIRST CLIENT',
    title: 'My first real freelance project.',
    body: `I built and deployed a website for Vedha Clothing — my first paying client and the start of the freelance journey. Shipping something real, for someone real, changed everything. Every bug was a teacher; every deadline, a lesson.`,
    pull: 'The first invoice felt like winning a championship.',
    stamp: 'FIELD / 24',
  },
  {
    no: '04',
    year: 'Feb 2025',
    tag: 'ISRO',
    title: 'An internship at the edge of space.',
    body: `Completed an internship at ISRO Propulsion Complex, Mahendragiri (Thirunelveli). Working near rocket engineering — where precision isn't a preference, it's the whole job — recalibrated how seriously I took the craft.`,
    pull: 'Precision is a discipline, not a preference.',
    stamp: 'ISRO / 25',
  },
  {
    no: '05',
    year: 'Jul 2025',
    tag: 'FREELANCE',
    title: 'Ten projects, one international client.',
    body: `Crossed 10+ freelance projects shipped, including a website for an international client. Different stacks, different timezones, different problems — each one stretched the toolkit a little further: React, Node, Django, PostgreSQL.`,
    pull: 'Ten clients. Ten very different lessons.',
    stamp: 'SHIP / 25',
  },
  {
    no: '06',
    year: 'Oct 2025',
    tag: 'FULL STACK',
    title: 'Full-Stack Intern at Krafzen.',
    body: `A six-month internship at Krafzen — backend developer on one project, frontend on another, both contributing to scalable SaaS products. The whole machine, end to end. This is where "developer" started feeling like "engineer".`,
    pull: 'Backend on one, frontend on another. The whole machine.',
    stamp: 'STACK / 25',
  },
  {
    no: '07',
    year: '2026',
    tag: 'TODAY',
    title: 'Building, shipping, sharing — out loud.',
    body: `Joined my first company, Terabyte India (Thiruvarur), as a Mobile App Developer before returning to building independently. Now I'm freelancing, growing DevVerse as an open library for fellow devs, and shipping in public. This isn't a finale — it's the warm-up lap.`,
    pull: 'The journey is far from over.',
    stamp: 'NOW',
  },
];

const facts = [
  ['Horlicks', 'fuel of choice — never coffee'],
  ['2.6 yrs',  'deep in the craft'],
  ['10+',      'freelance projects shipped'],
  ['ISRO',     'where I once interned'],
  ['DevVerse', 'building open source in public'],
  ['Lo-fi',    'the genre that ships code'],
];

const desires = {
  Places:  ['Japan — Tokyo nights, Kyoto temples', 'Iceland — northern lights & volcanic roads', 'Switzerland — trains through mountains', 'Norway — fjords & midnight sun', 'New Zealand — Hobbiton & star-gazing'],
  Things:  ['Custom mechanical keyboard, brass plate, my own keymap', 'Standing desk + a single ultrawide monitor', 'A home server lab — self-hosted, quietly humming', 'Film camera, real rolls, developed by hand', 'A fast e-bike for city commutes'],
  Moments: ['Ship a SaaS that pays rent', 'Speak at a real conference, not a meetup', 'Merge a PR into a project I admire', 'Build a cabin workspace with fast Wi-Fi', 'Mentor someone into their first dev job'],
};

const beliefs = [
  'Curiosity beats talent — every single time.',
  'Ship rough, ship often, polish in public.',
  'Reading code is a superpower most devs ignore.',
  'The best feature is the one you didn\'t have to build.',
  'Teaching is the fastest way to truly learn.',
];

const placesToVisit = [
  { no: '01', name: 'Milford Sound', country: 'New Zealand', flag: '🇳🇿', tag: "Fjordland's crown jewel — cruises, waterfalls & dolphins" },
  { no: '02', name: 'Queenstown', country: 'New Zealand', flag: '🇳🇿', tag: 'Adventure capital of the world' },
  { no: '03', name: 'Edinburgh Castle', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', tag: "Britain's oldest crown jewels on volcanic rock" },
  { no: '04', name: 'Isle of Skye', country: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', tag: 'Fairy pools, sea cliffs & Talisker distillery' },
  { no: '05', name: 'Santorini', country: 'Greece', flag: '🇬🇷', tag: 'Blue domes, caldera views & famous sunsets' },
  { no: '06', name: 'Amalfi Coast', country: 'Italy', flag: '🇮🇹', tag: 'Cliffside villages & turquoise sea' },
  { no: '07', name: 'Swiss Alps', country: 'Switzerland', flag: '🇨🇭', tag: 'Matterhorn, glaciers & alpine perfection' },
  { no: '08', name: 'Northern Lights', country: 'Iceland', flag: '🇮🇸', tag: 'Aurora dancing across dark Arctic skies' },
  { no: '09', name: 'Lofoten Islands', country: 'Norway', flag: '🇳🇴', tag: 'Mountains from the sea — pure cinematic magic' },
  { no: '10', name: 'Machu Picchu', country: 'Peru', flag: '🇵🇪', tag: 'Lost City of the Incas, 7 Wonders of the World' },
  { no: '11', name: 'Patagonia', country: 'Chile', flag: '🇨🇱', tag: 'Torres del Paine — end of the world wilderness' },
  { no: '12', name: 'Serengeti', country: 'Tanzania', flag: '🇹🇿', tag: 'The Great Migration — raw, untouched Africa' },
  { no: '13', name: 'Cappadocia', country: 'Turkey', flag: '🇹🇷', tag: 'Hot air balloons at sunrise over fairy chimneys' },
  { no: '14', name: 'Bali', country: 'Indonesia', flag: '🇮🇩', tag: 'Rice terraces, temples & jungle culture' },
  { no: '15', name: 'The Maldives', country: 'Maldives', flag: '🇲🇻', tag: 'Overwater bungalows, lagoons & world-class reefs' },
  { no: '16', name: 'Jammu & Kashmir', country: 'India', flag: '🇮🇳', tag: 'Dal Lake houseboats, shikara rides & Himalayan peaks' },
  { no: '17', name: 'Shimla', country: 'India', flag: '🇮🇳', tag: 'Queen of Hills — Toy Train & snowy peaks' },
  { no: '18', name: 'Oman', country: 'Oman', flag: '🇴🇲', tag: "Ancient souks, wadis & desert coast — Reddit's #1 hidden gem" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                              */
/* ------------------------------------------------------------------ */

const Journey = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    // Load the page's display + body fonts (Space Grotesk / Inter) once.
    const id = 'journey-fonts';
    if (!document.getElementById(id)) {
      const l = document.createElement('link');
      l.id = id;
      l.rel = 'stylesheet';
      l.href =
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap';
      document.head.appendChild(l);
    }
    // force the dark space theme on body for this page
    const prev = document.body.className;
    document.body.classList.add('dark-mode');
    document.body.classList.remove('light-mode');
    document.body.style.background = '#0F1729';
    return () => {
      document.body.className = prev;
      document.body.style.background = '';
    };
  }, []);

  return (
    <div
      className="journey-page relative min-h-screen [overflow-x:clip]"
      style={{
        background: '#0F1729',
        color: '#EDEBFF',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* paper grain */}
      <PaperGrain />

      {/* scroll indicator — chain + anchor that tracks page scroll */}
      <ScrollAnchor />

      {/* MASTHEAD */}
      <header
        className="sticky top-0 z-40 border-b-2"
        style={{ borderColor: 'rgba(237,235,255,0.15)', background: 'rgba(15,23,41,0.85)', backdropFilter: 'blur(8px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase hover:text-[#9b87f5] transition-colors"
            style={{ color: '#EDEBFF' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <div
            className="text-[10px] sm:text-xs tracking-[0.4em] uppercase"
            style={{ color: '#EDEBFF' }}
          >
            The Krish Archive · Vol. I
          </div>
          <div className="text-[10px] sm:text-xs tracking-[0.25em] uppercase hidden sm:block">
            № 001
          </div>
        </div>
      </header>

      {/* HERO — editorial cover */}
      <section className="border-b-2" style={{ borderColor: 'rgba(237,235,255,0.18)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-14 sm:pt-16 sm:pb-24">
          <div className="flex items-center gap-3 text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-8">
            <span style={{ background: '#9b87f5', color: '#0F1729' }} className="px-2 py-1">
              ISSUE 001
            </span>
            <span>·</span>
            <span>2022 — Present</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Unfiltered</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="leading-[0.88] tracking-tight"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(2.4rem, 7vw, 6rem)',
              fontWeight: 400,
              color: '#EDEBFF',
            }}
          >
            The long
            <br />
            version of
            <br />
            <span style={{ fontStyle: 'italic', color: '#9b87f5' }}>a developer.</span>
          </motion.h1>

          <div className="mt-10 sm:mt-14 grid grid-cols-12 gap-6 sm:gap-10">
            <div className="col-span-12 md:col-span-5">
              <div className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(237,235,255,0.55)' }}>
                Editor's note
              </div>
              <p
                className="text-[15px] sm:text-[17px] leading-[1.55]"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}
              >
                You found the unlocked archive. What follows isn't a résumé,
                a pitch, or a brag — it's the receipt. Seven chapters, one
                stubborn obsession, and a lot of warm Horlicks.
              </p>
            </div>

            <div className="col-span-12 md:col-span-7 md:pl-10 md:border-l-2" style={{ borderColor: 'rgba(237,235,255,0.18)' }}>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                {[
                  ['2022', 'where it began'],
                  ['07',   'chapters logged'],
                  ['∞',    'still to learn'],
                  ['01',   'mission: build & share'],
                ].map(([k, v], i) => (
                  <div key={i} className="border-t pt-3" style={{ borderColor: 'rgba(237,235,255,0.18)' }}>
                    <div
                      className="leading-none"
                      style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 700 }}
                    >
                      {k}
                    </div>
                    <div className="text-[10px] tracking-[0.3em] uppercase mt-2" style={{ color: 'rgba(237,235,255,0.55)' }}>
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* PART ONE — THE LONG READ (article with sticky table of contents) */}
      <ArticleSection />

      {/* CHAPTERS — asymmetric editorial spread */}
      <section className="border-b-2" style={{ borderColor: 'rgba(237,235,255,0.18)' }}>
        <SectionTitle kicker="Part Two" title="Chapters" rightTag="Read in order ↓" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10">
          {chapters.map((c, i) => (
            <Chapter key={c.no} c={c} flip={i % 2 === 1} index={i} />
          ))}
        </div>
      </section>

      {/* FACTS — ticket-stub grid */}
      <section className="border-b-2" style={{ borderColor: 'rgba(237,235,255,0.18)', background: '#1A1F2C', color: '#EDEBFF' }}>
        <SectionTitle
          kicker="Part Three"
          title="Off-the-record facts"
          rightTag="Filed: misc."
          dark
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {facts.map(([k, v], i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="relative p-5 sm:p-6"
              style={{
                background: '#EDEBFF',
                color: '#0F1729',
                border: '2px solid #EDEBFF',
                clipPath:
                  'polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)',
                transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (0.6 + (i % 3) * 0.4)}deg)`,
              }}
            >
              <div className="text-[9px] tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(237,235,255,0.55)' }}>
                Fact № {String(i + 1).padStart(2, '0')}
              </div>
              <div
                className="leading-none mb-3"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700 }}
              >
                {k}
              </div>
              <div className="text-xs tracking-[0.2em] uppercase">{v}</div>
              {/* punch hole */}
              <div
                className="absolute right-3 top-3 w-3 h-3 rounded-full"
                style={{ background: '#0F1729' }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* DESIRES — index-card columns */}
      <section className="border-b-2" style={{ borderColor: 'rgba(237,235,255,0.18)' }}>
        <SectionTitle kicker="Part Four" title="Wishlist on file" rightTag="Status: open" />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20 grid md:grid-cols-3 gap-6 sm:gap-8">
          {Object.entries(desires).map(([cat, items], colIdx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: colIdx * 0.1 }}
              className="relative p-6 border-2"
              style={{ borderColor: 'rgba(237,235,255,0.18)', background: '#1A1F2C' }}
            >
              <div className="absolute -top-3 left-5 px-2 text-[10px] tracking-[0.4em] uppercase" style={{ background: '#0F1729', color: '#9b87f5' }}>
                File / {String(colIdx + 1).padStart(2, '0')}
              </div>
              <div
                className="mb-5 leading-none"
                style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 'clamp(1.3rem, 2.4vw, 1.6rem)', fontWeight: 700 }}
              >
                {cat}.
              </div>
              <ul className="space-y-3">
                {items.map((it, j) => (
                  <li key={j} className="flex gap-3 text-[13px] leading-relaxed">
                    <span
                      className="shrink-0 w-5 text-[10px] tracking-widest"
                      style={{ color: '#9b87f5' }}
                    >
                      {String(j + 1).padStart(2, '0')}
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              {/* corner fold */}
              <div
                className="absolute bottom-0 right-0 w-6 h-6"
                style={{
                  background: '#0F1729',
                  clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                  borderLeft: '2px solid #0F1729',
                  borderTop: '2px solid #0F1729',
                  transform: 'translate(0,0)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* BELIEFS — manifesto list */}
      <section className="border-b-2" style={{ borderColor: 'rgba(237,235,255,0.18)' }}>
        <SectionTitle kicker="Part Five" title="What I believe" rightTag="No edits." />
        <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
          {beliefs.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex items-baseline gap-4 sm:gap-8 py-5 sm:py-7 border-t-2"
              style={{ borderColor: 'rgba(237,235,255,0.18)' }}
            >
              <span
                className="text-xs sm:text-sm tracking-[0.3em]"
                style={{ color: 'rgba(237,235,255,0.55)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="flex-1 leading-[1.05]"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontStyle: i % 2 ? 'italic' : 'normal',
                  fontSize: 'clamp(1.1rem, 2.4vw, 1.8rem)',
                }}
              >
                {b}
              </span>
              <span
                className="hidden sm:inline-block w-10 h-[2px] transition-all duration-500 group-hover:w-24"
                style={{ background: '#9b87f5' }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* PLACES TO VISIT — constellation grid */}
      <section className="border-b-2 relative overflow-hidden" style={{ borderColor: 'rgba(237,235,255,0.18)' }}>
        {/* subtle starfield background dots */}
        <div className="absolute inset-0 pointer-events-none z-0" aria-hidden>
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: 'rgba(155,135,245,0.25)',
                top: `${(i * 37.3) % 100}%`,
                left: `${(i * 61.7) % 100}%`,
                animation: `twinkle ${4 + (i % 5)}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <SectionTitle kicker="Part Six" title="Places To Visit In My Lifetime" rightTag="18 coordinates plotted" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-6">
          <p
            className="text-center max-w-2xl mx-auto mb-12 italic"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
              color: 'rgba(237,235,255,0.7)',
              lineHeight: 1.5,
            }}
          >
            "Not all who wander are lost — some are just collecting{' '}
            <span style={{ color: '#9b87f5' }}>sunsets, stamps, and stories</span> the heart will replay forever."
          </p>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-12">
          {/* desktop: bento grid with featured cards; mobile: compact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {placesToVisit.map((place, i) => {
              const isFeatured = i === 0 || i === 6 || i === 12;
              return (
                <motion.div
                  key={place.no}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                  className={`group relative p-5 sm:p-6 border-2 overflow-hidden ${isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''}`}
                  style={{
                    borderColor: 'rgba(237,235,255,0.12)',
                    background: '#1A1F2C',
                    clipPath:
                      'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                  }}
                >
                  {/* left accent bar */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 group-hover:w-[5px]"
                    style={{ background: '#9b87f5' }}
                  />

                  {/* giant flag in corner */}
                  <div
                    className="absolute top-3 right-4 opacity-90 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      fontSize: isFeatured ? 'clamp(2.5rem, 5vw, 3.5rem)' : 'clamp(1.8rem, 4vw, 2.2rem)',
                      lineHeight: 1,
                      filter: 'drop-shadow(0 4px 12px rgba(155,135,245,0.3))',
                    }}
                  >
                    {place.flag}
                  </div>

                  {/* number */}
                  <div
                    className="leading-none mb-3 transition-colors duration-300 group-hover:text-[#b8a9f8]"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: isFeatured ? 'clamp(2.5rem, 5vw, 3.5rem)' : 'clamp(1.8rem, 4vw, 2.4rem)',
                      fontWeight: 700,
                      color: '#9b87f5',
                    }}
                  >
                    {place.no}
                  </div>

                  {/* place name */}
                  <h3
                    className="leading-[1.05] mb-2 pr-12"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: isFeatured ? 'clamp(1.4rem, 3vw, 1.9rem)' : 'clamp(1.15rem, 2.5vw, 1.5rem)',
                    }}
                  >
                    {place.name}
                  </h3>

                  {/* country + tag */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="text-[10px] tracking-[0.3em] uppercase px-2 py-0.5"
                      style={{ background: 'rgba(155,135,245,0.15)', color: '#9b87f5' }}
                    >
                      {place.flag} {place.country}
                    </span>
                  </div>
                  <div
                    className="text-[11px] sm:text-xs tracking-wide"
                    style={{ color: 'rgba(237,235,255,0.55)' }}
                  >
                    {place.tag}
                  </div>

                  {/* hover glow overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(155,135,245,0.08) 0%, transparent 70%)',
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* emotional footer */}
          <div className="mt-16 text-center">
            <div
              className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: 'rgba(155,135,245,0.7)' }}
            >
              — A promise to my future self —
            </div>
            <p
              className="max-w-3xl mx-auto"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                lineHeight: 1.4,
                color: '#EDEBFF',
              }}
            >
              Someday, the boarding passes will outnumber the excuses. Until then,
              the world keeps spinning, and so does the dream.
            </p>
          </div>
        </div>
      </section>

      {/* OUTRO */}

      <section className="relative" style={{ background: '#9b87f5', color: '#0F1729' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-32 text-center">
          <div className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-6 opacity-80">
            End of issue · Thank you for reading
          </div>
          <h2
            className="leading-[0.9]"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
            }}
          >
            See you in <span style={{ fontStyle: 'italic' }}>chapter eight.</span>
          </h2>
          <Link
            to="/"
            className="inline-flex items-center gap-3 mt-10 px-6 py-3 text-xs tracking-[0.3em] uppercase border-2"
            style={{ borderColor: '#0F1729', color: '#0F1729' }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to the front page
          </Link>
        </div>
      </section>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  SUB-COMPONENTS                                                    */
/* ------------------------------------------------------------------ */

const SectionTitle = ({ kicker, title, rightTag, dark }) => (
  <div
    className="max-w-7xl mx-auto px-4 sm:px-8 pt-14 sm:pt-20 pb-8 flex items-end justify-between gap-6"
  >
    <div>
      <div
        className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-3"
        style={{ color: dark ? 'rgba(237,235,255,0.55)' : 'rgba(237,235,255,0.55)' }}
      >
        {kicker}
      </div>
      <h2
        className="leading-[0.9]"
        style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontSize: 'clamp(1.7rem, 4vw, 3rem)',
          color: dark ? '#EDEBFF' : '#0F1729',
        }}
      >
        {title}
      </h2>
    </div>
    <div
      className="hidden sm:block text-[10px] tracking-[0.4em] uppercase pb-3"
      style={{ color: dark ? 'rgba(237,235,255,0.55)' : 'rgba(237,235,255,0.55)' }}
    >
      {rightTag}
    </div>
  </div>
);

const Chapter = ({ c, flip, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-12 gap-4 sm:gap-8 py-10 sm:py-16 border-t-2"
      style={{ borderColor: 'rgba(237,235,255,0.18)' }}
    >
      {/* Number column */}
      <div className={`col-span-3 sm:col-span-2 ${flip ? 'md:order-2' : ''}`}>
        <div
          className="leading-[0.85]"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(2.4rem, 6vw, 5rem)',
            fontWeight: 700,
            color: '#9b87f5',
          }}
        >
          {c.no}
        </div>
        <div className="text-[10px] tracking-[0.3em] uppercase mt-3" style={{ color: 'rgba(237,235,255,0.55)' }}>
          {c.year}
        </div>
      </div>

      {/* Title + body */}
      <div className={`col-span-9 sm:col-span-7 ${flip ? 'md:order-1' : ''}`}>
        <div className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: '#0F1729' }}>
          <span style={{ background: '#9b87f5', color: '#0F1729' }} className="px-2 py-1 mr-2">
            {c.tag}
          </span>
        </div>
        <h3
          className="leading-[1.0] mb-5"
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: 'clamp(1.3rem, 3vw, 2.2rem)',
            fontStyle: index % 2 ? 'normal' : 'italic',
          }}
        >
          {c.title}
        </h3>
        <p
          className="max-w-2xl text-[13.5px] sm:text-[15px] leading-[1.7]"
          style={{ color: 'rgba(237,235,255,0.78)' }}
        >
          {c.body}
        </p>
      </div>

      {/* Pull-quote stub */}
      <div className="hidden sm:block col-span-3 self-center">
        <div
          className="relative p-4 border-2"
          style={{
            borderColor: 'rgba(237,235,255,0.18)',
            background: '#1A1F2C',
            transform: `rotate(${flip ? 1.5 : -1.5}deg)`,
          }}
        >
          <div className="text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: '#9b87f5' }}>
            {c.stamp}
          </div>
          <div
            className="leading-[1.15]"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontStyle: 'italic',
              fontSize: '1.05rem',
            }}
          >
            “{c.pull}”
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Marquee = () => {
  const text = '· The Krish Archive · Issue 001 · An unfiltered field log · 2022 — Present ';
  // Two identical groups; sliding -50% (exactly one group) loops seamlessly.
  const Group = ({ ariaHidden }) => (
    <div className="flex shrink-0" aria-hidden={ariaHidden || undefined}>
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="text-sm tracking-[0.35em] uppercase mr-8"
          style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
        >
          {text}
        </span>
      ))}
    </div>
  );
  return (
    <div
      className="overflow-hidden border-b-2 py-4"
      style={{ borderColor: 'rgba(237,235,255,0.18)', background: '#9b87f5', color: '#0F1729' }}
    >
      <div className="flex w-max animate-[marquee_30s_linear_infinite]">
        <Group />
        <Group ariaHidden />
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
};

const PaperGrain = () => (
  <svg
    className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.08] mix-blend-multiply z-0"
    aria-hidden
  >
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" />
  </svg>
);


/* ------------------------------------------------------------------ */
/*  ARTICLE WITH STICKY TABLE OF CONTENTS                             */
/* ------------------------------------------------------------------ */

const articleSections = [
  {
    id: 'why-i-write',
    group: 'The Reason',
    title: 'Why I Keep A Journal Of My Journey',
    paragraphs: [
      `Most days blur into each other. The wins feel small in the moment, the failures feel permanent, and the in-between is forgotten by Friday. Writing it down is how I refuse to let the years compress into a single sentence.`,
      `This page is that refusal. A slow-burn archive of how I learned to build, break, ship, and start again — written for the version of me who will need to remember that none of it was an accident.`,
    ],
  },
  {
    id: 'the-loop',
    group: 'The Reason',
    title: 'The Loop That Made Everything Click',
    paragraphs: [
      `Curiosity, attempt, failure, lesson, repeat. That is the entire shape of progress, compressed. The trick was never the talent — it was tolerating the loop for longer than felt reasonable.`,
    ],
  },
  {
    id: 'principles',
    group: 'Principles Worth Defending',
    title: 'Build Small. Ship Often. Tell The Truth.',
    paragraphs: [
      `Small ships often. Big plans rot. Almost every meaningful thing I made started as a weekend toy that I refused to abandon on Sunday night.`,
      `The truth part is harder. It means writing the README before the demo. It means saying "I don't know" louder than the room expects. It means the work has to be the proof.`,
    ],
  },
  {
    id: 'taste',
    group: 'Principles Worth Defending',
    title: 'Taste Is The Skill Nobody Teaches',
    paragraphs: [
      `Anyone can ship. Few people sweat the kerning at 2am. Taste compounds quietly — you collect it from books, films, type specimens, bad UIs you hated, and that one website that made you stop scrolling.`,
    ],
  },
  {
    id: 'craft-vs-velocity',
    group: 'Tension Between',
    title: 'Craft vs. Velocity',
    paragraphs: [
      `There is no permanent answer. Some seasons demand speed. Others demand obsession. The mistake is doing one when the moment needs the other, and then blaming the work for not landing.`,
    ],
  },
  {
    id: 'learning-publicly',
    group: 'Tension Between',
    title: 'Learning In Public, Quietly',
    paragraphs: [
      `Build in public is a tax I pay reluctantly. The signal is real — feedback, friends, accountability — but the noise can erode the part of you that liked the work in the first place. I keep a private notebook for the things that aren't ready to be looked at.`,
    ],
  },
  {
    id: 'what-i-want',
    group: 'Where Next',
    title: 'What I Actually Want From All Of This',
    paragraphs: [
      `Not the title. Not the headcount. Not the round. I want a body of work I would defend in a quiet room with no audience. I want collaborators who edit me. I want one project, ten years from now, that still feels like mine.`,
    ],
  },
  {
    id: 'colophon',
    group: 'Colophon',
    title: 'How This Page Was Made',
    paragraphs: [
      `Built with React and Framer Motion. The table of contents on the left tracks your scroll — the active section glows. Read it like a long letter, not a list.`,
    ],
  },
];

const ArticleSection = () => {
  const [activeId, setActiveId] = useState(articleSections[0].id);
  const containerRef = useRef(null);

  useEffect(() => {
    const els = articleSections
      .map((s) => document.getElementById(`art-${s.id}`))
      .filter(Boolean);

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to top that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const id = visible[0].target.id.replace(/^art-/, '');
          setActiveId(id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(`art-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ background: '#0F1729', color: '#EDEBFF' }}
    >
      <SectionTitle
        kicker="Part One"
        title="The Long Read"
        rightTag="A field essay · 6 min"
        dark
      />

      {/* Article header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-10 sm:pb-16">
        <div
          className="border-t-2 border-b-2 py-8 sm:py-12 grid sm:grid-cols-12 gap-6 items-end"
          style={{ borderColor: 'rgba(237,235,255,0.18)' }}
        >
          <div className="sm:col-span-8">
            <div
              className="text-[10px] tracking-[0.4em] uppercase mb-4"
              style={{ color: 'rgba(155,135,245,0.85)' }}
            >
              Design Essay · By Krish
            </div>
            <h3
              className="leading-[1.0]"
              style={{
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
              }}
            >
              Notes on building a life out of <em>small, stubborn</em> projects.
            </h3>
          </div>
          <div className="sm:col-span-4 flex sm:justify-end gap-6">
            <div>
              <div className="text-[9px] tracking-[0.4em] uppercase opacity-60 mb-1">Read</div>
              <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.85rem' }}>
                6 min
              </div>
            </div>
            <div>
              <div className="text-[9px] tracking-[0.4em] uppercase opacity-60 mb-1">Filed</div>
              <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: '0.85rem' }}>
                Jun 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOC + Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-24 sm:pb-32 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Sticky TOC */}
        <aside className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1">
          <div className="lg:sticky lg:top-28">
            <div
              className="text-[9px] tracking-[0.45em] uppercase mb-5 pb-3 border-b"
              style={{
                color: 'rgba(237,235,255,0.5)',
                borderColor: 'rgba(237,235,255,0.15)',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
              }}
            >
              On This Page
            </div>
            <nav>
              <TocList active={activeId} onClick={scrollTo} />
            </nav>
          </div>
        </aside>

        {/* Body */}
        <div className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2 lg:pl-8 lg:border-l"
          style={{ borderColor: 'rgba(237,235,255,0.12)' }}
        >
          {articleSections.map((s, i) => (
            <motion.article
              key={s.id}
              id={`art-${s.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 ? 'scroll-mt-28' : 'scroll-mt-28 mt-14 sm:mt-20'}
            >
              <div
                className="text-[10px] tracking-[0.4em] uppercase mb-3"
                style={{ color: 'rgba(155,135,245,0.85)' }}
              >
                {s.group}
              </div>
              <h4
                className="leading-[1.05] mb-6"
                style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontSize: 'clamp(1.25rem, 2.6vw, 1.9rem)',
                }}
              >
                {s.title}
              </h4>
              {s.paragraphs.map((p, j) => (
                <p
                  key={j}
                  className="mb-5 last:mb-0"
                  style={{
                    fontSize: 'clamp(13.5px, 1vw, 15px)',
                    lineHeight: 1.75,
                    color: 'rgba(237,235,255,0.82)',
                  }}
                >
                  {p}
                </p>
              ))}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const TocList = ({ active, onClick }) => {
  const itemRefs = useRef({});
  const [marker, setMarker] = useState({ top: 0, height: 0, ready: false });

  // Measure the active item and glide the indicator to it.
  useLayoutEffect(() => {
    const update = () => {
      const el = itemRefs.current[active];
      if (el) setMarker({ top: el.offsetTop, height: el.offsetHeight, ready: true });
    };
    update();
    // Re-measure after editorial webfonts settle (avoids a misplaced marker).
    const t = setTimeout(update, 300);
    window.addEventListener('resize', update);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', update);
    };
  }, [active]);

  return (
    <div className="relative">
      {/* full track */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{ background: 'rgba(237,235,255,0.12)' }}
      />
      {/* gliding active indicator */}
      <motion.span
        aria-hidden
        className="absolute left-0 w-[2px] rounded-full"
        style={{ background: '#9b87f5', boxShadow: '0 0 10px rgba(155,135,245,0.7)' }}
        initial={false}
        animate={{
          top: marker.top,
          height: marker.height,
          opacity: marker.ready ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 38, mass: 0.6 }}
      />

      <ul>
        {articleSections.map((it, i) => {
          const isActive = active === it.id;
          return (
            <li key={it.id}>
              <button
                ref={(el) => (itemRefs.current[it.id] = el)}
                onClick={() => onClick(it.id)}
                className="flex items-baseline gap-3 text-left w-full pl-5 pr-2 py-2.5"
                style={{
                  color: isActive ? '#EDEBFF' : 'rgba(237,235,255,0.42)',
                  transform: isActive ? 'translateX(5px)' : 'translateX(0)',
                  transition: 'color 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <span
                  className="text-[10px] tracking-widest shrink-0 tabular-nums"
                  style={{
                    color: isActive ? '#9b87f5' : 'rgba(237,235,255,0.28)',
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    transition: 'color 0.35s ease',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: '13px', lineHeight: 1.45 }}>{it.title}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Journey;

