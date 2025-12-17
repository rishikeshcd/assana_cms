import React from 'react';
import EditableText from '../common/EditableText';
import { COLORS } from '../../constants/config';

/**
 * EditableAboutWhyChoose - CMS wrapper for AboutWhyChoose component
 */
const EditableAboutWhyChoose = ({ data, onDataChange }) => {
  const safeData = data || {
    heading: '',
    subtitle: '',
    buttonText: '',
    description: '',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className='max-w-[1600px] m-auto overflow-hidden py-12 lg:py-20'>
      <div className='w-[95%] m-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
          {/* Left Column */}
          <div className='flex flex-col'>
            <h1 className='font-[Raleway] text-black text-3xl sm:text-4xl lg:text-5xl font-bold mb-4'>
              <EditableText
                value={safeData?.heading || ''}
                onChange={(value) => updateField('heading', value)}
                tag="span"
                className="block"
              />
            </h1>
            <h2 className='font-[Raleway] text-black text-lg sm:text-xl lg:text-2xl mb-6'>
              <EditableText
                value={safeData?.subtitle || ''}
                onChange={(value) => updateField('subtitle', value)}
                tag="span"
                className="block"
              />
            </h2>
            <div className="text-white text-sm sm:text-base lg:text-lg px-6 py-3 rounded-full cursor-default font-semibold inline-flex items-center gap-2 transition-colors hover:opacity-90" style={{ backgroundColor: COLORS.BUTTON_BG }}>
              <EditableText
                value={safeData?.buttonText || ''}
                onChange={(value) => updateField('buttonText', value)}
                tag="span"
                className="inline"
              />
              <span>→</span>
            </div>
          </div>

          {/* Right Column */}
          <div className='flex flex-col'>
            <p className='font-[Raleway] text-black text-base sm:text-lg leading-relaxed'>
              <EditableText
                value={safeData?.description || ''}
                onChange={(value) => updateField('description', value)}
                multiline={true}
                className="block"
              />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableAboutWhyChoose;

