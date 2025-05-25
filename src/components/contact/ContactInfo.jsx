import React from 'react';
import { Mail, MapPin, Phone, Github, Linkedin } from 'lucide-react';

const ContactInfo = ({ isDarkMode }) => {
  const contactItems = [
    {
      icon: <Mail className="h-5 w-5 text-space-accent" />,
      label: "Email",
      value: "krishh.v777@gmail.com",
      link: "mailto:krishh.v777@gmail.com"
    },
    {
      icon: <Phone className="h-5 w-5 text-space-accent" />,
      label: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="h-5 w-5 text-space-accent" />,
      label: "Location",
      value: "New York, NY",
      link: null
    },
    {
      icon: <Github className="h-5 w-5 text-space-accent" />,
      label: "GitHub",
      value: "github.com/Krishnarajan7",
      link: "https://github.com/Krishnarajan7"
    },
    {
      icon: <Linkedin className="h-5 w-5 text-space-accent" />,
      label: "LinkedIn",
      value: "linkedin.com/in/krishnarajan007",
      link: "https://www.linkedin.com/in/krishnarajan007"
    }
  ];

  return (
    <div className={`cosmic-card p-8 mb-6 ${!isDarkMode && 'shadow-md'}`}>
      <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Contact Information</h3>
      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="mr-3 h-10 w-10 rounded-full bg-space-accent/20 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <p className={`text-sm ${isDarkMode ? 'text-white/60' : 'text-gray-500'}`}>{item.label}</p>
              {item.link ? (
                <a 
                  href={item.link} 
                  className={`hover:text-space-accent transition-colors ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
                  target={item.link.startsWith('http') ? "_blank" : undefined}
                  rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                >
                  {item.value}
                </a>
              ) : (
                <p className={isDarkMode ? 'text-white' : 'text-gray-800'}>{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;
