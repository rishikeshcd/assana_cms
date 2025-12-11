import axios from 'axios';

// CMS API service - points to local backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  // baseURL: import.meta.env.VITE_API_BASE_URL || "https://assana-backend-rqkg.onrender.com/api",
  withCredentials: false,
  timeout: 20000,
});

// Helper functions for CMS
export const getSection = async (page, section) => {
  const response = await api.get(`/${page}/${section}`);
  return response.data;
};

export const updateSection = async (page, section, data) => {
  const response = await api.put(`/${page}/${section}`, data);
  return response.data;
};

/**
 * Upload image directly to Cloudinary from client (bypasses backend)
 * Uploads to temp-uploads folder, then backend moves to permanent folder on save
 */
export const uploadImageDirect = async (file, options = {}) => {
  try {
    // Get upload configuration from backend
    const configResponse = await api.get('/uploads/config');
    const { cloudName, uploadPreset, apiKey, timestamp, signature, folder } = configResponse.data;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder || 'temp-uploads');
    
    // Use unsigned upload if preset is available (simpler)
    if (uploadPreset) {
      formData.append('upload_preset', uploadPreset);
    } else {
      // Use signed upload
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp);
      formData.append('signature', signature);
    }
    
    // Upload directly to Cloudinary
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const response = await axios.post(cloudinaryUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 300000, // 5 minutes for large files
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`);
          if (options.onProgress) {
            options.onProgress(percentCompleted);
          }
        }
      },
    });
    
    return {
      url: response.data.secure_url,
      publicId: response.data.public_id,
      filename: response.data.public_id,
      originalName: file.name,
      size: response.data.bytes,
      storage: 'cloudinary',
      isTemp: true, // Always temp for direct uploads
    };
  } catch (error) {
    console.error('Direct Cloudinary upload error:', error);
    throw error;
  }
};

/**
 * Finalize image: Move from temp-uploads to permanent folder
 * Call this when saving the form/page
 */
export const finalizeImage = async (tempUrl, oldUrl = null, permanentFolder = 'assana-uploads') => {
  const response = await api.post('/uploads/finalize', {
    tempUrl,
    oldUrl,
    permanentFolder,
  });
  return response.data;
};

/**
 * Legacy backend-proxied upload (kept for fallback if needed)
 */
export const uploadImage = async (file, options = {}) => {
  const isTemp = options.temp !== false; // Default to true unless explicitly false
  
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post(`/uploads${isTemp ? '?temp=true' : ''}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    timeout: 120000, // 2 minutes timeout
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(`Upload progress: ${percentCompleted}%`);
        if (options.onProgress) {
          options.onProgress(percentCompleted);
        }
      }
    },
  });
  
  return response.data;
};

export default api;

