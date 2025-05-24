import React from 'react';
import SectionHeader from './common/SectionHeader';
import ContactForm from './contact/ContactForm';
import ContactInfo from './contact/ContactInfo';
import CollaborationCard from './contact/CollaborationCard';
import { Star } from 'lucide-react';

const Contact = ({ isDarkMode }) => {
  return (
    <section id="contact" className={`py-20 ${isDarkMode ? 'bg-space-darker/30' : 'bg-gray-50'} relative`}>
      {/* Additional decorative stars */}
      <div className="absolute top-10 left-10 hidden md:block">
        <Star className="h-4 w-4 text-space-accent/50 animate-twinkle-slow" fill="currentColor" />
      </div>
      <div className="absolute bottom-10 right-10 hidden md:block">
        <Star className="h-5 w-5 text-space-accent/60 animate-twinkle" fill="currentColor" />
      </div>
      <div className="absolute top-1/4 right-1/4 hidden md:block">
        <Star className="h-3 w-3 text-space-accent/40 animate-twinkle-fast" fill="currentColor" />
      </div>
      
      <div className="space-container">
        <SectionHeader 
          title="Let's Connect" 
          subtitle="Have a project in mind or just want to say hi? I'd love to hear from you!" 
        />
        
        <div className="grid md:grid-cols-2 gap-8 max-w-full">
          <div className={`cosmic-card p-6 sm:p-8 ${!isDarkMode && 'shadow-md'} transform hover:scale-[1.01] transition-all duration-300 relative overflow-hidden w-full`}>
            {/* Star in the contact form */}
            <div className="absolute -top-2 -right-2">
              <Star className="h-4 w-4 text-space-accent animate-twinkle" fill="currentColor" />
            </div>
            
            <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Send Me a Message</h3>
            <ContactForm isDarkMode={isDarkMode} />
          </div>
          
          <div className="flex flex-col justify-between">
            <ContactInfo isDarkMode={isDarkMode} />
            <CollaborationCard isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
