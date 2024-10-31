import React, { useState } from 'react';

interface StepFormProps {
  onAddStep: (type: string, text: string) => void;
}

export function StepForm({ onAddStep }: StepFormProps) {
  const [stepType, setStepType] = useState('process');
  const [stepText, setStepText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stepText.trim()) {
      onAddStep(stepType, stepText);
      setStepText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      <div className="grid sm:grid-cols-8 gap-4">
        <div className="sm:col-span-2">
          <label htmlFor="stepType" className="block text-sm font-medium text-gray-700 mb-2">
            Step Type
          </label>
          <select
            id="stepType"
            value={stepType}
            onChange={(e) => setStepType(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 py-2.5 px-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="terminus">Terminus</option>
            <option value="process">Process</option>
            <option value="decision">Decision</option>
            <option value="deliverable">Deliverable</option>
          </select>
        </div>
        <div className="sm:col-span-4">
          <label htmlFor="stepText" className="block text-sm font-medium text-gray-700 mb-2">
            Step Description
          </label>
          <input
            type="text"
            id="stepText"
            value={stepText}
            onChange={(e) => setStepText(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 py-2.5 px-3 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Enter step description"
          />
        </div>
        <div className="sm:col-span-2 flex items-end">
          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm font-medium"
          >
            Add Step
          </button>
        </div>
      </div>
    </form>
  );
}