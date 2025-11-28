import React, { useState, useRef, useEffect } from 'react';

/**
 * EditableText - Inline editable text component
 * Click to edit, NO auto-save (requires manual save button)
 */
const EditableText = ({ 
  value, 
  onChange, // Changed from onSave to onChange for manual save
  className = '', 
  tag: Tag = 'span',
  placeholder = 'Click to edit...',
  multiline = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const inputRef = useRef(null);

  useEffect(() => {
    setEditValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (multiline) {
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (newValue) => {
    setEditValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setEditValue(value || '');
      setIsEditing(false);
    }
    // Removed auto-save on Enter
  };

  const handleBlur = () => {
    // Don't auto-save, just exit edit mode
    setIsEditing(false);
  };

  if (isEditing) {
    if (multiline) {
      return (
        <textarea
          ref={inputRef}
          value={editValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} border-2 border-blue-500 rounded px-2 py-1 min-h-[60px] w-full`}
          placeholder={placeholder}
        />
      );
    }
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`${className} border-2 border-blue-500 rounded px-2 py-1`}
        placeholder={placeholder}
      />
    );
  }

  return (
    <Tag
      onClick={handleClick}
      className={`${className} cursor-pointer hover:bg-blue-100 px-1 rounded relative group`}
    >
      {value || <span className="text-gray-400 italic">{placeholder}</span>}
      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        ✏️
      </span>
    </Tag>
  );
};

export default EditableText;
