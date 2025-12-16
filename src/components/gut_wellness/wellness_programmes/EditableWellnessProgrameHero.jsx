import React from 'react'
import { COLORS } from '../../../constants/config';
import EditableImage from '../../common/EditableImage';
import EditableText from '../../common/EditableText';


const EditableWellnessProgrameHero = ({ data , onDataChange}) => {
        const safeData = data || {
            backroundImage : '',
            title : 'wellness program',
            description: '',
            buttonText:'Book a Consultation'

        }
        const updateField = (field,value) =>{
            onDataChange({...safeData,[field]:value});
        };
  return (
   <section className='relative min-h-screen flex items-center pt-20 lg:pt-24'>
    <div className='absolute inset-0 w-full '>
        {safeData.backgroundImage ? (
            <img 
            src={safeData.backgroundImage}
            alt="Background"
            className="w-full h-full object-cover"
            />
        ):(
            <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
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
    <div className='relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8 w-full'>
        <div className='w-full lg:w-[60%] my-8 lg:my-0'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-normal font-[Raleway] mb-6 text-[#EC979]'>
                <EditableText
                value = {safeData.title || ""}
                onChange={(value) => updateField('title',value)}
                tag="span"
                placeholder='wellness Program'
                
                
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
          <div 
            style={{ backgroundColor: COLORS.BUTTON_BG }}
            className="text-white py-3 px-8 rounded-3xl cursor-default font-medium text-base md:text-lg font-[Raleway] inline-block"
          >
            <EditableText
              value={safeData.buttonText || 'Book a Consultation'}
              onChange={(value) => updateField('buttonText', value)}
              tag="span"
              placeholder="Book a Consultation"
            />
          </div>
        </div>
    </div>
   </section>
  )
}

export default EditableWellnessProgrameHero