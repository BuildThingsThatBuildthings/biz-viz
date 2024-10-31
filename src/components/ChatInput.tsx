import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { InputMethods } from './InputMethods';

interface ChatInputProps {
  onProcessText: (text: string) => void;
}

export function ChatInput({ onProcessText }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onProcessText(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6">
        <label className="block text-base font-medium text-gray-700 mb-3">
          Describe your process naturally
        </label>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 px-4 py-3 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Example: Start with user login. If credentials are valid, proceed to dashboard. Otherwise, show error message. Finally, log the activity."
          />
          <button
            type="submit"
            className="absolute bottom-3 right-3 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Use natural language with keywords like "if/then" for decisions, "start/end" for terminus points, and "output/deliver" for deliverables.
        </p>
      </form>
      
      <div className="border-t border-gray-100 bg-gray-50 p-4">
        <InputMethods onProcessText={onProcessText} />
      </div>
    </div>
  );
}