import React from 'react';
import EditableText from '../common/EditableText';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { COLORS } from '../../constants/config';

/**
 * EditableWhyAssana - Contains both WhyAssana and WhyDifferent sections
 * Uses the exact same structure as public WhyAssana component
 */
const EditableWhyAssana = ({ data, onDataChange }) => {
  if (!data) return null;

  const updateField = (field, value) => {
    onDataChange({ ...data, [field]: value });
  };

  return (
    <>
      {/* Why Assana Section */}
      <section className='max-w-[1600px] bg-[] m-auto overflow-hidden'>
        <div className='w-[95%] m-auto'>
          <h1 className='font-[Raleway] smallShadow lg:textShadow text-black text-center lg:text-start text-3xl sm:text-4xl lg:text-6xl mt-2 lg:mt-30'>
            <EditableText
              value={data?.mainTitle}
              onChange={(value) => updateField('mainTitle', value)}
              tag="span"
              className="block"
            />
          </h1>

          <div className='flex flex-col justify-end items-center lg:items-start bg-[]'>
            <h1 className='font-[Raleway] text-base sm:text-xl text-center lg:text-start mt-5 lg:mt-13 lg:ml-100 bg-[]'>
              <EditableText
                value={data?.subtitle}
                onChange={(value) => updateField('subtitle', value)}
                tag="span"
                className="block"
              />
            </h1>
            <h1 className='font-[Raleway] text-base sm:text-xl text-center lg:text-start w-[100%] lg:w-[70%] mt-4 lg:ml-100'>
              <EditableText
                value={data?.introductionParagraph}
                onChange={(value) => updateField('introductionParagraph', value)}
                multiline={true}
                className="block"
              />
            </h1>
          </div>
          <div className='flex justify-center lg:justify-end'>
            <div className="inline-flex items-center group mt-5 mb-5">
              <div className="text-sm sm:text-lg p-3 text-white rounded-4xl pr-0 sm:pr-3 px-8 sm:px-12 font-semibold cursor-default flex items-center transition-colors hover:opacity-90" style={{ backgroundColor: COLORS.BUTTON_BG }}>
                <EditableText
                  value={data?.buttonText || 'Book a Consultation'}
                  onChange={(value) => updateField('buttonText', value)}
                  tag="span"
                  className="inline"
                />
                <IoIosArrowDroprightCircle 
                  className="text-3xl sm:text-4xl ml-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className='max-w-[1600px] bg-[] m-auto overflow-hidden'>
        <div className='w-[95%] m-auto'>
          <h1 className='font-[Raleway] smallShadow lg:textShadow text-black text-center lg:text-end text-3xl sm:text-4xl lg:text-6xl mt-2 lg:mt-30'>
            <EditableText
              value={data?.whyDifferentMainTitle}
              onChange={(value) => updateField('whyDifferentMainTitle', value)}
              tag="span"
              className="block"
            />
          </h1>

          <div className='flex flex-col justify-end items-center lg:items-start'>
            <h1 className='font-[Raleway] text-base sm:text-xl text-center lg:text-start mt-5 lg:mt-13'>
              <EditableText
                value={data?.whyDifferentSubtitle}
                onChange={(value) => updateField('whyDifferentSubtitle', value)}
                tag="span"
                className="block"
              />
            </h1>
            <h1 className='font-[Raleway] text-base sm:text-xl text-center lg:text-start w-[100%] lg:w-[70%] mt-4'>
              <EditableText
                value={data?.whyDifferentIntroductionParagraph}
                onChange={(value) => updateField('whyDifferentIntroductionParagraph', value)}
                multiline={true}
                className="block"
              />
            </h1>
          </div>
          <div className='flex justify-center lg:justify-start'>
            <div className="inline-flex items-center group mt-5">
              <div className="text-white text-sm sm:text-lg p-3 rounded-4xl pr-0 sm:pr-3 px-8 sm:px-12 font-semibold cursor-default flex items-center transition-colors hover:opacity-90" style={{ backgroundColor: COLORS.BUTTON_BG }}>
                <EditableText
                  value={data?.button2Text || 'Book a Consultation'}
                  onChange={(value) => updateField('button2Text', value)}
                  tag="span"
                  className="inline"
                />
                <IoIosArrowDroprightCircle 
                  className="text-3xl sm:text-4xl ml-3"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditableWhyAssana;
