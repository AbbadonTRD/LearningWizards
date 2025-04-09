import React from 'react';
import { Character } from '../../types';
import { Stars } from '../Stars';
import SoundToggle from '../SoundToggle';

const characters: Character[] = [
  {
    id: 'leopold',
    name: 'LEOPOLD THE OLD',
    image: 'https://stackblitz.com/storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN1J1cXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--b4be342e4288fb445c12c357988c5ec319b49884/LeopoldTheOld.gif',
    backgroundColor: 'bg-pink-400',
  },
  {
    id: 'darklord',
    name: 'DARK LORD MERCILESS',
    image: 'https://stackblitz.com/storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN0J1cXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--0b4bc195b4222485a0ac6099f659266f4fdf8342/DarkLordMerciless.gif',
    backgroundColor: 'bg-emerald-400',
  },
  {
    id: 'randall',
    name: 'RANDALL MAWR',
    image: 'https://stackblitz.com/storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBN1Z1cXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--154003e729d6f5fcb6ea027e47e90031628a1121/RandallMawr.gif',
    backgroundColor: 'bg-blue-400',
  },
];

interface CharacterSelectProps {
  onSelect: (character: Character) => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] p-8 flex flex-col items-center relative">
      <Stars />

      <SoundToggle />

      <h1 className="text-4xl mb-8 pixel-text relative z-10 text-yellow-400">
        CHARACTER SELECTION
      </h1>

      <div className="text-center mb-12 max-w-2xl relative z-10 px-4">
        <p className="text-lg pixel-text leading-relaxed text-white">
          EIN BÖSER MAGIER GREIFT ZAUBERER, HEXEN UND MUGGELS AN! DIE WELT
          ZERBRICHT UND MENSCHEN STERBEN! JEMAND MUSS EIN HELD SEIN! ABER WER?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 max-w-4xl relative z-10 px-4">
        {characters.map((character) => (
          <div
            key={character.id}
            className="bg-black/30 backdrop-blur-sm p-6 rounded-lg text-center cursor-pointer transform hover:scale-105 transition-all border-2 border-white/20 hover:border-white/40 pixel-border"
            onClick={() => onSelect(character)}
          >
            <div
              className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 flex items-center justify-center"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-contain p-2"
                style={{
                  imageRendering: 'pixelated',
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  transform: 'scale(1.2)',
                }}
              />
            </div>
            <h3 className="text-xl pixel-text mb-4 text-white">
              {character.name}
            </h3>
            <button className="w-full bg-white/10 border border-white/30 px-4 py-2 pixel-text text-sm hover:bg-white/20 transition-colors">
              <span className="text-white">SELECT</span>
            </button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .pixel-border {
          image-rendering: pixelated;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
};

export default CharacterSelect;
