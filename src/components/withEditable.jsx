import React from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

/**
 * Higher-order component that wraps any component with editing capabilities
 * Replaces text nodes and images with editable versions
 */
export const withEditable = (Component, editableFields = {}) => {
  return ({ data, onDataChange, ...props }) => {
    // This is a simplified version - in practice, you'd need to recursively
    // replace text nodes and images in the component tree
    // For now, we'll use a different approach - pass data and let components handle it
    return <Component {...props} data={data} />;
  };
};

/**
 * Wrapper component that adds editing overlays to any component
 */
export const EditableWrapper = ({ 
  children, 
  onSave, 
  saving = false,
  sectionName = 'Section'
}) => {
  return (
    <div className="relative group">
      {children}
      
      {/* Save Button */}
      <div className="absolute top-4 right-4 z-[9999]">
        <button
          onClick={onSave}
          disabled={saving}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-lg"
        >
          {saving ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Saving...</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>Save {sectionName}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};


