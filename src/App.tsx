import React from 'react';
import './App.css';
import { GameContextProvider } from './store/GameContext';
import MainComponent from './components/MainComponent';

const App: React.FC = () =>  {
  return (
    <div className="App" style={{ maxHeight: '100%', maxWidth: '100%'}}>
      <GameContextProvider>
        <MainComponent />
      </GameContextProvider>
    </div>
  );
}

export default App;
