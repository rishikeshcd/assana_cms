import React from 'react';
import EditableText from '../../common/EditableText';
import EditableImage from '../../common/EditableImage';

/**
 * EditableAssanaButtCheckMain - CMS wrapper for AssanaButtCheckMain component
 * Dynamic left and right cards with add/remove functionality
 */
const EditableAssanaButtCheckMain = ({ data, onDataChange }) => {
  const safeData = data || {
    mainTitle: 'All you need to know..',
    leftCards: [],
    centerImage: '',
    centerImageAlt: '',
    rightCards: [],
  };

  const leftCards = safeData.leftCards || [];
  const rightCards = safeData.rightCards || [];

  const updateMainTitle = (value) => {
    onDataChange({ ...safeData, mainTitle: value });
  };

  const updateCard = (side, index, field, value) => {
    const cards = side === 'left' ? [...leftCards] : [...rightCards];
    cards[index] = { ...cards[index], [field]: value };
    onDataChange({
      ...safeData,
      [side === 'left' ? 'leftCards' : 'rightCards']: cards,
    });
  };

  const addCard = (side) => {
    const newCard = { title: '', description: '' };
    const cards = side === 'left' ? [...leftCards] : [...rightCards];
    cards.push(newCard);
    onDataChange({
      ...safeData,
      [side === 'left' ? 'leftCards' : 'rightCards']: cards,
    });
  };

  const removeCard = (side, index) => {
    const cards = side === 'left' ? [...leftCards] : [...rightCards];
    const updated = cards.filter((_, i) => i !== index);
    onDataChange({
      ...safeData,
      [side === 'left' ? 'leftCards' : 'rightCards']: updated,
    });
  };

  const updateCenterImage = (url) => {
    onDataChange({ ...safeData, centerImage: url });
  };

  const updateCenterImageAlt = (value) => {
    onDataChange({ ...safeData, centerImageAlt: value });
  };

  // Helper function to render an editable text box section
  const renderEditableTextBox = (side, card, index) => {
    return (
      <div key={index} className="bg-white p-6 md:p-8 rounded-lg shadow-md border-2 border-blue-200 relative">
        <button
          onClick={() => removeCard(side, index)}
          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors z-10"
        >
          Remove
        </button>
        <h3 className="text-xl md:text-2xl font-[Raleway] font-semibold mb-4 text-[#EC7979] pr-16">
          <EditableText
            value={card.title || ''}
            onChange={(value) => updateCard(side, index, 'title', value)}
            tag="span"
            placeholder="Section Title"
          />
        </h3>
        <div className="text-base md:text-lg font-[Raleway] text-gray-700 leading-relaxed whitespace-pre-line">
          <EditableText
            value={card.description || ''}
            onChange={(value) => updateCard(side, index, 'description', value)}
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

        {/* Three Column Layout - dynamic left cards, center image, dynamic right cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - dynamic cards */}
          <div className="flex flex-col gap-y-6">
            {leftCards.map((card, index) => renderEditableTextBox('left', card, index))}
            <button
              onClick={() => addCard('left')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              + Add Left Card
            </button>
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

          {/* Right Column - dynamic cards */}
          <div className="flex flex-col gap-y-6">
            {rightCards.map((card, index) => renderEditableTextBox('right', card, index))}
            <button
              onClick={() => addCard('right')}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              + Add Right Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditableAssanaButtCheckMain;
