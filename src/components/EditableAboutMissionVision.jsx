import React from 'react';
import EditableText from './EditableText';

/**
 * EditableAboutMissionVision - CMS wrapper for AboutMissionVision component
 */
const EditableAboutMissionVision = ({ data, onDataChange }) => {
  const safeData = data || {
    missionHeading: '',
    missionText: '',
    visionHeading: '',
    visionText: '',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className='max-w-[1600px] m-auto overflow-hidden py-12 lg:py-20 bg-white'>
      <div className='w-[95%] m-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8'>
          {/* Mission Box */}
          <div className='bg-[#FFF5F5] border border-[#FFE5E5] rounded-xl p-6 lg:p-8'>
            <h2 className='font-[Raleway] text-black text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'>
              <EditableText
                value={safeData?.missionHeading || ''}
                onChange={(value) => updateField('missionHeading', value)}
                tag="span"
                className="block"
              />
            </h2>
            <p className='font-[Raleway] text-black text-base sm:text-lg leading-relaxed'>
              <EditableText
                value={safeData?.missionText || ''}
                onChange={(value) => updateField('missionText', value)}
                multiline={true}
                className="block"
              />
            </p>
          </div>

          {/* Vision Box */}
          <div className='bg-[#FFF5F5] border border-[#FFE5E5] rounded-xl p-6 lg:p-8'>
            <h2 className='font-[Raleway] text-black text-2xl sm:text-3xl lg:text-4xl font-bold mb-4'>
              <EditableText
                value={safeData?.visionHeading || ''}
                onChange={(value) => updateField('visionHeading', value)}
                tag="span"
                className="block"
              />
            </h2>
            <p className='font-[Raleway] text-black text-base sm:text-lg leading-relaxed'>
              <EditableText
                value={safeData?.visionText || ''}
                onChange={(value) => updateField('visionText', value)}
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

export default EditableAboutMissionVision;

