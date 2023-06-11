import './App.css';
import CharacterSelectorContainer from './components/CharacterSelectorContainer';
import { GameContextProvider } from './store/GameContext';

const App: React.FC = () =>  {
  return (
    <div className="App" style={{ maxHeight: '100%', maxWidth: '100%'}}>
      <GameContextProvider>
        <CharacterSelectorContainer />
      </GameContextProvider>
    </div>
  );
}

export default App;
