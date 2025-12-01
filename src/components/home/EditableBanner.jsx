import React, { useState, useEffect } from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';
import EditableList from '../common/EditableList';

/**
 * EditableBanner - Wrapper around Banner component with editing capabilities
 * Uses the exact same structure as public Banner component
 */
const EditableBanner = ({ data, onDataChange }) => {
  if (!data) return null;

  // Convert separate fields to array for editing
  const getExperienceItemsArray = () => {
    if (data.experienceItems && Array.isArray(data.experienceItems)) {
      return data.experienceItems;
    }
    // Fallback: convert old format to array
    return [
      data.experienceItems_1,
      data.experienceItems_2,
      data.experienceItems_3,
      data.experienceItems_4,
      data.experienceItems_5,
      data.experienceItems_6,
      data.experienceItems_7,
    ].filter(Boolean);
  };

  const experienceItems = getExperienceItemsArray();

  const updateField = (field, value) => {
    onDataChange({ ...data, [field]: value });
  };

  const updateExperienceItems = (items) => {
    onDataChange({ ...data, experienceItems: items });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-end pt-20 lg:pt-24"
      id="banner"
    >
      {/* Background Image - Editable */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : 'none' }}
      >
        {/* Edit overlay for background image */}
        <EditableImage
          imageUrl={data.backgroundImage}
          onChange={(url) => updateField('backgroundImage', url)}
          className="absolute inset-0 w-full h-full"
          isBackground={true}
        />
      </div>

      <div className="relative z-10 w-full lg:w-[45%] mr-0 lg:mr-8 xl:mr-16 my-8 lg:my-0">
        <div className="backdrop-blur-[100px] rounded-2xl p-6 md:p-8 lg:p-10 text-white mx-4 lg:mx-0 shadow-2xl border-1 border-[#6d6c6c]">
          <h1 className="text-3xl md:text-4xl lg:text-4xl text-center font-bold font-[Raleway] mb-3">
            <EditableText
              value={data.mainTitle}
              onChange={(value) => updateField('mainTitle', value)}
              tag="span"
              className="block"
            />
          </h1>

          <h2 className="text-xl md:text-2xl mt-3 lg:text-3xl font-semibold font-[Raleway] mb-6 text-[#EB5466]">
            <EditableText
              value={data.subtitle}
              onChange={(value) => updateField('subtitle', value)}
              tag="span"
              className="block"
            />
          </h2>

          <p className="text-base md:text-lg font-[Raleway] mb-8 leading-relaxed text-white">
            <EditableText
              value={data.introductionParagraph}
              onChange={(value) => updateField('introductionParagraph', value)}
              multiline={true}
              className="block"
            />
          </p>

          <h3 className="text-xl md:text-2xl font-semibold font-[Raleway] mb-6 text-[#EB5466]">
            <EditableText
              value={data.experienceSectionTitle}
              onChange={(value) => updateField('experienceSectionTitle', value)}
              tag="span"
              className="block"
            />
          </h3>

          <ol className="space-y-4 font-[Raleway]">
            {experienceItems.map((item, index) => (
              <li key={index} className="flex gap-3 md:gap-4 text-sm md:text-base lg:text-lg leading-relaxed">
                <span className="text-white font-bold flex-shrink-0">{index + 1}.</span>
                <span className="text-white">
                  <EditableText
                    value={item || ''}
                    onChange={(value) => {
                      const updated = [...experienceItems];
                      updated[index] = value;
                      updateExperienceItems(updated);
                    }}
                    className="inline-block"
                  />
                </span>
              </li>
            ))}
            {/* Add new item button */}
            <li className="mt-2">
              <button
                onClick={() => {
                  updateExperienceItems([...experienceItems, '']);
                }}
                className="text-white text-sm bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
              >
                + Add Item
              </button>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default EditableBanner;

