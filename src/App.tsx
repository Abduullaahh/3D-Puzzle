import React from 'react';
import { Game } from './components/Game';
import { GameUI } from './components/GameUI';
import { Menu } from './components/Menu';

function App() {
  return (
    <div className="w-full h-screen relative">
      <Game />
      <GameUI />
      <Menu />
    </div>
  );
}

export default App;