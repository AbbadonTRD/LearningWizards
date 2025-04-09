import React, { useState } from 'react';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-8 rounded-lg border-2 border-white/20 max-w-md w-full">
        <h2 className="text-xl sm:text-2xl mb-6 pixel-text text-center text-white">ENTER YOUR NAME, BRAVE ONE</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border-2 border-white/50 text-white pixel-text focus:border-white/80 focus:outline-none transition-colors"
            placeholder="Enter your name..."
          />
          <button
            type="submit"
            className="w-full bg-green-500/80 hover:bg-green-500 px-4 py-2 pixel-text text-white transition-colors"
          >
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInput