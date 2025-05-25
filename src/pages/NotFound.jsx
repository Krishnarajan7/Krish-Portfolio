import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Stars from '../components/Stars';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-space-darker text-white px-4">
      <Stars />
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-8">
          <img 
            src="/img/astronaut-lost.png" 
            alt="Lost astronaut" 
            className="w-64 animate-float"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/300x300/1A1F2C/FFFFFF?text=👨‍🚀";
            }}
          />
        </div>
        
        <h1 className="text-5xl font-bold mb-4 text-gradient">404</h1>
        <h2 className="text-2xl font-bold mb-6">Lost in Space</h2>
        <p className="text-white/70 mb-8">The page you're looking for seems to have drifted into a black hole.</p>
        
        <a 
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-space-accent hover:bg-space-accent/90 text-white rounded-lg transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Earth
        </a>
      </div>
    </div>
  );
};

export default NotFound;
