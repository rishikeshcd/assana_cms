import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';
import { Link } from 'react-router-dom';

/**
 * EditablePelvicFloorHero - CMS wrapper for PelvicFloorHero component
 */
const EditablePelvicFloorHero = ({ data, onDataChange }) => {
  const safeData = data || {
    backgroundImage: '',
    title: 'Pelvic Floor Problems',
    description: '',
    buttonText: 'Book Consultation',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-24" style={{ backgroundColor: '#0000000D' }}>
      <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="relative z-10">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal font-[Raleway] mb-6 text-black">
              <EditableText
                value={safeData.title || ''}
                onChange={(value) => updateField('title', value)}
                tag="span"
                placeholder="Pelvic Floor Problems"
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
                  value={safeData.buttonText || 'Book Consultation'}
                  onChange={(value) => updateField('buttonText', value)}
                  tag="span"
                  placeholder="Book Consultation"
                />
              </button>
            </Link>
          </div>

          {/* Right Side - Image */}
          <div className="relative w-full h-[400px] lg:h-[600px]">
            {safeData.backgroundImage ? (
              <img
                src={safeData.backgroundImage}
                alt="Pelvic Floor Problems"
                className="w-full h-full object-cover rounded-lg"
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

export default EditablePelvicFloorHero;

