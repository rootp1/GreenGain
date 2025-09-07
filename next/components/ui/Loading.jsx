"use client";
import React from 'react';

const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-green-600 ${sizeClasses[size]} ${className}`} />
  );
};

const Loading = ({ 
  text = 'Loading...', 
  centered = true, 
  size = 'medium',
  className = '' 
}) => {
  const containerClasses = centered 
    ? `flex flex-col items-center justify-center space-y-2 ${className}` 
    : `flex items-center space-x-2 ${className}`;

  return (
    <div className={containerClasses}>
      <LoadingSpinner size={size} />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
};

export default Loading;
export { LoadingSpinner };
