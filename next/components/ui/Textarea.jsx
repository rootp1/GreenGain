"use client";
import React from 'react';

const Textarea = ({ 
  label, 
  id, 
  value, 
  onChange, 
  placeholder = '', 
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  containerClassName = '',
  ...props 
}) => {
  const baseTextareaClasses = "w-full resize-none rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:bg-gray-100 disabled:cursor-not-allowed";
  
  const textareaClasses = `${baseTextareaClasses} ${className}`.trim();
  const containerClasses = `space-y-1 ${containerClassName}`.trim();

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
    </div>
  );
};

export default Textarea;
