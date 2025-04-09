import React from 'react';
import { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

const SoundToggle: React.FC = () => {
  const { isPlaying, toggleSound } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > lastScrollY && window.scrollY > 50);
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button 
      onClick={toggleSound}
      className={`fixed top-4 right-4 z-50 pixel-text text-xs sm:text-sm text-gray-500 bg-black/30 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/20 flex items-center gap-2 hover:bg-black/40 transition-all scroll-hide ${!isScrolled ? 'visible' : ''}`}
    >
      {isPlaying ? <Volume2 size={14} className="sm:w-4 sm:h-4" /> : <VolumeX size={14} className="sm:w-4 sm:h-4" />}
      SOUND: {isPlaying ? '*ON*' : '*OFF*'}
    </button>
  );
};

export default SoundToggle