"use client";
import React from 'react';
import { Input, Textarea, Button } from '../ui';

const FormField = ({ children, className = '' }) => {
  return <div className={`space-y-1 ${className}`}>{children}</div>;
};

const FormGrid = ({ children, cols = 2, className = '' }) => {
  const gridClasses = {
    1: 'grid gap-4',
    2: 'grid gap-4 md:grid-cols-2',
    3: 'grid gap-4 md:grid-cols-2 lg:grid-cols-3',
  };

  return (
    <div className={`${gridClasses[cols]} ${className}`}>
      {children}
    </div>
  );
};

const FormSection = ({ title, children, className = '' }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {children}
    </div>
  );
};

const TreeDetailsForm = ({
  date,
  setDate,
  treeName,
  setTreeName,
  climate,
  setClimate,
  soilType,
  setSoilType,
  description,
  setDescription,
  onSubmit,
  loading = false,
}) => {
  return (
    <FormSection title="Tree Details">
      <FormGrid cols={2}>
        <Input
          label="Date"
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <Input
          label="Tree Name"
          id="tree-name"
          value={treeName}
          onChange={(e) => setTreeName(e.target.value)}
          placeholder="Enter tree name"
          required
        />
        <Input
          label="Climate"
          id="climate"
          value={climate}
          onChange={(e) => setClimate(e.target.value)}
          placeholder="Climate"
        />
        <Input
          label="Soil Type"
          id="soil-type"
          value={soilType}
          onChange={(e) => setSoilType(e.target.value)}
          placeholder="Soil type"
        />
        <Textarea
          label="Description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          containerClassName="md:col-span-2"
          className="h-28"
        />
      </FormGrid>
      <Button
        onClick={onSubmit}
        size="full"
        disabled={loading}
        className="mt-5"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </FormSection>
  );
};

export { FormField, FormGrid, FormSection, TreeDetailsForm };
