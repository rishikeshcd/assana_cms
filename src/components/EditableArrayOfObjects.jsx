import React, { useState, useEffect } from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

/**
 * EditableArrayOfObjects - Component for editing arrays of objects (e.g., testimonials, FAQs, services)
 * Supports add, remove, and inline editing of object fields
 */
const EditableArrayOfObjects = ({ 
  items = [], 
  onSave, 
  fields = [], // Array of { key, label, type: 'text' | 'textarea' | 'image' }
  className = '',
  addButtonText = '+ Add Item',
}) => {
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleFieldSave = (index, fieldKey, value) => {
    const updated = [...localItems];
    if (!updated[index]) {
      updated[index] = {};
    }
    updated[index][fieldKey] = value;
    setLocalItems(updated);
    if (onSave) {
      onSave(updated);
    }
  };

  const handleAdd = () => {
    const newItem = {};
    fields.forEach(field => {
      newItem[field.key] = '';
    });
    const updated = [...localItems, newItem];
    setLocalItems(updated);
    if (onSave) {
      onSave(updated);
    }
  };

  const handleRemove = (index) => {
    const updated = localItems.filter((_, i) => i !== index);
    setLocalItems(updated);
    if (onSave) {
      onSave(updated);
    }
  };

  return (
    <div className={className}>
      {localItems.map((item, index) => (
        <div key={index} className="border border-gray-300 rounded p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">Item {index + 1}</h4>
            <button
              onClick={() => handleRemove(index)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
          {fields.map(field => (
            <div key={field.key} className="mb-3">
              <label className="block text-sm font-medium mb-1">{field.label}</label>
              {field.type === 'image' ? (
                <EditableImage
                  imageUrl={item[field.key] || ''}
                  onSave={(url) => handleFieldSave(index, field.key, url)}
                  className="w-full h-32 border border-gray-300 rounded"
                />
              ) : field.type === 'textarea' ? (
                <EditableText
                  value={item[field.key] || ''}
                  onSave={(value) => handleFieldSave(index, field.key, value)}
                  className="w-full"
                  multiline={true}
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
              ) : (
                <EditableText
                  value={item[field.key] || ''}
                  onSave={(value) => handleFieldSave(index, field.key, value)}
                  className="w-full"
                  placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={handleAdd}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        {addButtonText}
      </button>
    </div>
  );
};

export default EditableArrayOfObjects;

