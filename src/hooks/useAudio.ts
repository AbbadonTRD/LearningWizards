import { useState, useEffect } from 'react';

export const useAudio = () => {
  const [audio] = useState(new Audio('/sounds/hollow-knight-ambient.mp3'));
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audio.loop = true;
    if (isPlaying) {
      audio.play();
    }
    return () => {
      audio.pause();
    };
  }, [audio, isPlaying]);

  const toggleSound = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return { isPlaying, toggleSound };
};