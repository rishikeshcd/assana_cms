import React from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

/**
 * EditableContact - CMS wrapper for Contact component
 */
const EditableContact = ({ data, onDataChange }) => {
  const safeData = data || {
    heading: 'Ready to Feel Better Naturally?',
    description: 'Take the first step toward a healthier gut and a balanced life. Our certified wellness team is here to guide you with personalized care, natural therapies, and modern diagnostics.',
    phoneText: 'Call +91 8035735721 to book an appointment instantly through our AI voice system.',
    phoneNumber: '+91 8035735721',
    buttonText: 'Book a Consultation',
    backgroundImage: '',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className="relative py-16 md:py-20 lg:py-24 px-4 md:px-8">
      {/* Background Image */}
      {safeData.backgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-top bg-no-repeat blur-sm"
          style={{
            backgroundImage: `url(${safeData.backgroundImage})`,
          }}
        ></div>
      )}
      <EditableImage
        imageUrl={safeData.backgroundImage}
        onChange={(url) => updateField('backgroundImage', url)}
        className="absolute inset-0 w-full h-full"
        isBackground={true}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border-2 border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 lg:p-16">
            
            {/* Left Section - Information */}
            <div className="flex flex-col justify-center text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Raleway] mb-6 leading-tight">
                <EditableText
                  value={safeData.heading || ''}
                  onChange={(value) => updateField('heading', value)}
                  tag="span"
                  placeholder="Ready to Feel Better Naturally?"
                />
              </h2>
              
              <p className="text-base md:text-lg font-[Raleway] mb-6 leading-relaxed text-white/90">
                <EditableText
                  value={safeData.description || ''}
                  onChange={(value) => updateField('description', value)}
                  tag="span"
                  multiline={true}
                  placeholder="Take the first step toward a healthier gut..."
                />
              </p>
              
              <p className="text-base md:text-lg font-[Raleway] text-white/90">
                <EditableText
                  value={safeData.phoneText || ''}
                  onChange={(value) => updateField('phoneText', value)}
                  tag="span"
                  placeholder="Call +91 8035735721 to book an appointment..."
                />
              </p>
            </div>

            {/* Right Section - Contact Form (Preview only in CMS) */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8">
              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EC7979] font-[Raleway]"
                    disabled
                  />
                </div>

                {/* Phone Field */}
                <div className="relative">
                  <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="phone number"
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EC7979] font-[Raleway]"
                    disabled
                  />
                </div>

                {/* Email Field */}
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EC7979] font-[Raleway]"
                    disabled
                  />
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-3 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EC7979] font-[Raleway] resize-none"
                    disabled
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  className="w-full bg-gradient-to-b from-[#EC7979] to-purple-800 text-white py-4 px-8 rounded-lg font-semibold text-lg font-[Raleway] shadow-lg"
                  disabled
                >
                  <EditableText
                    value={safeData.buttonText || 'Book a Consultation'}
                    onChange={(value) => updateField('buttonText', value)}
                    tag="span"
                    placeholder="Book a Consultation"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableContact;

