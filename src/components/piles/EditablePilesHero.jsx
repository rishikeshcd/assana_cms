import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';
import { Link } from 'react-router-dom';

/**
 * EditablePilesHero - CMS wrapper for PilesHero component
 */
const EditablePilesHero = ({ data, onDataChange }) => {
  const safeData = data || {
    backgroundImage: '',
    title: 'Banding of Piles or Haemorrhoids',
    description: '',
    buttonText: 'Book a Consultation',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 lg:pt-24">
      {/* Background Image */}
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

      {/* Semi-transparent Overlay with Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 lg:px-8">
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 lg:p-12 text-center">
          {/* Title - White Text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-[Raleway] mb-6 text-white">
            <EditableText
              value={safeData.title || ''}
              onChange={(value) => updateField('title', value)}
              tag="span"
              placeholder="Banding of Piles or Haemorrhoids"
            />
          </h1>

          {/* Description Paragraph - Red Text */}
          <p className="text-base md:text-lg lg:text-xl font-[Raleway] mb-8 leading-relaxed text-[#EC7979]">
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
      </div>
    </section>
  );
};

export default EditablePilesHero;

