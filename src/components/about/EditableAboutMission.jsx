import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDroprightCircle } from "react-icons/io";
import EditableText from '../common/EditableText';

/**
 * EditableAboutMission - CMS wrapper for AboutMission component with editing capabilities
 * Uses the exact same structure as public AboutMission component
 */
const EditableAboutMission = ({ data, onDataChange }) => {
  // Ensure data exists with defaults
  const safeData = data || {
    whyAssanaHeading: '',
    whyAssanaSubHeading: '',
    whyAssanaPara: '',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  return (
    <section className='max-w-[1600px] bg-[] m-auto overflow-hidden'>
      <div className='w-[95%] m-auto'>
        <h1 className='font-[Raleway] smallShadow lg:textShadow text-black text-center lg:text-start text-3xl sm:text-4xl lg:text-6xl font-semibold mt-2 lg:mt-30'>
          <EditableText
            value={safeData?.whyAssanaHeading || ''}
            onChange={(value) => updateField('whyAssanaHeading', value)}
            tag="span"
            className="block"
          />
        </h1>

        <div className='flex flex-col justify-end items-center lg:items-end'>
          <h1 className='font-[Raleway] font-bold text-base sm:text-xl text-center lg:text-end mt-10 sm:mt-13'>
            <EditableText
              value={safeData?.whyAssanaSubHeading || ''}
              onChange={(value) => updateField('whyAssanaSubHeading', value)}
              tag="span"
              className="block"
            />
          </h1>
          <h1 className='font-[Raleway] text-base sm:text-xl text-center lg:text-end w-[100%] lg:w-[70%] mt-4'>
            <EditableText
              value={safeData?.whyAssanaPara || ''}
              onChange={(value) => updateField('whyAssanaPara', value)}
              multiline={true}
              className="block"
            />
          </h1>
        </div>
        <div className='flex justify-center lg:justify-end'>
          <div className="inline-flex items-center group mt-5">
            <Link 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              to={'/bookNow'}
            >
              <button className="bg-[#EC7979] text-sm sm:text-lg p-3 rounded-4xl pr-0 sm:pr-3 px-8 sm:px-12 group-hover:pr-8 font-semibold group-hover:text-white transition-all duration-300 ease-in-out group-hover:bg-[#F05A5A] flex items-center">
                Book a discreet Consultation
                <IoIosArrowDroprightCircle 
                  className="opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out text-3xl sm:text-4xl ml-3"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableAboutMission;

