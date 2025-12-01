import React from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

/**
 * EditableHowAssanaTreats - CMS wrapper for HowAssanaTreats component
 */
const EditableHowAssanaTreats = ({ data, onDataChange }) => {
  // Ensure we always have exactly 4 treatments
  const ensureFourTreatments = (treatments) => {
    const defaultTreatments = [
      { title: 'Ayurvedic Therapies', image: '', imageAlt: 'Ayurvedic Therapies' },
      { title: 'Lifestyle & Diet Coaching', image: '', imageAlt: 'Lifestyle & Diet Coaching' },
      { title: 'Colon Hydrotherapy', image: '', imageAlt: 'Colon Hydrotherapy' },
      { title: 'Pelvic Floor Strengthening', image: '', imageAlt: 'Pelvic Floor Strengthening' },
    ];
    
    if (!treatments || treatments.length === 0) {
      return defaultTreatments;
    }
    
    // Take only first 4 treatments
    const limited = treatments.slice(0, 4);
    
    // Fill up to 4 if less than 4
    while (limited.length < 4) {
      limited.push(defaultTreatments[limited.length] || { title: 'New Treatment', image: '', imageAlt: '' });
    }
    
    return limited;
  };

  const safeData = data || {
    title: 'How Assana Treats It',
    treatments: [
      { title: 'Ayurvedic Therapies', image: '', imageAlt: 'Ayurvedic Therapies' },
      { title: 'Lifestyle & Diet Coaching', image: '', imageAlt: 'Lifestyle & Diet Coaching' },
      { title: 'Colon Hydrotherapy', image: '', imageAlt: 'Colon Hydrotherapy' },
      { title: 'Pelvic Floor Strengthening', image: '', imageAlt: 'Pelvic Floor Strengthening' },
    ],
  };

  // Ensure exactly 4 treatments
  const treatments = ensureFourTreatments(safeData.treatments);

  const updateTitle = (value) => {
    onDataChange({ ...safeData, title: value });
  };

  const updateTreatment = (index, field, value) => {
    const updated = [...treatments];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, treatments: updated });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-[#F5F5F0] relative overflow-hidden border-2 border-blue-200 rounded-lg">
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Raleway] text-center mb-12 md:mb-16 text-black">
          <EditableText
            value={safeData.title || 'How Assana Treats It'}
            onChange={updateTitle}
            tag="span"
            placeholder="How Assana Treats It"
          />
        </h2>

        {/* Treatment Panels - Simple grid layout for easy editing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Image Panel */}
              <div className="w-full relative">
                {treatment.image ? (
                  <img
                    src={treatment.image}
                    alt={treatment.imageAlt || treatment.title}
                    className="w-full h-40 md:h-60 object-cover rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="w-full h-40 md:h-60 bg-gray-200 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                
                {/* Editable Image Overlay */}
                <EditableImage
                  imageUrl={treatment.image}
                  onChange={(url) => updateTreatment(index, 'image', url)}
                  className="absolute inset-0 w-full h-full rounded-xl"
                  isBackground={true}
                />
              </div>

              {/* Label below image */}
              <div className="mt-4">
                <h3 className="text-lg md:text-xl font-semibold font-[Raleway] text-center text-black">
                  <EditableText
                    value={treatment.title || ''}
                    onChange={(value) => updateTreatment(index, 'title', value)}
                    tag="span"
                    placeholder="Treatment Title"
                  />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditableHowAssanaTreats;

