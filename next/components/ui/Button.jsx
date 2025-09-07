"use client";
import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = "font-semibold shadow transition disabled:cursor-not-allowed disabled:bg-gray-400";
  
  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-500 text-white hover:bg-red-600",
    dark: "bg-black text-white hover:bg-neutral-800"
  };
  
  const sizeClasses = {
    small: "px-3 py-1 text-sm rounded-md",
    medium: "px-6 py-2 text-sm rounded-full",
    large: "px-6 py-3 text-base rounded-full",
    full: "w-full px-6 py-3 text-base rounded-full"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
