import React from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

/**
 * EditablePatientSays - CMS version with all feedback cards in list view for easy editing
 * Uses the exact same structure as public PatientSays component but shows all cards in a list
 */
const EditablePatientSays = ({ data, onDataChange }) => {
  // Ensure data exists with defaults
  const safeData = data || { componentHeading: '', componentSubHeading: '', testimonials: [] };
  const testimonials = safeData.testimonials || [];

  const updateComponentHeading = (value) => {
    onDataChange({ ...safeData, componentHeading: value });
  };

  const updateComponentSubHeading = (value) => {
    onDataChange({ ...safeData, componentSubHeading: value });
  };

  const updateTestimonial = (index, field, value) => {
    const updated = [...testimonials];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, testimonials: updated });
  };

  const addNewTestimonial = () => {
    const newTestimonial = {
      patientName: 'Patient Name',
      patientProblem: 'Patient Problem',
      patientFeeback: 'Patient Feedback',
      patientImg: '',
    };
    onDataChange({ ...safeData, testimonials: [...testimonials, newTestimonial] });
  };

  const removeTestimonial = (index) => {
    const updated = testimonials.filter((_, i) => i !== index);
    onDataChange({ ...safeData, testimonials: updated });
  };

  return (
    <section className='bg-[#EB5466] p-5'>
      <div className='max-w-[1600px] m-auto overflow-hidden'>
        {/* Heading */}
        <h1 className="font-[Raleway] text-2xl sm:text-4xl lg:text-6xl font-semibold mt-6 text-center text-white">
          <EditableText
            value={safeData?.componentHeading || ''}
            onChange={updateComponentHeading}
            tag="span"
            className="block"
          />
        </h1>

        {/* Subheading */}
        <p className="font-[Raleway] text-base sm:text-xl lg:font-semibold mt-4 text-white text-center">
          <EditableText
            value={safeData?.componentSubHeading || ''}
            onChange={updateComponentSubHeading}
            tag="span"
            className="block"
          />
        </p>

        {/* All Testimonials in List View - No Slider */}
        <div className="w-[100%] sm:w-[85%] m-auto mt-8 p-4 space-y-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border-2 border-blue-300 border-[#dfdddd] mb-10 rounded-xl w-full max-w-4xl m-auto sm:grid grid-cols-3 bg-white/10 backdrop-blur-sm">
              {/* Image */}
              <div className="flex justify-center items-center p-2 md:p-4">
                <div className='h-60 w-60 rounded-xl relative'>
                  {/* Show image or placeholder */}
                  {testimonial?.patientImg ? (
                    <div 
                      className="h-full w-full rounded-xl bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${testimonial.patientImg})` }}
                    />
                  ) : (
                    <div className="h-full w-full rounded-xl bg-gray-200 flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {/* EditableImage overlay - Always visible like background images */}
                  <EditableImage
                    imageUrl={testimonial?.patientImg}
                    onChange={(url) => updateTestimonial(index, 'patientImg', url)}
                    className="absolute inset-0 h-full w-full rounded-xl"
                    alt={`Patient ${index + 1}`}
                    isBackground={true}
                  />
                </div>
              </div>

              {/* Text */}
              <div className="text-white col-span-2 pl-2 p-6 sm:p-8">
                <div className="mb-4">
                  <label className="text-white text-xs font-semibold mb-2 block">
                    Patient Feedback:
                  </label>
                  <EditableText
                    value={testimonial?.patientFeeback || ''}
                    onChange={(value) => updateTestimonial(index, 'patientFeeback', value)}
                    multiline={true}
                    className="text-[13px] md:text-[15px] lg:text-[16px] text-justify font-[Raleway] bg-white/20 p-2 rounded w-full min-h-[80px]"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-white text-xs font-semibold mb-2 block">
                    Patient Name:
                  </label>
                  <EditableText
                    value={testimonial?.patientName || ''}
                    onChange={(value) => updateTestimonial(index, 'patientName', value)}
                    className="text-[13px] md:text-[15px] lg:text-[16px] font-[Raleway] font-bold bg-white/20 p-2 rounded w-full"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-white text-xs font-semibold mb-2 block">
                    Patient Problem:
                  </label>
                  <EditableText
                    value={testimonial?.patientProblem || ''}
                    onChange={(value) => updateTestimonial(index, 'patientProblem', value)}
                    className="text-xs sm:text-sm font-[Raleway] bg-white/20 p-2 rounded w-full"
                  />
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeTestimonial(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-red-600 text-sm"
                >
                  Remove Testimonial
                </button>
              </div>
            </div>
          ))}

          {/* Add New Testimonial Button */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={addNewTestimonial}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
            >
              + Add New Testimonial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditablePatientSays;

