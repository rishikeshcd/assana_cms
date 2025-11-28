import React from 'react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

/**
 * EditableComponentWrapper - Wraps public components to make them editable
 * Replaces text nodes and images with editable versions
 */
const EditableComponentWrapper = ({ 
  children, 
  data, 
  onDataChange,
  editableFields = {} // Map of field names to editable components
}) => {
  // Clone children and replace editable elements
  const makeEditable = (child) => {
    if (!child) return child;
    
    if (typeof child === 'string') {
      // If it's a string and matches a field, make it editable
      const field = Object.keys(editableFields).find(f => child.includes(data?.[f]));
      if (field) {
        return (
          <EditableText
            value={data[field]}
            onChange={(value) => onDataChange({ ...data, [field]: value })}
          />
        );
      }
      return child;
    }
    
    if (React.isValidElement(child)) {
      // Clone element and process children
      return React.cloneElement(
        child,
        child.props,
        React.Children.map(child.props.children, makeEditable)
      );
    }
    
    return child;
  };

  return <>{React.Children.map(children, makeEditable)}</>;
};

export default EditableComponentWrapper;


