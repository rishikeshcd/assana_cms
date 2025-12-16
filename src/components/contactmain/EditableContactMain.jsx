import React from 'react'
import EditableImage from '../common/EditableImage';
import EditableText from '../common/EditableText';

const EditableContactMain  = ({ data, onDataChange }) => {
    const safeData = data || {
      heading: '',
      text1: '',
      text2: '',
      backgroundImage: '',
    };

    const updateField = (field, value) => {
        onDataChange({
          ...safeData,
          [field]: value,
        }); 
      };
  

  return (
    <div className='relative py-10 mx-auto pt-20 md:pt-28'>
          {safeData.backgroundImage && (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-top bg-no-repeat blur-sm"
          style={{
            backgroundImage: `url(${safeData.backgroundImage})`,
          }}
        ></div>
      )}
       <EditableImage
        imageUrl={safeData.backgroundImage}
        onChange={(url) => updateField('backgroundImage', url)}
        className="absolute inset-0 w-full h-full"
        isBackground={true}
      />
    
    <div className='absolute inset-0 z-0 bg-black/70'></div>
    <div className=' relative z-10 max-w-[1600px] mx-auto  p-6 md:p-8 rounded-lg '>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
        <div clasname='p-6 md:p-8 '>
          <form action="" className='flex flex-col gap-4 bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 text-white'>
            <div className='mb-4 flex flex-col gap-2'>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" 
             
             
              name="name" placeholder='Name' className='w-full p-2 border border-gray-300 rounded-md' />
            </div>
            <div className='mb-4 flex flex-col gap-2'>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email"
              placeholder='Email' className='w-full p-2 border border-gray-300 rounded-md' />
            </div>
            <div className='mb-4 flex flex-col gap-2'>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" 
            
              placeholder='Phone' className='w-full p-2 border border-gray-300 rounded-md' />
            </div>
            <div className='mb-4 flex flex-col gap-2'>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" 
             placeholder='Message' className='w-full p-2 border border-gray-300 rounded-md' />
            </div>
            <button type='submit' className='bg-[#E64C4C] text-white p-2 px-8 rounded-md w-fit mx-auto'>Submit</button>
          </form>
        </div>
        <div className="p-6 md:p-8 text-white space-y-4">
          
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-[Raleway] leading-tight'>
            <EditableText 
            value = {safeData.heading || ''}
            onChange={(value) => updateField('heading', value)}
                tag="span"
                placeholder="Ready to Feel Better Naturally?"
            />
          </h2>
          <p className='text-base md:text-lg font-[Raleway] text-white/90'> <EditableText
                  value={safeData.text1 || ''}
                  onChange={(value) => updateField('text1', value)}
                  tag="span"
                  multiline={true}
                  placeholder="Take the first step toward a healthier gut..."
                />
                </p>
                <p>
                <EditableText
                  value={safeData.text2 || ''}
                  onChange={(value) => updateField('text2', value)}
                  tag="span"
                  multiline={true}
                  placeholder="Take the first step toward a healthier gut..."
                />
                </p>
         

        </div>
      </div>
    </div>
  </div>
  )
}

export default EditableContactMain  