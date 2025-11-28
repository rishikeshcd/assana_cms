import React from 'react';
import EditableText from './EditableText';
import EditableArrayOfObjects from './EditableArrayOfObjects';

/**
 * EditableFrequentlyQA - CMS version with all accordion items expanded for easy editing
 * Uses the exact same structure as public FrequentlyQA component but all items are open
 */
const EditableFrequentlyQA = ({ data, onDataChange }) => {
  // Ensure data exists with defaults
  const safeData = data || { componentHeading: '', faqs: [] };
  const faqs = safeData.faqs || [];

  const updateComponentHeading = (value) => {
    onDataChange({ ...safeData, componentHeading: value });
  };

  const updateFaqs = (updatedFaqs) => {
    onDataChange({ ...safeData, faqs: updatedFaqs });
  };

  const updateFaq = (index, field, value) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    updateFaqs(updated);
  };

  const addNewFaq = () => {
    const newFaq = {
      questionHeading: 'New Question',
      answerPara: 'New Answer',
    };
    updateFaqs([...faqs, newFaq]);
  };

  const removeFaq = (index) => {
    const updated = faqs.filter((_, i) => i !== index);
    updateFaqs(updated);
  };

  return (
    <section className='max-w-[1600px] m-auto overflow-hidden w-[95%] lg:w-[75%] pb-10'>
      {/* Heading */}
      <h1 className="font-[Raleway] smallShadow lg:textShadow text-black text-3xl sm:text-4xl lg:text-6xl mt-8 lg:mt-30 text-center">
        <EditableText
          value={safeData?.componentHeading || ''}
          onChange={updateComponentHeading}
          tag="span"
          className="block"
        />
      </h1>

      {/* FAQs - All Expanded in CMS */}
      <div className='mt-14'>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 rounded-xl overflow-hidden border-2 border-blue-300">
            {/* Question - Always visible */}
            <div className="w-full text-[#EB5466] flex justify-between font-medium items-center px-4 py-5 text-base sm:text-xl font-[Raleway] bg-[#0000000a]">
              <div className="flex-1">
                <EditableText
                  value={faq.questionHeading || ''}
                  onChange={(value) => updateFaq(index, 'questionHeading', value)}
                  tag="span"
                  className="block"
                />
              </div>
              {/* Remove button */}
              <button
                onClick={() => removeFaq(index)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg ml-4 hover:bg-red-600 text-sm"
              >
                Remove
              </button>
            </div>

            {/* Answer - Always visible in CMS */}
            <div className="px-4 pb-4 bg-[#0000000a] font-[Raleway] text-black font-medium text-base">
              <EditableText
                value={faq.answerPara || ''}
                onChange={(value) => updateFaq(index, 'answerPara', value)}
                multiline={true}
                className="block w-full min-h-[80px]"
              />
            </div>
          </div>
        ))}

        {/* Add New FAQ Button */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={addNewFaq}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
          >
            + Add New FAQ
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditableFrequentlyQA;

