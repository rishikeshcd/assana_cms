import React from 'react';
import EditableText from '../../common/EditableText';
import EditableImage from '../../common/EditableImage';

/**
 * EditableLaserSurgeryContent - CMS wrapper for LaserSurgeryContent component
 */
const EditableLaserSurgeryContent = ({ data, onDataChange }) => {
  const safeData = data || {
    mainTitle: 'All you need to know..',
    leftTopSection: { title: '', description: '' },
    leftBottomSection: { title: '', description: '' },
    centerImage: '',
    centerImageAlt: '',
    rightTopSection: { title: '', description: '' },
    rightBottomSection: { title: '', description: '' },
  };

  const updateMainTitle = (value) => {
    onDataChange({ ...safeData, mainTitle: value });
  };

  const updateSection = (sectionKey, field, value) => {
    onDataChange({
      ...safeData,
      [sectionKey]: {
        ...safeData[sectionKey],
        [field]: value,
      },
    });
  };

  const updateCenterImage = (url) => {
    onDataChange({ ...safeData, centerImage: url });
  };

  const updateCenterImageAlt = (value) => {
    onDataChange({ ...safeData, centerImageAlt: value });
  };

  // Helper function to render an editable text box section
  const renderEditableTextBox = (sectionKey, index) => {
    const section = safeData[sectionKey] || { title: '', description: '' };
    
    return (
      <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-md border-2 border-blue-200">
        <h3 className="text-xl md:text-2xl font-[Raleway] font-semibold mb-4 text-[#EC7979]">
          <EditableText
            value={section.title || ''}
            onChange={(value) => updateSection(sectionKey, 'title', value)}
            tag="span"
            placeholder="Section Title"
          />
        </h3>
        <div className="text-base md:text-lg font-[Raleway] text-gray-700 leading-relaxed whitespace-pre-line">
          <EditableText
            value={section.description || ''}
            onChange={(value) => updateSection(sectionKey, 'description', value)}
            tag="span"
            multiline={true}
            placeholder="Enter description..."
          />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0000000A] py-12 md:py-16 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16">
        {/* Main Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-[Raleway] font-semibold text-center mb-12 md:mb-16 text-black/90">
          <EditableText
            value={safeData.mainTitle || 'All you need to know..'}
            onChange={updateMainTitle}
            tag="span"
            placeholder="All you need to know.."
          />
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="flex flex-col gap-y-6 justify-between">
            {renderEditableTextBox('leftTopSection', 'left-top')}
            {renderEditableTextBox('leftBottomSection', 'left-bottom')}
          </div>
          {/* Center Image Column */}
          <div className="h-full">
            {safeData.centerImage ? (
              <div className="w-full h-full relative">
                <img
                  src={safeData.centerImage}
                  alt={safeData.centerImageAlt || 'Center image'}
                  className="w-auto h-full rounded-lg object-cover"
                />
                <EditableImage
                  imageUrl={safeData.centerImage}
                  onChange={updateCenterImage}
                  className="absolute inset-0 w-full h-full"
                  isBackground={true}
                />
              </div>
            ) : (
              <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center relative">
                <span className="text-gray-400">No image</span>
                <EditableImage
                  imageUrl=""
                  onChange={updateCenterImage}
                  className="absolute inset-0 w-full h-full"
                  isBackground={true}
                />
              </div>
            )}
          </div>
          {/* Right Column */}
          <div className="flex flex-col gap-y-6">
            {renderEditableTextBox('rightTopSection', 'right-top')}
            {renderEditableTextBox('rightBottomSection', 'right-bottom')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableLaserSurgeryContent;


