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

