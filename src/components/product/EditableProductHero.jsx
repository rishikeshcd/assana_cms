import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';
import { COLORS } from '../../constants/config';

/**
 * EditableProductHero - CMS wrapper for ProductHero component
 */
const EditableProductHero = ({ data, onDataChange }) => {
  const safeData = data || {
    backgroundImage: '',
    title: 'Find the Right Supplements for Your Lifestyle',
    description: 'Explore a curated range of wellness products designed to boost energy, immunity, and overall health.',
    buttonText: 'Book a Consultation',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-start pt-20 lg:pt-24">
      <div className="absolute inset-0 ">
        {safeData.backgroundImage && (
          <img src={safeData.backgroundImage} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <EditableImage
          imageUrl={safeData.backgroundImage}
          onChange={(url) => updateField('backgroundImage', url)}
          className="absolute inset-0 w-full h-full"
          isBackground={false}
        />
      </div>
      <div className="relative mx-auto z-10 p-8 lg:p-12 text-center flex flex-col items-center justify-center max-w-[70%] w-fit ">
          {/* Title - White Text */}
          <h1 className="text-4xl md:text-5xl lg:w-[90%] lg:text-6xl font-normal font-[Raleway] mb-6  p-6 text-white   backdrop-blur-2xl rounded-lg ">
            <EditableText
              value={safeData.title || ''}
              onChange={(value) => updateField('title', value)}
              tag="span"
              placeholder="Banding of Piles or Haemorrhoids"
            />
          </h1>

          {/* Description Paragraph - Red Text */}
          <p className=" md:text-lg lg:text-[30px] font-[Raleway]  mb-8 leading-relaxed text-[#E64C4C]  font-medium w-[90%] m-auto">
            <EditableText
              value={safeData.description || ''}
              onChange={(value) => updateField('description', value)}
              tag="span"
              multiline={true}
              placeholder="Enter description..."
            />
          </p>

          {/* Book Consultation Button - Static in CMS */}
          <div className="text-white py-3 px-8 rounded-3xl cursor-default font-medium text-base md:text-lg font-[Raleway] inline-block transition-colors hover:opacity-90" style={{ backgroundColor: COLORS.BUTTON_BG }}>
            <EditableText
              value={safeData.buttonText || 'Book a Consultation'}
              onChange={(value) => updateField('buttonText', value)}
              tag="span"
              placeholder="Book a Consultation"
            />
          </div>
        </div>
    </section>
  );
};

export default EditableProductHero;

