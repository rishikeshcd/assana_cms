import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';

/**
 * EditableAboutHero - CMS wrapper for AboutHero component with editing capabilities
 * Uses the exact same structure as public AboutHero component
 */
const EditableAboutHero = ({ data, onDataChange }) => {
  // Ensure data exists with defaults
  const safeData = data || {
    aboutBanner: '',
    bannerHeading: '',
    bannerSubHeading: '',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className='relative w-full h-[70vh]'>
      {/* Background Image Container - Editable */}
      <div 
        className="w-full h-full relative overflow-hidden" 
        style={{ 
          backgroundImage: safeData?.aboutBanner ? `url(${safeData.aboutBanner})` : 'none',
          backgroundRepeat: "no-repeat", 
          backgroundSize: "cover", 
          backgroundPosition: "center"
        }}
      >
        {/* EditableImage overlay for background */}
        <EditableImage
          imageUrl={safeData?.aboutBanner}
          onChange={(url) => updateField('aboutBanner', url)}
          className="absolute inset-0 w-full h-full"
          isBackground={true}
        />

          {/* Overlay */}
          <div className='absolute inset-0 flex flex-col justify-center items-center'>
            <div 
              className='rounded-2xl px-6 py-8 sm:px-10 sm:py-12 md:px-16 md:py-16 lg:px-20 lg:py-20 xl:px-24 xl:py-24 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[60%] max-w-5xl text-center relative z-10 backdrop-blur-md border border-white/30 shadow-2xl'
              style={{
                background: 'linear-gradient(to right, rgba(173, 216, 230, 0.3), rgba(255, 182, 193, 0.3))'
              }}
            >
              <h1 className='font-bold font-[Raleway] font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white mb-4 sm:mb-5 md:mb-6'>
                <EditableText
                  value={safeData?.bannerHeading || ''}
                  onChange={(value) => updateField('bannerHeading', value)}
                  tag="span"
                  className="block"
                />
              </h1>
              <p className='font-[Raleway] font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-white'>
                <EditableText
                  value={safeData?.bannerSubHeading || ''}
                  onChange={(value) => updateField('bannerSubHeading', value)}
                  tag="span"
                  className="block"
                />
              </p>
            </div>
          </div>
      </div>
    </section>
  );
};

export default EditableAboutHero;

