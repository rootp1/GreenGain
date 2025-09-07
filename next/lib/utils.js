import { clsx } from 'clsx';

// Utility function to combine class names (similar to clsx but lightweight)
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

// Handle API errors consistently
export const handleApiError = (error, fallbackMessage = 'Something went wrong') => {
  return error.response?.data?.message || error.message || fallbackMessage;
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Generate safe filenames
export const generateSafeFilename = (originalName, fallback = 'file.jpg') => {
  if (!originalName) return fallback;
  return originalName.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
};

// Format location for display
export const formatLocation = (location) => {
  if (!location) return '';
  return `Lat ${location.latitude.toFixed(4)}, Lng ${location.longitude.toFixed(4)}`;
};

// Compress and convert image to base64
export const processImageFile = async (file, options = {}) => {
  const defaultOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    ...options
  };

  const imageCompression = (await import('browser-image-compression')).default;
  const compressedFile = await imageCompression(file, defaultOptions);
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      resolve({ base64, compressedFile });
    };
    reader.onerror = reject;
    reader.readAsDataURL(compressedFile);
  });
};
