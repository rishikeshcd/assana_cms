import React, { useState, useRef, useEffect } from 'react';
import { uploadImage } from '../../services/api';

/**
 * EditableImage - Component for editing background images or regular images
 * Shows edit button overlay, opens file picker, uploads, and updates
 */
const EditableImage = ({ 
  imageUrl, 
  onChange, // Changed from onSave to onChange for manual save
  className = '',
  isBackground = false,
  alt = 'Editable image',
  children,
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(imageUrl);
  const [localPreviewUrl, setLocalPreviewUrl] = useState(null); // Temporary local preview
  const fileInputRef = useRef(null);
  const localUrlRef = useRef(null); // To track and cleanup object URLs

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  // Cleanup local preview URL on unmount or when new image is set
  useEffect(() => {
    return () => {
      if (localUrlRef.current) {
        URL.revokeObjectURL(localUrlRef.current);
        localUrlRef.current = null;
      }
    };
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Clean up previous local URL if exists
    if (localUrlRef.current) {
      URL.revokeObjectURL(localUrlRef.current);
    }

    // Create instant local preview
    const localUrl = URL.createObjectURL(file);
    localUrlRef.current = localUrl;
    setLocalPreviewUrl(localUrl);
    setPreviewUrl(localUrl); // Show preview immediately
    
    // Update parent immediately with local preview for instant display
    if (onChange) {
      onChange(localUrl); // Temporary local URL - shows instantly
    }

    setUploading(true);

    try {
      // Upload to Cloudinary in the background
      const result = await uploadImage(file);
      
      // Clean up local preview URL
      if (localUrlRef.current) {
        URL.revokeObjectURL(localUrlRef.current);
        localUrlRef.current = null;
      }
      
      // Replace with Cloudinary URL
      setLocalPreviewUrl(null);
      setPreviewUrl(result.url);
      
      // Update parent with final Cloudinary URL
      if (onChange) {
        onChange(result.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      
      // Clean up local preview URL on error
      if (localUrlRef.current) {
        URL.revokeObjectURL(localUrlRef.current);
        localUrlRef.current = null;
      }
      
      // Revert to original image on error
      setLocalPreviewUrl(null);
      setPreviewUrl(imageUrl);
      
      // Revert parent to original URL
      if (onChange) {
        onChange(imageUrl);
      }
      
      // Provide specific error messages
      let errorMessage = 'Failed to upload image. Please try again.';
      if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
        errorMessage = 'Upload timeout. The image may be too large or your connection is slow. Please try again with a smaller image or check your internet connection.';
      } else if (error.response?.data?.error) {
        errorMessage = `Upload failed: ${error.response.data.error}`;
      } else if (error.message) {
        errorMessage = `Upload failed: ${error.message}`;
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // For background images, this is just an overlay for editing
  // The actual background is set by the parent div
  return (
    <div
      className={`relative ${className} ${isBackground ? '' : ''}`}
      style={isBackground ? { width: '100%', height: '100%', pointerEvents: 'auto' } : {}}
    >
      {/* Only render image if no children provided and not background */}
      {!isBackground && (localPreviewUrl || previewUrl) && !children && (
        <img
          src={localPreviewUrl || previewUrl}
          alt={alt}
          className="w-full h-full object-cover"
        />
      )}
      
      {/* Render children if provided */}
      {children}

      {/* Edit overlay button - Always visible for background images, hover for regular images */}
      <div
        onClick={handleImageClick}
        className={`absolute top-0 left-0 bg-blue-500 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors z-50 flex items-center gap-2 shadow-lg pointer-events-auto text-xs ${
          isBackground ? 'opacity-90 hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        {uploading ? (
          <>
            <span className="animate-spin">⏳</span>
            <span>Uploading...</span>
          </>
        ) : (
          <>
            <span className="text-sm">📷</span>
            <span>{isBackground ? 'Change Background' : 'Change Image'}</span>
          </>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default EditableImage;
