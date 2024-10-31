import React, { useState } from 'react';
import { Share2, MessageSquare, ListPlus } from 'lucide-react';
import { ProcessStep } from './components/ProcessStep';
import { StepForm } from './components/StepForm';
import { ChatInput } from './components/ChatInput';
import { parseProcessText } from './utils/processParser';

interface Step {
  type: 'terminus' | 'process' | 'decision' | 'deliverable';
  text: string;
}

function App() {
  const [steps, setSteps] = useState<Step[]>([
    { type: 'terminus', text: 'Start' }
  ]);
  const [inputMode, setInputMode] = useState<'form' | 'chat'>('chat');

  const handleAddStep = (type: string, text: string) => {
    setSteps([...steps, { 
      type: type as Step['type'], 
      text 
    }]);
  };

  const handleProcessText = (text: string) => {
    const parsedSteps = parseProcessText(text);
    setSteps(parsedSteps);
  };

  const handleReset = () => {
    setSteps([{ type: 'terminus', text: 'Start' }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto py-6 px-4 sm:py-12 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <Share2 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
              Process Mapper
            </h1>
            <p className="mt-2 text-base sm:text-lg text-gray-600">
              Design beautiful process flows using text, voice, or images
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setInputMode('form')}
              className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm ${
                inputMode === 'form'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <ListPlus className="w-5 h-5" />
              <span>Form Input</span>
            </button>
            <button
              onClick={() => setInputMode('chat')}
              className={`px-4 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm ${
                inputMode === 'chat'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Natural Input</span>
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-all shadow-sm"
            >
              Reset Flow
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {inputMode === 'form' ? (
            <StepForm onAddStep={handleAddStep} />
          ) : (
            <ChatInput onProcessText={handleProcessText} />
          )}

          <div className="bg-white p-6 sm:p-10 rounded-xl shadow-xl border border-gray-100">
            <div className="flex flex-col items-center space-y-6 min-w-[280px]">
              {steps.map((step, index) => (
                <ProcessStep
                  key={index}
                  type={step.type}
                  text={step.text}
                  index={index}
                  isLast={index === steps.length - 1}
                />
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-blue-900 mb-2">Process Step Types:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                <span className="text-sm text-gray-600">Terminus (Start/End)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500"></div>
                <span className="text-sm text-gray-600">Process</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rotate-45 bg-amber-500"></div>
                <span className="text-sm text-gray-600">Decision</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 skew-x-12 bg-purple-500"></div>
                <span className="text-sm text-gray-600">Deliverable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;