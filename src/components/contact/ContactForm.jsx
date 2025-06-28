import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Textarea } from '../ui/textarea';

const ContactForm = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    error: false,
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        error: true,
        message: 'Please fill out all fields'
      });
      return;
    }
    
    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: false,
      error: false,
      message: 'Sending message...'
    });
    
    // Mock API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        error: false,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus({
          submitted: false,
          success: false,
          error: false,
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  // Adaptive input styling based on theme
  const inputClasses = isDarkMode 
    ? "w-full px-4 py-2 rounded-lg bg-space-dark border border-white/10 focus:border-space-accent/50 focus:outline-none focus:ring-1 focus:ring-space-accent/50 text-white"
    : "w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-space-accent/50 focus:outline-none focus:ring-1 focus:ring-space-accent/50 text-gray-800";

  const labelClasses = isDarkMode ? "block text-white/80 mb-2 text-sm" : "block text-gray-600 mb-2 text-sm";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className={labelClasses}>Your Name</label>
        <input 
          type="text" 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Krishnarajan"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className={labelClasses}>Your Email</label>
        <input 
          type="email" 
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={inputClasses}
          placeholder="xyz@gmail.com"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="message" className={labelClasses}>Message</label>
        <Textarea 
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`resize-none ${inputClasses}`}
          placeholder="Hello, I'd like to talk about..."
        />
      </div>
      
      <button 
        type="submit"
        className="w-full py-3 bg-space-accent hover:bg-space-accent/90 text-white rounded-lg flex items-center justify-center gap-2 transition-all"
      >
        <Send className="w-4 h-4" />
        Send Message
      </button>
      
      {formStatus.submitted && (
        <div className={`mt-4 p-3 rounded-lg text-center text-sm ${
          formStatus.success 
            ? isDarkMode ? 'bg-green-500/20 text-green-200' : 'bg-green-500/20 text-green-800'
            : isDarkMode ? 'bg-red-500/20 text-red-200' : 'bg-red-500/20 text-red-800'
        }`}>
          {formStatus.message}
        </div>
      )}
    </form>
  );
};

export default ContactForm;
