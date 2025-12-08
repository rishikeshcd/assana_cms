import React from 'react';
import { BsStars } from "react-icons/bs";
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';

/**
 * EditableTryDemo - CMS version with editing capabilities
 * Uses the exact same structure as public TryDemo component
 */
const EditableTryDemo = ({ data, onDataChange }) => {
  // Use background image from CMS data only
  const backgroundImage = data?.backgroundImage || '';

  const updateField = (field, value) => {
    onDataChange({ ...data, [field]: value });
  };

  const toggleChatBot = () => {
    // Placeholder for CMS - could open a modal or do nothing
    console.log('Chat bot toggle in CMS');
  };

  return (
    <section className='w-full py-20 px-4 relative overflow-hidden'>
      {/* Blurred Background - Editable */}
      <div className='absolute inset-0'>
        {backgroundImage && (
          <div 
            className='absolute inset-0 bg-cover bg-center bg-no-repeat scale-110'
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          >
          </div>
        )}
        {/* Edit overlay for background image */}
        <EditableImage
          imageUrl={backgroundImage}
          onChange={(url) => updateField('backgroundImage', url)}
          className="absolute inset-0 w-full h-full"
          isBackground={true}
        />
      </div>

      {/* Dark Overlay */}
      <div className='absolute inset-0 bg-black/40 z-0'></div>

      {/* Content Card */}
      <div className='relative z-10 max-w-4xl mx-auto'>
        <div className='backdrop-blur-[30px] rounded-2xl p-8 md:p-12 shadow-4xl border-1 border-[#6d6c6c]'>
          {/* Title */}
          <h1 className="font-[Raleway] text-white text-3xl sm:text-4xl md:text-5xl text-center mb-6">
            <EditableText
              value={data?.Heading || "Not sure what you're feeling?"}
              onChange={(value) => updateField('Heading', value)}
              tag="span"
              className="block"
            />
          </h1>

          {/* Paragraph with highlighted text */}
          <p className='text-white text-base sm:text-lg font-[Raleway] text-center mb-8 leading-relaxed'>
            <EditableText
              value={data?.subHeading || "Let our AI-powered symptom checker help identify potential gut health issues and guide you to the right care."}
              onChange={(value) => updateField('subHeading', value)}
              multiline={true}
              className="block"
            />
            <span className="text-xs text-gray-400 block mt-2">
              Note: "AI-powered" text will be automatically highlighted in red on the public site
            </span>
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <button 
              onClick={toggleChatBot} 
              className="bg-[#EC7979] text-white text-sm sm:text-base md:text-lg p-3 sm:p-4 rounded-full px-6 sm:px-8 font-semibold hover:bg-[#d86565] transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <BsStars className='w-5 h-5' />
              <EditableText
                value={data?.button1Text || 'chat with our AI assistant'}
                onChange={(value) => updateField('button1Text', value)}
                tag="span"
                className="inline"
              />
            </button>

            <div className="bg-[#EC7979] text-white text-sm sm:text-base md:text-lg p-3 sm:p-4 rounded-full px-6 sm:px-8 font-semibold cursor-default w-full sm:w-auto inline-block">
              <EditableText
                value={data?.button2Text || 'Get Started'}
                onChange={(value) => updateField('button2Text', value)}
                tag="span"
                className="inline"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableTryDemo;

