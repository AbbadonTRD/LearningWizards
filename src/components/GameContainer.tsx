import React, { useState, useEffect } from 'react';
import { Stars } from '../Stars';

interface DialogScreenProps {
  playerName: string;
  onComplete: () => void;
}

const DialogScreen: React.FC<DialogScreenProps> = ({ playerName, onComplete }) => {
  const [currentDialog, setCurrentDialog] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isTextComplete, setIsTextComplete] = useState(false);

  const dialogs = [
    `Welcome to LEARNING WIZARD, ${playerName}!\nI am so excited to be your teacher this year! Let me tell you a little bit about me. When I'm not in the classroom, you'll often find me hiking, exploring new cafes, or curled up with a good book. I'm excited to get to know each of you and learn together this year!`,
    `This course is designed to develop your reading, writing, and critical thinking skills for the upcoming ABU SCHWEIZ UND POLITIK EXAM, you will read theorie inputs and defeat the evil hazards younglings with solving the Exercises that follow. With enough points you get to fight the evil hazard himself`,
    `Are you ready to begin your journey, ${playerName}? The fate of our world rests in your hands!`
  ];

  useEffect(() => {
    if (isTyping && !isTextComplete) {
      const text = dialogs[currentDialog];
      let currentIndex = 0;

      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsTextComplete(true);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [currentDialog, isTyping, isTextComplete]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Enter') {
        if (isTyping && !isTextComplete) {
          setIsTyping(false);
          setDisplayText(dialogs[currentDialog]);
          setIsTextComplete(true);
        } else {
          if (currentDialog < dialogs.length - 1) {
            setCurrentDialog(prev => prev + 1);
            setIsTyping(true);
            setIsTextComplete(false);
            setDisplayText('');
          } else {
            onComplete();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentDialog, isTyping, isTextComplete, onComplete]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
      <div className="absolute top-4 left-4 pixel-text text-sm text-gray-500">
        SOUND: *ON*
      </div>
      <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg border-2 border-white/20 w-[800px] relative z-10">
        <div className="text-white pixel-text h-[200px] overflow-hidden">
          <p className="whitespace-pre-line leading-relaxed">
            {displayText}
          </p>
        </div>
        <p className="text-sm text-white/70 mt-8 pixel-text animate-pulse text-center">
          Press ENTER to {isTyping && !isTextComplete ? 'show all' : 'continue'}...
        </p>
      </div>
    </div>
  );
};

interface GameContainerProps {
  onComplete: () => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ onComplete }) => {
  // For now, we'll use a hardcoded player name
  // In a full implementation, this would come from user input
  const playerName = "Adventurer";

  return <DialogScreen playerName={playerName} onComplete={onComplete} />;
};

export default GameContainer;