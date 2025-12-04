import React from 'react';

/**
 * EditableSection - Wrapper that adds a Save button to any section
 */
const EditableSection = ({ 
  children, 
  onSave, 
  saving = false,
  sectionName = 'Section'
}) => {
  return (
    <div className="relative group">
      {/* Save Button - Sticky at top-right of viewport */}
      <div className="sticky top-20 z-[9999] flex justify-end mb-4" style={{ marginTop: '-1rem' }}>
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
      
      {children}
    </div>
  );
};

export default EditableSection;
