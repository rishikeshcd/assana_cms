import React from 'react';
import EditableText from '../common/EditableText';
import EditableImage from '../common/EditableImage';
import EditableList from '../common/EditableList';

/**
 * EditableDropdownMenu - Wrapper with editing capabilities
 * Uses the exact same structure as public DropdownMenu component
 */
const EditableDropdownMenu = ({ data, onDataChange }) => {
  if (!data) return null;

  const updateField = (field, value) => {
    onDataChange({ ...data, [field]: value });
  };

  const updateArrayField = (field, items) => {
    onDataChange({ ...data, [field]: items });
  };

  // Get items arrays with fallback
  const getColorectalItems = () => {
    if (data.colorectalConditionsItems && Array.isArray(data.colorectalConditionsItems)) {
      return data.colorectalConditionsItems;
    }
    return [
      data.colorectalConditionsItem1,
      data.colorectalConditionsItem2,
      data.colorectalConditionsItem3,
      data.colorectalConditionsItem4,
      data.colorectalConditionsItem5,
      data.colorectalConditionsItem6,
    ].filter(Boolean);
  };

  const getGutWellnessItems = () => {
    if (data.gutWellnessItems && Array.isArray(data.gutWellnessItems)) {
      return data.gutWellnessItems;
    }
    return [
      data.gutWellnessItem1,
      data.gutWellnessItem2,
      data.gutWellnessItem3,
      data.gutWellnessItem4,
      data.gutWellnessItem5,
      data.gutWellnessItem6,
    ].filter(Boolean);
  };

  const getEducationItems = () => {
    if (data.educationItems && Array.isArray(data.educationItems)) {
      return data.educationItems;
    }
    return [
      data.educationItem1,
      data.educationItem2,
      data.educationItem3,
    ].filter(Boolean);
  };

  const colorectalItems = getColorectalItems();
  const gutWellnessItems = getGutWellnessItems();
  const educationItems = getEducationItems();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section 
      className="w-full bg-[] bg-cover bg-center bg-no-repeat mt-10 mb-10 relative" 
      style={{
        backgroundImage: data.backgroundImage ? `url(${data.backgroundImage})` : 'none',
      }}
    >
      {/* Background Image - Editable Overlay */}
      <div className="absolute inset-0">
        <EditableImage
          imageUrl={data.backgroundImage}
          onChange={(url) => updateField('backgroundImage', url)}
          className="absolute inset-0 w-full h-full"
          isBackground={true}
        />
      </div>

      <div className="backdrop-blur-[36px] px-4 md:p-10 relative z-10">
        <div className="w-[100%] md:w-[80%] mx-auto rounded-2xl bg-[]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Colorectal Conditions */}
            <div className="space-y-4 border border-[#6d6c6c] w-[100%] p-5 rounded-2xl bg-[#00000052]">
              <h3 className="text-[#EB5466] text-xl font-bold font-[Raleway] mb-4">
                <EditableText
                  value={data.colorectalConditionsTitle}
                  onChange={(value) => updateField('colorectalConditionsTitle', value)}
                  tag="span"
                  className="block"
                />
              </h3>
              <ul className="grid grid-cols-2 gap-3">
                {colorectalItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 group relative">
                    <span className="text-white text-sm">•</span>
                    <span className="text-white text-sm font-[Raleway] flex-1">
                      <EditableText
                        value={item || ''}
                        onChange={(value) => {
                          const updated = [...colorectalItems];
                          updated[index] = value;
                          updateArrayField('colorectalConditionsItems', updated);
                        }}
                        className="inline-block"
                      />
                    </span>
                    <button
                      onClick={() => {
                        const updated = colorectalItems.filter((_, i) => i !== index);
                        updateArrayField('colorectalConditionsItems', updated);
                      }}
                      className="text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                      title="Remove item"
                    >
                      ×
                    </button>
                  </li>
                ))}
                <li className="mt-2">
                  <button
                    onClick={() => {
                      updateArrayField('colorectalConditionsItems', [...colorectalItems, '']);
                    }}
                    className="text-white text-xs bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                  >
                    + Add Item
                  </button>
                </li>
              </ul>
            </div>

            {/* Gut Wellness */}
            <div className="space-y-4 border-1 border-[#6d6c6c] p-5 rounded-2xl bg-[#00000052]">
              <h3 className="text-[#EB5466] text-xl font-bold font-[Raleway] mb-4">
                <EditableText
                  value={data.gutWellnessTitle}
                  onChange={(value) => updateField('gutWellnessTitle', value)}
                  tag="span"
                  className="block"
                />
              </h3>
              <ul className="grid grid-cols-2 gap-3">
                {gutWellnessItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 group relative">
                    <span className="text-white text-sm">•</span>
                    <span className="text-white text-sm font-[Raleway] flex-1">
                      <EditableText
                        value={item || ''}
                        onChange={(value) => {
                          const updated = [...gutWellnessItems];
                          updated[index] = value;
                          updateArrayField('gutWellnessItems', updated);
                        }}
                        className="inline-block"
                      />
                    </span>
                    <button
                      onClick={() => {
                        const updated = gutWellnessItems.filter((_, i) => i !== index);
                        updateArrayField('gutWellnessItems', updated);
                      }}
                      className="text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                      title="Remove item"
                    >
                      ×
                    </button>
                  </li>
                ))}
                <li className="mt-2">
                  <button
                    onClick={() => {
                      updateArrayField('gutWellnessItems', [...gutWellnessItems, '']);
                    }}
                    className="text-white text-xs bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                  >
                    + Add Item
                  </button>
                </li>
              </ul>
            </div>

            {/* Education */}
            <div className="space-y-4 border-1 border-[#6d6c6c] p-5 rounded-2xl bg-[#00000052]">
              <h3 className="text-[#EB5466] text-xl font-bold font-[Raleway] mb-4">
                <EditableText
                  value={data.educationTitle}
                  onChange={(value) => updateField('educationTitle', value)}
                  tag="span"
                  className="block"
                />
              </h3>
              <ul className="grid grid-cols-2 gap-3">
                {educationItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 group relative">
                    <span className="text-white text-sm">•</span>
                    <span className="text-white text-sm font-[Raleway] flex-1">
                      <EditableText
                        value={item || ''}
                        onChange={(value) => {
                          const updated = [...educationItems];
                          updated[index] = value;
                          updateArrayField('educationItems', updated);
                        }}
                        className="inline-block"
                      />
                    </span>
                    <button
                      onClick={() => {
                        const updated = educationItems.filter((_, i) => i !== index);
                        updateArrayField('educationItems', updated);
                      }}
                      className="text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                      title="Remove item"
                    >
                      ×
                    </button>
                  </li>
                ))}
                <li className="mt-2">
                  <button
                    onClick={() => {
                      updateArrayField('educationItems', [...educationItems, '']);
                    }}
                    className="text-white text-xs bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded"
                  >
                    + Add Item
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableDropdownMenu;

