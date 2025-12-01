import React from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

/**
 * EditableWhyChooseAssana - CMS wrapper for WhyChooseAssana component
 */
const EditableWhyChooseAssana = ({ data, onDataChange }) => {
  // Ensure we always have exactly 4 cards
  const ensureFourCards = (cards) => {
    const defaultCards = [
      {
        title: 'Expertise in Colorectal Care',
        description: 'Our multidisciplinary team includes colorectal specialists, physiotherapists, nutritionists, and lifestyle coaches',
        icon: '',
        iconAlt: 'Expertise in Colorectal Care',
      },
      {
        title: 'Advanced Technology',
        description: 'State-of-the-art equipment ensures precision and comfort during the procedure.',
        icon: '',
        iconAlt: 'Advanced Technology',
      },
      {
        title: 'Comprehensive Care',
        description: 'Alongside the procedure, we provide personalized diet and lifestyle recommendations to prevent recurrence.',
        icon: '',
        iconAlt: 'Comprehensive Care',
      },
      {
        title: 'Patient-Centric Approach',
        description: 'We prioritize your comfort, privacy, and recovery every step of the way.',
        icon: '',
        iconAlt: 'Patient-Centric Approach',
      },
    ];
    
    if (!cards || cards.length === 0) {
      return defaultCards;
    }
    
    // Take only first 4 cards
    const limited = cards.slice(0, 4);
    
    // Fill up to 4 if less than 4
    while (limited.length < 4) {
      limited.push(defaultCards[limited.length] || {
        title: 'New Card',
        description: '',
        icon: '',
        iconAlt: '',
      });
    }
    
    return limited;
  };

  const safeData = data || {
    title: 'Why Choose Assana for Piles Treatment?',
    cards: [
      {
        title: 'Expertise in Colorectal Care',
        description: 'Our multidisciplinary team includes colorectal specialists, physiotherapists, nutritionists, and lifestyle coaches',
        icon: '',
        iconAlt: 'Expertise in Colorectal Care',
      },
      {
        title: 'Advanced Technology',
        description: 'State-of-the-art equipment ensures precision and comfort during the procedure.',
        icon: '',
        iconAlt: 'Advanced Technology',
      },
      {
        title: 'Comprehensive Care',
        description: 'Alongside the procedure, we provide personalized diet and lifestyle recommendations to prevent recurrence.',
        icon: '',
        iconAlt: 'Comprehensive Care',
      },
      {
        title: 'Patient-Centric Approach',
        description: 'We prioritize your comfort, privacy, and recovery every step of the way.',
        icon: '',
        iconAlt: 'Patient-Centric Approach',
      },
    ],
  };

  // Ensure exactly 4 cards
  const cards = ensureFourCards(safeData.cards);

  const updateTitle = (value) => {
    onDataChange({ ...safeData, title: value });
  };

  const updateCard = (index, field, value) => {
    const updated = [...cards];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, cards: updated });
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 bg-[#FEF6F6] relative overflow-hidden border-2 border-blue-200 rounded-lg">
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[Raleway] text-center mb-12 md:mb-16 text-black">
          <EditableText
            value={safeData.title || 'Why Choose Assana for Piles Treatment?'}
            onChange={updateTitle}
            tag="span"
            placeholder="Why Choose Assana for Piles Treatment?"
          />
        </h2>

        {/* Cards Grid - Simple grid layout for easy editing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const isEven = index % 2 === 1; // 2nd and 4th cards (index 1 and 3)
            const cardBg = isEven ? 'bg-[#EC7979]' : 'bg-white';
            const textColor = isEven ? 'text-white' : 'text-black';
            
            return (
              <div
                key={index}
                className={`${cardBg} rounded-xl shadow-lg p-6 md:p-8 flex flex-col h-full relative`}
              >
                {/* Card Title */}
                <h3 className={`text-xl md:text-2xl font-bold font-[Raleway] ${textColor} mb-4`}>
                  <EditableText
                    value={card.title || ''}
                    onChange={(value) => updateCard(index, 'title', value)}
                    tag="span"
                    placeholder="Card Title"
                  />
                </h3>

                {/* Card Description */}
                <p className={`text-base md:text-lg font-[Raleway] ${textColor} mb-6 leading-relaxed grow`}>
                  <EditableText
                    value={card.description || ''}
                    onChange={(value) => updateCard(index, 'description', value)}
                    tag="span"
                    multiline={true}
                    placeholder="Card Description"
                  />
                </p>

                {/* Card Icon - Bottom Right */}
                <div className="mt-auto flex justify-end items-end">
                  <EditableImage
                    imageUrl={card.icon}
                    onChange={(url) => updateCard(index, 'icon', url)}
                    className="relative w-20 h-20 md:w-24 md:h-24 group"
                    isBackground={false}
                    alt={card.iconAlt || card.title}
                  >
                    {card.icon ? (
                      <img
                        src={card.icon}
                        alt={card.iconAlt || card.title}
                        className="w-full h-full object-contain"
                        style={{ filter: isEven ? 'brightness(0) invert(1)' : 'none' }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className={`text-xs ${isEven ? 'text-gray-300' : 'text-gray-400'}`}>No icon</span>
                      </div>
                    )}
                  </EditableImage>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EditableWhyChooseAssana;

