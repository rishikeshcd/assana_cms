import React, { useState, useEffect } from 'react';
import EditableText from './EditableText';

/**
 * EditableList - Component for editing arrays of strings
 * Supports add, remove, reorder, and inline editing
 */
const EditableList = ({ 
  items = [], 
  onSave, 
  className = '',
  itemClassName = '',
  addButtonText = '+ Add Item',
  placeholder = 'New item',
}) => {
  const [localItems, setLocalItems] = useState(items);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const handleItemSave = (index, newValue) => {
    const updated = [...localItems];
    updated[index] = newValue;
    setLocalItems(updated);
    // Note: onSave is called here for auto-save, but we're using onChange pattern
    // So this component should use onChange instead
  };

  const handleAdd = () => {
    const updated = [...localItems, ''];
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

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updated = [...localItems];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setLocalItems(updated);
    if (onSave) {
      onSave(updated);
    }
  };

  const handleMoveDown = (index) => {
    if (index === localItems.length - 1) return;
    const updated = [...localItems];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setLocalItems(updated);
    if (onSave) {
      onSave(updated);
    }
  };

  return (
    <div className={className}>
      {localItems.map((item, index) => (
        <div key={index} className={`flex items-center gap-2 mb-2 ${itemClassName}`}>
          <EditableText
            value={item}
            onSave={(value) => handleItemSave(index, value)}
            className="flex-1"
            placeholder={placeholder}
          />
          <button
            onClick={() => handleMoveUp(index)}
            disabled={index === 0}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Move up"
          >
            ↑
          </button>
          <button
            onClick={() => handleMoveDown(index)}
            disabled={index === localItems.length - 1}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Move down"
          >
            ↓
          </button>
          <button
            onClick={() => handleRemove(index)}
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            title="Remove"
          >
            ×
          </button>
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

export default EditableList;

