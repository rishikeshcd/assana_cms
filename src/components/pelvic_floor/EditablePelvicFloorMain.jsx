import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';

/**
 * EditablePelvicFloorMain - CMS wrapper for PelvicFloorMain component
 */
const EditablePelvicFloorMain = ({ data, onDataChange }) => {
  const safeData = data || {
    sections: [],
  };

  const sections = safeData.sections || [];

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, sections: updated });
  };

  const updateSectionSymptom = (sectionIndex, symptomIndex, value) => {
    const updated = [...sections];
    const symptoms = [...(updated[sectionIndex].symptoms || [])];
    symptoms[symptomIndex] = value;
    updated[sectionIndex] = { ...updated[sectionIndex], symptoms };
    onDataChange({ ...safeData, sections: updated });
  };

  const addSectionSymptom = (sectionIndex) => {
    const updated = [...sections];
    const symptoms = [...(updated[sectionIndex].symptoms || [])];
    symptoms.push('');
    updated[sectionIndex] = { ...updated[sectionIndex], symptoms };
    onDataChange({ ...safeData, sections: updated });
  };

  const removeSectionSymptom = (sectionIndex, symptomIndex) => {
    const updated = [...sections];
    const symptoms = updated[sectionIndex].symptoms || [];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      symptoms: symptoms.filter((_, i) => i !== symptomIndex),
    };
    onDataChange({ ...safeData, sections: updated });
  };

  const addNewSection = () => {
    const newSection = {
      title: '',
      image: '',
      imageAlt: '',
      whatIsItHeading: 'What is it?',
      whatIsIt: '',
      howCanHelpHeading: 'How Azura Can Help',
      howCanHelp: '',
      symptomsHeading: 'Symptoms',
      symptoms: [],
    };
    onDataChange({ ...safeData, sections: [...sections, newSection] });
  };

  const removeSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    onDataChange({ ...safeData, sections: updated });
  };

  return (
    <div className="bg-white py-12 md:py-16 lg:p-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 space-y-8 md:space-y-12">
        {sections.map((section, index) => {
          const isImageLeft = index % 2 === 0;
          const gridCols = isImageLeft ? 'lg:grid-cols-[35%_65%]' : 'lg:grid-cols-[65%_35%]';

          return (
            <div
              key={index}
              className="bg-[#FEF6F6] rounded-2xl shadow-lg overflow-hidden border-2 border-blue-200"
            >
              <div className={`grid grid-cols-1 ${gridCols} gap-6 lg:gap-8 items-center p-6 md:p-8 lg:p-10`}>
                {/* Image */}
                <div className={`md:h-[50vh] ${!isImageLeft ? 'lg:order-2' : 'lg:order-1'} relative`}>
                  {section.image ? (
                    <div className="relative w-full h-full">
                      <img
                        src={section.image}
                        alt={section.imageAlt || section.title || ''}
                        className="rounded-lg object-cover w-full h-full"
                      />
                      {section.title && (
                        <div className="absolute bottom-0 left-0 bg-black/70 text-white px-4 py-2 rounded-br-lg">
                          <span className="text-sm md:text-base font-medium">{section.title}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  <EditableImage
                    imageUrl={section.image}
                    onChange={(url) => updateSection(index, 'image', url)}
                    className="absolute inset-0 w-full h-full"
                    isBackground={true}
                  />
                </div>

                {/* Content */}
                <div className={`${!isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  {/* What is it? */}
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-[Raleway] font-semibold mb-3 text-black/90">
                      <EditableText
                        value={section.whatIsItHeading || 'What is it?'}
                        onChange={(value) => updateSection(index, 'whatIsItHeading', value)}
                        tag="span"
                        placeholder="What is it?"
                      />
                    </h3>
                    <p className="text-base md:text-lg font-[Raleway] text-gray-700 leading-relaxed">
                      <EditableText
                        value={section.whatIsIt || ''}
                        onChange={(value) => updateSection(index, 'whatIsIt', value)}
                        tag="span"
                        multiline={true}
                        placeholder="Enter description..."
                      />
                    </p>
                  </div>

                  {/* How Azura Can Help */}
                  <div className="mb-6">
                    <h3 className="text-xl md:text-2xl font-[Raleway] font-semibold mb-3 text-black/90">
                      <EditableText
                        value={section.howCanHelpHeading || 'How Azura Can Help'}
                        onChange={(value) => updateSection(index, 'howCanHelpHeading', value)}
                        tag="span"
                        placeholder="How Azura Can Help"
                      />
                    </h3>
                    <p className="text-base md:text-lg font-[Raleway] text-gray-700 leading-relaxed">
                      <EditableText
                        value={section.howCanHelp || ''}
                        onChange={(value) => updateSection(index, 'howCanHelp', value)}
                        tag="span"
                        multiline={true}
                        placeholder="Enter how Azura can help..."
                      />
                    </p>
                  </div>

                  {/* Symptoms */}
                  <div>
                    <h3 className="text-xl md:text-2xl font-[Raleway] font-semibold mb-3 text-black/90">
                      <EditableText
                        value={section.symptomsHeading || 'Symptoms'}
                        onChange={(value) => updateSection(index, 'symptomsHeading', value)}
                        tag="span"
                        placeholder="Symptoms"
                      />
                    </h3>
                    <ul className="space-y-2 md:space-y-3 text-base md:text-lg md:ml-6 font-[Raleway] text-gray-700 leading-relaxed list-none">
                      {(section.symptoms || []).map((symptom, symptomIndex) => (
                        <li key={symptomIndex} className="flex items-start gap-3">
                          <span className="text-[#EC7979] font-bold flex-shrink-0 mt-0.5">•</span>
                          <div className="flex-1 flex items-center gap-2">
                            <EditableText
                              value={symptom}
                              onChange={(value) => updateSectionSymptom(index, symptomIndex, value)}
                              tag="span"
                              placeholder="Symptom..."
                            />
                            <button
                              onClick={() => removeSectionSymptom(index, symptomIndex)}
                              className="text-red-500 hover:text-red-700 text-sm px-2"
                              title="Remove symptom"
                            >
                              ×
                            </button>
                          </div>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => addSectionSymptom(index)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
                        >
                          + Add Symptom
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-4">
                <button
                  onClick={() => removeSection(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove Section
                </button>
              </div>
            </div>
          );
        })}

        {/* Add New Section Button */}
        <div className="text-center">
          <button
            onClick={addNewSection}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            + Add New Section
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditablePelvicFloorMain;

