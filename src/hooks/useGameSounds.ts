import { useRef, useEffect } from 'react';
import { Howl } from 'howler';
import { useAudio } from './useAudio';

export const useGameSounds = () => {
  const { isPlaying } = useAudio();
  const successSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    successSoundRef.current = new Howl({
      src: ['/sounds/Voicy_Animal Crossing Music SFX.mp3'],
      volume: 0.5
    });

    return () => {
      if (successSoundRef.current) {
        successSoundRef.current.stop();
      }
    };
  }, []);

  const playSuccessSound = () => {
    if (successSoundRef.current && isPlaying) {
      successSoundRef.current.play();
    }
  };

  return { playSuccessSound };
};