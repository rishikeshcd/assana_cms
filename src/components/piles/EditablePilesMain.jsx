import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';

/**
 * EditablePilesMain - CMS wrapper for PilesMain component
 * Same as AnalFistulaMain with bullet points
 */
const EditablePilesMain = ({ data, onDataChange }) => {
  const safeData = data || {
    sections: [],
    conclusion: {
      title: 'Conclusion',
      description: '',
      buttonText: 'Book a Consultation',
    },
  };

  const sections = safeData.sections || [];
  const conclusion = safeData.conclusion || {};

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, sections: updated });
  };

  const updateSectionItem = (sectionIndex, itemIndex, value) => {
    const updated = [...sections];
    const items = [...(updated[sectionIndex].items || [])];
    items[itemIndex] = value;
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    onDataChange({ ...safeData, sections: updated });
  };

  const addSectionItem = (sectionIndex) => {
    const updated = [...sections];
    const items = [...(updated[sectionIndex].items || [])];
    items.push('');
    updated[sectionIndex] = { ...updated[sectionIndex], items };
    onDataChange({ ...safeData, sections: updated });
  };

  const removeSectionItem = (sectionIndex, itemIndex) => {
    const updated = [...sections];
    const items = updated[sectionIndex].items || [];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      items: items.filter((_, i) => i !== itemIndex),
    };
    onDataChange({ ...safeData, sections: updated });
  };

  const addNewSection = () => {
    const newSection = {
      title: '',
      image: '',
      imageAlt: '',
      imageTitle: '',
      items: [],
    };
    onDataChange({ ...safeData, sections: [...sections, newSection] });
  };

  const removeSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    onDataChange({ ...safeData, sections: updated });
  };

  const updateConclusion = (field, value) => {
    onDataChange({
      ...safeData,
      conclusion: { ...conclusion, [field]: value },
    });
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
                    <img
                      src={section.image}
                      alt={section.imageAlt || ''}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                  {/* Image Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm px-4 py-3 rounded-b-lg z-10">
                    <div className="text-white text-lg md:text-xl font-[Raleway] font-medium text-center uppercase">
                      <EditableText
                        value={section.imageTitle || ''}
                        onChange={(value) => updateSection(index, 'imageTitle', value)}
                        tag="span"
                        placeholder="Image Title"
                        className="block w-full"
                      />
                    </div>
                  </div>
                  <EditableImage
                    imageUrl={section.image}
                    onChange={(url) => updateSection(index, 'image', url)}
                    className="absolute inset-0 w-full h-full"
                    isBackground={true}
                  />
                </div>

                {/* Content - Bullet points */}
                <div className={`${!isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-[Raleway] mb-6 text-black/90">
                    <EditableText
                      value={section.title || ''}
                      onChange={(value) => updateSection(index, 'title', value)}
                      tag="span"
                      placeholder="Section Title"
                    />
                  </h2>
                  <ul className="space-y-2 md:space-y-3 text-base md:text-lg md:ml-6 font-[Raleway] text-gray-700 leading-relaxed list-none">
                    {(section.items || []).map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <span className="text-[#EC7979] font-bold shrink-0 mt-0.5">•</span>
                        <div className="flex-1 flex items-center gap-2">
                          <EditableText
                            value={item}
                            onChange={(value) => updateSectionItem(index, itemIndex, value)}
                            tag="span"
                            placeholder="List item..."
                          />
                          <button
                            onClick={() => removeSectionItem(index, itemIndex)}
                            className="text-red-500 hover:text-red-700 text-sm px-2"
                            title="Remove item"
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => addSectionItem(index)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-2"
                      >
                        + Add Item
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 pb-4">
                <button
                  onClick={() => removeSection(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                  type="button"
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

      {/* Conclusion Section */}
      <div className="max-w-[1600px] p-8 md:p-10 m-auto border-2 border-blue-200 rounded-lg">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-[Raleway] mb-4 text-black/90">
          <EditableText
            value={conclusion.title || 'Conclusion'}
            onChange={(value) => updateConclusion('title', value)}
            tag="span"
            placeholder="Conclusion"
          />
        </h1>
        <p className="text-base md:text-lg font-[Raleway] mb-4 text-gray-700 leading-relaxed">
          <EditableText
            value={conclusion.description || ''}
            onChange={(value) => updateConclusion('description', value)}
            multiline={true}
            placeholder="Enter conclusion description..."
          />
        </p>
        <div className="bg-[#EC7979] text-white py-3 px-8 rounded-4xl cursor-default font-medium text-base md:text-lg font-[Raleway] inline-block">
          <EditableText
            value={conclusion.buttonText || 'Book a Consultation'}
            onChange={(value) => updateConclusion('buttonText', value)}
            tag="span"
            placeholder="Book a Consultation"
          />
        </div>
      </div>
    </div>
  );
};

export default EditablePilesMain;

