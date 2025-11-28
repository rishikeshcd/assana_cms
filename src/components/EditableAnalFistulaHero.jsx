import React from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';
import { Link } from 'react-router-dom';

/**
 * EditableAnalFistulaHero - CMS wrapper for AnalFistulaHero component
 */
const EditableAnalFistulaHero = ({ data, onDataChange }) => {
  const safeData = data || {
    backgroundImage: '',
    title: 'Anal Fistula',
    description: '',
    buttonText: 'Book a Consultation',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-start pt-20 lg:pt-24">
      {/* Background Image - Editable */}
      <div className="absolute inset-0 w-full h-full">
        {safeData.backgroundImage ? (
          <img
            src={safeData.backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No background image</span>
          </div>
        )}
        <EditableImage
          imageUrl={safeData.backgroundImage}
          onChange={(url) => updateField('backgroundImage', url)}
          className="absolute inset-0 w-full h-full"
          isBackground={true}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 w-full lg:w-[50%] ml-8 lg:ml-20 xl:ml-30 my-8 lg:my-0 px-4 lg:px-0">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-[Raleway] mb-6 text-black">
          <EditableText
            value={safeData.title || ''}
            onChange={(value) => updateField('title', value)}
            tag="span"
            placeholder="Anal Fistula"
          />
        </h1>

        {/* Description Paragraph */}
        <p className="text-base md:text-lg lg:text-xl font-[Raleway] mb-8 leading-relaxed text-black">
          <EditableText
            value={safeData.description || ''}
            onChange={(value) => updateField('description', value)}
            tag="span"
            multiline={true}
            placeholder="Enter description..."
          />
        </p>

        {/* Book Consultation Button */}
        <Link to="/contact">
          <button className="bg-[#EC7979] text-white py-3 px-8 rounded-3xl cursor-pointer hover:bg-[#d86565] transition-colors font-medium text-base md:text-lg font-[Raleway]">
            <EditableText
              value={safeData.buttonText || 'Book a Consultation'}
              onChange={(value) => updateField('buttonText', value)}
              tag="span"
              placeholder="Book a Consultation"
            />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default EditableAnalFistulaHero;

