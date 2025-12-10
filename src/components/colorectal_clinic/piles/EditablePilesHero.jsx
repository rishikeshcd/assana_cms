import React from 'react';
import EditableText from '../../common/EditableText';
import EditableImage from '../../common/EditableImage';

/**
 * EditablePilesHero - CMS wrapper for PilesHero component
 */
const EditablePilesHero = ({ data, onDataChange }) => {
  const safeData = data || {
    backgroundImage: '',
    title: 'Piles or Haemorrhoids',
    description: '',
    buttonText: 'Book a Consultation',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-start pt-20 lg:pt-24">
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

      {/* Content Overlay */}
      <div className="relative z-10 w-full lg:w-[50%] ml-8 lg:ml-20 xl:ml-30 my-8 lg:my-0 px-4 lg:px-0">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-[Raleway] mb-6 text-black">
          <EditableText
            value={safeData.title || 'Piles or Haemorrhoids'}
            onChange={(value) => updateField('title', value)}
            tag="span"
            className="block"
          />
        </h1>

        {/* Description Paragraph */}
        <p className="text-base md:text-lg lg:text-xl font-[Raleway] mb-8 leading-relaxed text-black">
          <EditableText
            value={safeData.description || ''}
            onChange={(value) => updateField('description', value)}
            multiline={true}
            className="block"
          />
        </p>

        {/* Book Consultation Button - Static in CMS */}
        <div className="bg-[#EC7979] text-white py-3 px-8 rounded-3xl cursor-default font-medium text-base md:text-lg font-[Raleway] inline-block">
          <EditableText
            value={safeData.buttonText || 'Book a Consultation'}
            onChange={(value) => updateField('buttonText', value)}
            tag="span"
            className="inline"
          />
        </div>
      </div>
    </section>
  );
};

export default EditablePilesHero;

