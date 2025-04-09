import React, { useState, useEffect, useRef } from 'react';
import { Stars } from '../Stars';
import SoundToggle from '../SoundToggle';
import { Howl } from 'howler';
import { useAudio } from '../../hooks/useAudio'; 

interface DialogScreenProps {
  playerName: string;
  onComplete: () => void;
}

const CHARS_PER_SECOND = 20;

const DialogScreen: React.FC<DialogScreenProps> = ({
  playerName,
  onComplete,
}) => {
  const { isPlaying } = useAudio();
  const [currentDialog, setCurrentDialog] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isTextComplete, setIsTextComplete] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);
  const textLengthRef = useRef<number>(0);

  const dialogs = [
    `Willkommen bei Duneify, ${playerName}!\nIch freue mich sehr, dieses Jahr In Wizard Learning zu begrüssen!
    Dieser Kurs wurde entwickelt, um Ihre Lese-, Schreib- und kritischen Denkfähigkeiten für die kommende ABU SCHWEIZ UND POLITIK Prüfung zu entwickeln.
     
    Sind Sie bereit, Ihre Reise zu beginnen, ${playerName}? Das Schicksal unserer Welt liegt in Ihren Händen!`,
  ];

  // Initialize sound
  useEffect(() => {
    soundRef.current = new Howl({
      src: ['/sounds/AnimalCrossingTalking.mp3'],
      volume: 0.5,
      rate: 1.0,
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.stop();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const startTypewriterAnimation = () => {
    const text = dialogs[currentDialog];
    textLengthRef.current = text.length;
    startTimeRef.current = performance.now();
    
    if (soundRef.current && isPlaying) {
      soundRef.current.play();
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed * (CHARS_PER_SECOND / 1000), textLengthRef.current);
      
      setDisplayText(text.slice(0, Math.floor(progress)));

      if (progress < textLengthRef.current && isTyping) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsTextComplete(true);
        if (soundRef.current && isPlaying) {
          soundRef.current.stop();
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const skipAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (soundRef.current) {
      soundRef.current.stop();
    }
    setDisplayText(dialogs[currentDialog]);
    setIsTextComplete(true);
    setIsTyping(false);
  };

  const handleAdvanceDialog = () => {
    if (isTyping && !isTextComplete) {
      skipAnimation();
    } else {
      if (currentDialog < dialogs.length - 1) {
        if (soundRef.current) soundRef.current.stop();
        setCurrentDialog((prev) => prev + 1);
        setIsTyping(true);
        setIsTextComplete(false);
        setDisplayText('');
      } else {
        onComplete();
      }
    }
  };

  useEffect(() => {
    if (isTyping && !isTextComplete) {
      startTypewriterAnimation();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentDialog, isTyping, isTextComplete]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.code === 'Enter') {
        handleAdvanceDialog();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentDialog, isTyping, isTextComplete, onComplete]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4" onClick={handleAdvanceDialog}>
      <SoundToggle />
      
      <div className="absolute top-28 sm:top-32 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 md:w-48">
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 transform scale-125 sm:scale-150">
          <img
            src="https://stackblitz.com/storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMUYwcXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--587edb43605e1f9f7cbb9f5cccd0a1aec6ef1c13/NorrisPickle.gif"
            alt="Pixel Wizard"
            className="w-full h-full object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-8 rounded-lg border-2 border-white/20 w-full max-w-[800px] mx-4 mt-40 sm:mt-48 md:mt-56 relative z-10">
        <div className="text-white pixel-text min-h-[150px] sm:min-h-[200px] overflow-y-auto">
          <p className="whitespace-pre-line leading-relaxed">{displayText}</p>
        </div>
        <p className="text-xs sm:text-sm text-white/70 mt-8 pixel-text animate-pulse text-center">
          {window.innerWidth <= 768 ? 'Tap' : 'Press ENTER'} to {isTyping && !isTextComplete ? 'show all' : 'continue'}
          ...
        </p>
      </div>
    </div>
  );
};

export default DialogScreen;