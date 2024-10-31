import React from 'react';
import { ArrowDown } from 'lucide-react';

type StepType = 'terminus' | 'process' | 'decision' | 'deliverable';

interface ProcessStepProps {
  type: StepType;
  text: string;
  index: number;
  isLast: boolean;
}

const shapeStyles = {
  terminus: 'rounded-full w-32 sm:w-48 h-32 sm:h-48',
  process: 'rounded-lg w-48 sm:w-64 h-24 sm:h-32',
  decision: 'rotate-45 w-32 sm:w-48 h-32 sm:h-48',
  deliverable: 'w-48 sm:w-64 h-24 sm:h-32 skew-x-12'
};

const containerStyles = {
  terminus: 'bg-emerald-50 border-2 border-emerald-500 text-emerald-700 shadow-emerald-100',
  process: 'bg-blue-50 border-2 border-blue-500 text-blue-700 shadow-blue-100',
  decision: 'bg-amber-50 border-2 border-amber-500 text-amber-700 shadow-amber-100',
  deliverable: 'bg-purple-50 border-2 border-purple-500 text-purple-700 shadow-purple-100'
};

export function ProcessStep({ type, text, index, isLast }: ProcessStepProps) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className={`
        relative flex items-center justify-center p-6 sm:p-8
        ${containerStyles[type]} 
        ${shapeStyles[type]}
        shadow-lg transition-all duration-300
        hover:scale-105 hover:shadow-xl
        group
      `}>
        <div className={`
          ${type === 'decision' ? '-rotate-45' : ''} 
          text-sm sm:text-base font-medium text-center
          transition-all duration-300
          group-hover:scale-105
        `}>
          {text}
        </div>
      </div>
      {!isLast && (
        <div className="h-12 sm:h-16 flex items-center justify-center">
          <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 animate-bounce" />
        </div>
      )}
    </div>
  );
}