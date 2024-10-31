import React, { useState, useRef } from 'react';
import { Mic, Camera, X, Loader2 } from 'lucide-react';
import { createWorker } from 'tesseract.js';

interface InputMethodsProps {
  onProcessText: (text: string) => void;
}

export function InputMethods({ onProcessText }: InputMethodsProps) {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');

        if (event.results[0].isFinal) {
          onProcessText(transcript);
          setIsListening(false);
          recognition.stop();
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        recognition.stop();
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(file);
      await worker.terminate();
      onProcessText(text);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    }
    setIsProcessing(false);
  };

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={startListening}
        className={`
          p-3 rounded-lg flex items-center gap-2 transition-all shadow-sm
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-blue-600 hover:bg-blue-700'
          } 
          text-white font-medium
        `}
        title={isListening ? 'Stop Recording' : 'Start Voice Input'}
      >
        {isListening ? (
          <>
            <X className="w-5 h-5" />
            <span>Stop</span>
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            <span>Voice Input</span>
          </>
        )}
      </button>

      <button
        onClick={() => fileInputRef.current?.click()}
        className="p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
        disabled={isProcessing}
        title="Upload Image"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Camera className="w-5 h-5" />
            <span>Image Upload</span>
          </>
        )}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}