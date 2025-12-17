import React from 'react';
import EditableText from '../../common/EditableText';
import EditableImage from '../../common/EditableImage';
import { COLORS } from '../../../constants/config';

/**
 * EditableAssanaButtCheckHero - CMS wrapper for AssanaButtCheckHero component
 */
const EditableAssanaButtCheckHero = ({ data, onDataChange }) => {
  const safeData = data || {
    backgroundImage: '',
    title: 'Assana Butt Check',
    description: 'At Assana Colorectal & Gut Wellness Centre, we believe that prevention and early detection are key to maintaining optimal gut and colorectal health. That\'s why we\'ve designed the Assana Butt Check, a comprehensive master health check-up that evaluates the overall health of your gut and butt, helping you stay ahead of potential issues while improving your overall wellness.',
    buttonText: 'Book a Consultation',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-24" style={{ backgroundColor: '#0000000D' }}>
      <div className="max-w-[1600px] mx-auto px-4 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="relative z-10">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-[Raleway] mb-6 text-black">
              <EditableText
                value={safeData.title || ''}
                onChange={(value) => updateField('title', value)}
                tag="span"
                placeholder="Assana Butt Check"
              />
            </h1>

            {/* Description Paragraph */}
            <p className="text-base md:text-lg lg:text-xl font-[Raleway] mb-8 leading-loose tracking-wide text-black">
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

          {/* Right Side - Image */}
          <div className="relative w-full h-[400px] lg:h-[700px]">
            {safeData.backgroundImage ? (
              <img
                src={safeData.backgroundImage}
                alt="Assana Butt Check"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <EditableImage
              imageUrl={safeData.backgroundImage}
              onChange={(url) => updateField('backgroundImage', url)}
              className="absolute inset-0 w-full h-full"
              isBackground={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableAssanaButtCheckHero;

