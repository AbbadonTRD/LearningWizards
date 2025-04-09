import React, { useState } from 'react';
import HomeScreen from './components/screens/HomeScreen';
import NameInput from './components/screens/NameInput';
import CharacterSelect from './components/screens/CharacterSelect';
import DialogScreen from './components/screens/DialogScreen';
import DocsScreen from './components/screens/DocsScreen';
import { Character } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'name' | 'character' | 'dialog' | 'docs'>('home');
  const [playerName, setPlayerName] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  const handleStart = () => {
    setCurrentScreen('name');
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setCurrentScreen('character');
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedCharacter(character);
    setCurrentScreen('dialog');
  };

  const handleDialogComplete = () => {
    setCurrentScreen('docs');
  };

  switch (currentScreen) {
    case 'home':
      return <HomeScreen onStart={handleStart} />;
    case 'name':
      return <NameInput onSubmit={handleNameSubmit} />;
    case 'character':
      return <CharacterSelect onSelect={handleCharacterSelect} />;
    case 'dialog':
      return <DialogScreen playerName={playerName} onComplete={handleDialogComplete} />;
    case 'docs':
      return <DocsScreen />;
    default:
      return null;
  }
}

export default App;