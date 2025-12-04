import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';
import { Link } from 'react-router-dom';

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
    <section className="relative min-h-screen flex items-center justify-center pt-20 lg:pt-24 overflow-hidden">
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

      <div className="relative mx-auto z-10 p-8 lg:p-12 text-center flex flex-col items-center justify-center max-w-[70%] w-fit ">
          {/* Title - White Text */}
          <h1 className="text-4xl md:text-5xl lg:w-[90%] lg:text-[70px] leading-normal tracking-wide  font-normal font-[Raleway] mb-6  p-6 text-white  bg-[#e95e5e1a] backdrop-blur-2xl rounded-2xl ">
            <EditableText
              value={safeData.title || ''}
              onChange={(value) => updateField('title', value)}
              tag="span"
              placeholder="Find the Right Supplements for Your Lifestyle"
            />
          </h1>

          {/* Description Paragraph - White Text */}
          <p className=" md:text-lg lg:text-[30px] font-[Raleway]  mb-8 leading-relaxed text-white  font-medium w-[90%] m-auto">
            <EditableText
              value={safeData.description || ''}
              onChange={(value) => updateField('description', value)}
              tag="span"
              multiline={true}
              placeholder="Explore a curated range of wellness products designed to boost energy, immunity, and overall health."
            />
          </p>

          {/* Book Consultation Button */}
          <Link to="/contact">
            <button className="bg-[#E64C4C1A] backdrop-blur-sm text-white py-3 px-8 rounded-3xl cursor-pointer hover:bg-[#E64C4C1A] transition-colors font-medium text-base md:text-lg font-[Raleway]">
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

export default EditableProductHero;

