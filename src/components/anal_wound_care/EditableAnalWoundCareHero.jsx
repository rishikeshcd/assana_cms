import React from 'react';
import { Link } from 'react-router-dom';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';

/**
 * EditableAnalWoundCareHero - CMS wrapper for AnalWoundCareHero component
 */
const EditableAnalWoundCareHero = ({ data, onDataChange }) => {
  const safeData = data || {
    backgroundImage: '',
    title: 'After Anal Surgery Wound Care',
    description: '',
    buttonText: 'Book a Consultation',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 lg:pt-24 border-2 border-blue-200 rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        {safeData.backgroundImage && (
          <img
            src={safeData.backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <EditableImage
          imageUrl={safeData.backgroundImage}
          onChange={(url) => updateField('backgroundImage', url)}
          className="absolute inset-0 w-full h-full"
          isBackground={true}
        />
      </div>

      {/* Semi-transparent Overlay with Content */}
      <div className="relative mx-auto z-10 p-8 lg:p-12 text-center flex flex-col items-center justify-center max-w-[70%] w-fit">
        {/* Title - White Text */}
        <h1 className="text-4xl md:text-5xl lg:w-[90%] lg:text-6xl font-normal font-[Raleway] mb-6 p-6 text-white bg-gray-400/50 backdrop-blur-sm rounded-lg">
          <EditableText
            value={safeData.title || 'After Anal Surgery Wound Care'}
            onChange={(value) => updateField('title', value)}
            tag="span"
            className="block"
          />
        </h1>

        {/* Description Paragraph - Red Text */}
        <p className="md:text-lg lg:text-[30px] font-[Raleway] mb-8 leading-relaxed text-[#E64C4C] font-medium w-[90%] m-auto">
          <EditableText
            value={safeData.description || ''}
            onChange={(value) => updateField('description', value)}
            multiline={true}
            className="block"
          />
        </p>

        {/* Book Consultation Button */}
        <Link to="/contact">
          <button className="bg-[#E64C4C] text-white py-3 px-8 rounded-3xl cursor-pointer hover:bg-[#d86565] transition-colors font-medium text-base md:text-lg font-[Raleway]">
            <EditableText
              value={safeData.buttonText || 'Book a Consultation'}
              onChange={(value) => updateField('buttonText', value)}
              tag="span"
              className="inline"
            />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default EditableAnalWoundCareHero;

