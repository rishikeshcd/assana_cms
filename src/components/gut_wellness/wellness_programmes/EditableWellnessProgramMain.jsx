import React from 'react';
import EditableText from '../../common/EditableText';
import EditableImage from '../../common/EditableImage';

/**
 * EditableWellnessProgrammesMain
 * CMS wrapper for WellnessProgrammesMain
 */
const EditableWellnessProgrammesMain = ({ data, onDataChange, onSave }) => {
  const safeData = data || {
    mainTitle: 'All you need to know..',
    services: [],
  };

  const services = safeData.services || [];

  // Update a service field
  const updateService = (index, field, value) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    onDataChange({ ...safeData, services: updated });
  };

  // Add new service
  const addService = () => {
    const newService = {
      serviceName: '',
      serviceDescription: '',
      serviceImage: '',
    };
    onDataChange({ ...safeData, services: [...services, newService] });
  };

  // Remove service
  const removeService = async (index) => {
    const updated = services.filter((_, i) => i !== index);
    const newData = { ...safeData, services: updated };
    onDataChange(newData);

    // Auto-save after delete (important for Cloudinary cleanup)
    if (onSave) {
      await onSave(newData);
    }
  };

  return (
    <div className="bg-white py-12 md:py-16 lg:p-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-16 space-y-12">

        {/* Main Title */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-[Raleway] font-semibold">
            <EditableText
              value={safeData.mainTitle}
              onChange={(value) => onDataChange({ ...safeData, mainTitle: value })}
              tag="span"
              placeholder="Main Title"
            />
          </h2>
        </div>

        {/* Services */}
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-[#F9FAFB] rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 p-6 md:p-8 lg:p-10 items-center">

              {/* Image */}
              <div className="relative h-[300px] md:h-[400px]">
                {service.serviceImage ? (
                  <img
                    src={service.serviceImage}
                    alt={service.serviceName || ''}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}

                <EditableImage
                  imageUrl={service.serviceImage}
                  onChange={(url) => updateService(index, 'serviceImage', url)}
                  className="absolute inset-0 w-full h-full"
                  isBackground
                />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl md:text-2xl font-[Raleway] font-semibold mb-4">
                  <EditableText
                    value={service.serviceName || ''}
                    onChange={(value) => updateService(index, 'serviceName', value)}
                    tag="span"
                    placeholder="Service Name"
                  />
                </h3>

                <div className="text-base md:text-lg font-[Raleway] text-gray-700 leading-relaxed">
                  <EditableText
                    value={service.serviceDescription || ''}
                    onChange={(value) => updateService(index, 'serviceDescription', value)}
                    multiline
                    tag="div"
                    placeholder="Service description..."
                    className="whitespace-pre-line"
                  />
                </div>
              </div>
            </div>

            {/* Remove service */}
            <div className="px-6 pb-4 text-right">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to remove this service?')) {
                    removeService(index);
                  }
                }}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove Service
              </button>
            </div>
          </div>
        ))}

        {/* Add Service */}
        <div className="text-center">
          <button
            onClick={addService}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            + Add New Service
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditableWellnessProgrammesMain;
