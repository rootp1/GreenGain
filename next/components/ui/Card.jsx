"use client";
import React from 'react';

const Card = ({ 
  children, 
  variant = 'default', 
  padding = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = "bg-white shadow rounded-xl";
  
  const variantClasses = {
    default: "",
    neutral: "bg-neutral-100",
    green: "bg-green-50 border border-green-200",
    amber: "bg-amber-50"
  };
  
  const paddingClasses = {
    none: "",
    small: "p-3",
    medium: "p-4",
    large: "p-6"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
