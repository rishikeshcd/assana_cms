import React from 'react';
import EditableText from './EditableText';

/**
 * EditableServices - CMS version with all accordion items expanded for easy editing
 * Uses the exact same structure as public Services component but all items are open
 */
const EditableServices = ({ data, onDataChange }) => {
  // Ensure data exists with defaults
  const safeData = data || { componentHeading: '', services: [] };
  const services = safeData.services || [];
  const componentHeading = safeData.componentHeading || '';

  const updateComponentHeading = (value) => {
    onDataChange({ ...safeData, componentHeading: value });
  };

  const updateService = (index, field, value) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, services: updated });
  };

  const addNewService = () => {
    const newService = {
      serviceHeading: 'New Service',
      serviceOpenPara1: '',
      serviceOpenPara2: '',
    };
    onDataChange({ ...safeData, services: [...services, newService] });
  };

  const removeService = (index) => {
    const updated = services.filter((_, i) => i !== index);
    onDataChange({ ...safeData, services: updated });
  };

  return (
    <section className="max-w-[1600px] m-auto overflow-hidden" id="services">
      <div className='w-[95%] m-auto'>
      <h1 className="font-[Raleway] smallShadow lg:textShadow text-black text-3xl sm:text-4xl lg:text-6xl mt-10 lg:mt-30 text-center">
        <EditableText
          value={componentHeading}
          onChange={updateComponentHeading}
          tag="span"
          className="block"
        />
      </h1>

      <div className="mt-12">
        {services.map((item, index) => {
            return (
              <div key={index} className="mb-8">
                {/* Service Header - Always visible */}
                <div className="border-1 border-[#ed7d7d] w-full h-21 sm:h-25 rounded-2xl flex justify-between items-center mt-12 shadow-lg bg-white">
                  <div className="flex-1 ml-6 lg:ml-12">
                    <EditableText
                      value={item.serviceHeading || ''}
                      onChange={(value) => updateService(index, 'serviceHeading', value)}
                      tag="h1"
                      className="text-lg sm:text-3xl lg:text-4xl font-[Raleway]"
                    />
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeService(index)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>

                {/* Expanded Content - Always visible in CMS */}
                <div className="max-h-[1000px] opacity-100 mt-2">
                  <div className="bg-[#EC7979] rounded-2xl p-4 sm:p-10">
                    <div className="mb-4">
                      <label className="text-white text-sm font-semibold mb-2 block">
                        Paragraph 1:
                      </label>
                      <EditableText
                        value={item.serviceOpenPara1 || ''}
                        onChange={(value) => updateService(index, 'serviceOpenPara1', value)}
                        multiline={true}
                        className="text-white text-base sm:text-lg bg-[#F05A5A] p-3 rounded w-full min-h-[100px]"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="text-white text-sm font-semibold mb-2 block">
                        Paragraph 2:
                      </label>
                      <EditableText
                        value={item.serviceOpenPara2 || ''}
                        onChange={(value) => updateService(index, 'serviceOpenPara2', value)}
                        multiline={true}
                        className="text-white text-base sm:text-lg bg-[#F05A5A] p-3 rounded w-full min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add New Service Button */}
          <div className="flex justify-center items-center mt-6">
            <button
              onClick={addNewService}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
            >
              + Add New Service
            </button>
          </div>

          {/* Get Started Button - Same as public site */}
          <div className="flex justify-center items-center mt-10">
            <button
              className="bg-[#EC7979] text-sm sm:text-lg p-3 rounded-4xl px-12 font-semibold hover:text-white 
                hover:bg-[#F05A5A] flex items-center"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditableServices;

