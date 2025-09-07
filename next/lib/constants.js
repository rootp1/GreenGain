// Image paths
export const IMAGES = {
  PERSON: '/images/person.png',
  MANGO_TREE: '/images/MangoTree.jpg',
  TROPHY: '/images/trophy.png',
  HOME: '/images/home.png',
  TREE: '/images/tree.png',
  SUN: '/images/sun.png',
};

// Common messages
export const MESSAGES = {
  LOADING: 'Loading...',
  ERROR_GENERIC: 'Something went wrong. Please try again.',
  SUCCESS_UPLOAD: 'Image uploaded successfully!',
  ERROR_UPLOAD: 'Upload failed',
  ERROR_NO_IMAGE: 'Please select an image!',
  SUCCESS_SUBMIT: 'Tree data submitted successfully!',
  ERROR_SUBMIT: 'Failed to submit tree data!',
};

// API endpoints
export const API_ENDPOINTS = {
  UPLOAD: '/upload',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    CHECK: '/auth/checkauth',
    UPDATE: '/auth/update',
  },
  TREE: {
    GET: '/tree/gettree',
    CREATE: '/tree',
  },
  QUEST: {
    GET: '/quest',
    CLAIM: '/quest/claim',
  },
  PREDICT: '/predict',
};

// Form validation
export const VALIDATION = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  USERNAME_MIN_LENGTH: 'Username must be at least 3 characters',
};
