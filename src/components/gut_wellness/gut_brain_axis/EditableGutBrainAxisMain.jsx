import React from 'react';
import EditableText from '../../common/EditableText';
import { Link } from 'react-router-dom';

/**
 * EditableGutBrainAxisMain - CMS wrapper for GutBrainAxisMain component
 */
const EditableGutBrainAxisMain = ({ data, onDataChange }) => {
  const safeData = data || {
    mainTitle: 'Assana Life',
    subtitle: 'Our Gut Wellness Programme.',
    mainHeading: 'Transforming Health from the Inside Out.',
    introDescription: '',
    approachHeading: 'Our Holistic Approach to Gut Wellness',
    approaches: [],
    conclusion: '',
  };

  const updateField = (field, value) => {
    onDataChange({ ...safeData, [field]: value });
  };

  const updateApproach = (index, field, value) => {
    const updated = [...(safeData.approaches || [])];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, approaches: updated });
  };

  const addApproach = () => {
    const newApproach = {
      title: '',
      description: '',
      icon: '',
    };
    onDataChange({ ...safeData, approaches: [...(safeData.approaches || []), newApproach] });
  };

  const removeApproach = (index) => {
    const updated = (safeData.approaches || []).filter((_, i) => i !== index);
    onDataChange({ ...safeData, approaches: updated });
  };

  return (
    <div className="bg-white py-12 md:py-16 lg:py-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16">
        {/* Main Title Section */}
        <div className="text-center mb-12 md:mb-16 border-2 border-blue-200 rounded-lg p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-[Raleway] font-semibold text-[#EC7979] mb-4">
            <EditableText
              value={safeData.mainTitle || 'Assana Life'}
              onChange={(value) => updateField('mainTitle', value)}
              tag="span"
              placeholder="Assana Life"
            />
          </h2>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-[Raleway] font-medium text-gray-800 mb-6">
            <EditableText
              value={safeData.subtitle || 'Our Gut Wellness Programme.'}
              onChange={(value) => updateField('subtitle', value)}
              tag="span"
              placeholder="Our Gut Wellness Programme."
            />
          </h3>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[Raleway] font-bold text-gray-900 mb-8">
            <EditableText
              value={safeData.mainHeading || 'Transforming Health from the Inside Out.'}
              onChange={(value) => updateField('mainHeading', value)}
              tag="span"
              placeholder="Transforming Health from the Inside Out."
            />
          </h1>
          <p className="text-base md:text-lg lg:text-xl font-[Raleway] text-gray-700 leading-relaxed max-w-4xl mx-auto">
            <EditableText
              value={safeData.introDescription || ''}
              onChange={(value) => updateField('introDescription', value)}
              multiline={true}
              placeholder="Enter introduction description..."
            />
          </p>
        </div>

        {/* Approach Heading */}
        <div className="text-center mb-12 border-2 border-blue-200 rounded-lg p-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-[Raleway] font-semibold text-gray-900">
            <EditableText
              value={safeData.approachHeading || 'Our Holistic Approach to Gut Wellness'}
              onChange={(value) => updateField('approachHeading', value)}
              tag="span"
              placeholder="Our Holistic Approach to Gut Wellness"
            />
          </h2>
        </div>

        {/* Approaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {(safeData.approaches || []).map((approach, index) => (
            <div
              key={index}
              className="bg-[#FEF6F6] rounded-2xl shadow-lg p-6 md:p-8 border-2 border-blue-200"
            >
              <div className="mb-4">
                <EditableText
                  value={approach.icon || ''}
                  onChange={(value) => updateApproach(index, 'icon', value)}
                  tag="span"
                  placeholder="Icon (emoji or text)"
                  className="text-4xl md:text-5xl block"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-[Raleway] font-semibold text-[#EC7979] mb-4">
                <EditableText
                  value={approach.title || ''}
                  onChange={(value) => updateApproach(index, 'title', value)}
                  tag="span"
                  placeholder="Approach Title"
                />
              </h3>
              <p className="text-base md:text-lg font-[Raleway] text-gray-700 leading-relaxed">
                <EditableText
                  value={approach.description || ''}
                  onChange={(value) => updateApproach(index, 'description', value)}
                  multiline={true}
                  placeholder="Enter description..."
                />
              </p>
              <button
                onClick={() => removeApproach(index)}
                className="mt-4 text-red-500 hover:text-red-700 text-sm font-medium"
                type="button"
              >
                Remove Approach
              </button>
            </div>
          ))}
        </div>

        {/* Add New Approach Button */}
        <div className="text-center mb-12">
          <button
            onClick={addApproach}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            + Add New Approach
          </button>
        </div>

        {/* Conclusion Section */}
        <div className="max-w-4xl mx-auto text-center border-2 border-blue-200 rounded-lg p-6 md:p-8">
          <p className="text-base md:text-lg lg:text-xl font-[Raleway] text-gray-700 leading-relaxed mb-8">
            <EditableText
              value={safeData.conclusion || ''}
              onChange={(value) => updateField('conclusion', value)}
              multiline={true}
              placeholder="Enter conclusion text..."
            />
          </p>
          <Link to="/contact">
            <button className="bg-[#EC7979] text-white py-3 px-8 rounded-4xl cursor-pointer hover:bg-[#d86565] transition-colors font-medium text-base md:text-lg font-[Raleway]">
              Book a Consultation
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditableGutBrainAxisMain;
