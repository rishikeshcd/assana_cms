import React from 'react';
import EditableText from '../../common/EditableText';
import EditableImage from '../../common/EditableImage';
import { COLORS } from '../../../constants/config';

/**
 * EditableGutBrainAxisMain - CMS wrapper for GutBrainAxisMain component
 */
const EditableGutBrainAxisMain = ({ data, onDataChange, onSave }) => {
  const safeData = data || {
    sections: [],
  };

  const sections = safeData.sections || [];

  const updateSection = (index, field, value) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, sections: updated });
  };

  const updateContentBlock = (sectionIndex, blockIndex, field, value) => {
    const updated = [...sections];
    const contentBlocks = [...(updated[sectionIndex].contentBlocks || [])];
    contentBlocks[blockIndex] = { ...contentBlocks[blockIndex], [field]: value };
    updated[sectionIndex] = { ...updated[sectionIndex], contentBlocks };
    onDataChange({ ...safeData, sections: updated });
  };

  const addContentBlock = (sectionIndex) => {
    const updated = [...sections];
    const contentBlocks = [...(updated[sectionIndex].contentBlocks || [])];
    contentBlocks.push({ heading: '', text: '' });
    updated[sectionIndex] = { ...updated[sectionIndex], contentBlocks };
    onDataChange({ ...safeData, sections: updated });
  };

  const removeContentBlock = (sectionIndex, blockIndex) => {
    const updated = [...sections];
    const contentBlocks = updated[sectionIndex].contentBlocks || [];
    updated[sectionIndex] = {
      ...updated[sectionIndex],
      contentBlocks: contentBlocks.filter((_, i) => i !== blockIndex),
    };
    onDataChange({ ...safeData, sections: updated });
  };

  const addNewSection = () => {
    const newSection = {
      title: '',
      image: '',
      imageAlt: '',
      imageTitle: '',
      contentBlocks: [{ heading: '', text: '' }],
    };
    onDataChange({ ...safeData, sections: [...sections, newSection] });
  };

  const removeSection = async (index) => {
    const currentSections = safeData.sections || [];
    const updated = currentSections.filter((_, i) => i !== index);
    const newData = { ...safeData, sections: updated };
    onDataChange(newData);
    
    // Auto-save to database
    if (onSave) {
      await onSave(newData);
    }
  };

  return (
    <div className="bg-white py-12 md:py-16 lg:p-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 space-y-8 md:space-y-12">
        {sections.map((section, index) => {
          const isImageLeft = index % 2 === 0;
          const gridCols = isImageLeft ? 'lg:grid-cols-[35%_65%]' : 'lg:grid-cols-[65%_35%]';
          const contentBlocks = section.contentBlocks || [];

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
                      alt={section.imageAlt || section.title || ''}
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

                {/* Content */}
                <div className={`${!isImageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  {contentBlocks.map((block, blockIndex) => (
                    <div key={blockIndex} className={blockIndex < contentBlocks.length - 1 ? 'mb-6' : ''}>
                      <h3 className={`text-xl md:text-2xl font-[Raleway] font-semibold mb-3 ${
                        blockIndex === 0 ? 'text-black/90' : 'text-[#E64C4CE5]'
                      }`}>
                        <EditableText
                          value={block.heading || ''}
                          onChange={(value) => updateContentBlock(index, blockIndex, 'heading', value)}
                          tag="span"
                          placeholder="Heading"
                        />
                      </h3>
                      <div className="text-base md:text-lg font-[Raleway] text-gray-700 leading-relaxed">
                        <EditableText
                          value={block.text || ''}
                          onChange={(value) => updateContentBlock(index, blockIndex, 'text', value)}
                          tag="div"
                          multiline={true}
                          placeholder="Text... (Use • for bullet points, press Enter for new lines)"
                          className="whitespace-pre-line"
                        />
                      </div>
                      <button
                        onClick={() => removeContentBlock(index, blockIndex)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium mt-2"
                        title="Remove this content block"
                      >
                        Remove Block
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => addContentBlock(index)}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium mt-4"
                  >
                    + Add Content Block
                  </button>
                </div>
              </div>
              <div className="px-6 pb-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to remove this section?')) {
                      removeSection(index);
                    }
                  }}
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

        {/* Conclusion Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8 md:p-12 text-center border-2 border-blue-200">
          <h3 className="text-xl md:text-2xl font-[Raleway] font-semibold mb-4 text-gray-800">
            Conclusion
          </h3>
          <p className="text-lg md:text-xl font-[Raleway] text-gray-700 leading-relaxed mb-6">
            <EditableText
              value={safeData.conclusion?.text || ''}
              onChange={(value) => onDataChange({ ...safeData, conclusion: { ...safeData.conclusion, text: value } })}
              multiline={true}
              placeholder="Enter conclusion text..."
              className="block"
            />
          </p>
          <div>
            <EditableText
              value={safeData.conclusion?.buttonText || 'Book a Consultation'}
              onChange={(value) => onDataChange({ ...safeData, conclusion: { ...safeData.conclusion, buttonText: value } })}
              tag="span"
              className="inline-block text-white py-3 px-8 rounded-full font-medium text-base md:text-lg font-[Raleway] transition-colors hover:opacity-90"
              style={{ backgroundColor: COLORS.BUTTON_BG }}
              placeholder="Button Text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableGutBrainAxisMain;
