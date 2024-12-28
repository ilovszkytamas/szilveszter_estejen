import React from 'react';
import { GameContext } from "../store/GameContext";
import { GameStep } from '../utils/Types';
import CharacterSelectorContainer from './character-selector/CharacterSelectorContainer';
import PlayerSelector from './player-selector/PlayerSelector';
import PendingGameContainer from './pending-game/PendingGameContainer';
import useLoadingHandler from '../hooks/useLoadingHandler';
import { Button } from '@material-ui/core';

const MainComponent: React.FC = () => {
  useLoadingHandler();
  const { state } = React.useContext(GameContext);
  const { gameStep } = state;
  const [currentComponent, setCurrentComponent] = React.useState<React.ReactElement>();

  React.useEffect(() => {
    setComponentByGameStep(gameStep);
  }, [gameStep])

  const onNewGameClick = () => {
    localStorage.removeItem('gameState');
    window.location.reload();
  }

  const setComponentByGameStep = (gameStep: GameStep): void => {
    switch (gameStep) {
      case GameStep.CHARACTER_SELECTION: setCurrentComponent(<CharacterSelectorContainer />); break;
      case GameStep.PLAYER_SELECTION: setCurrentComponent(<PlayerSelector />); break;
      case GameStep.PENDING_GAME: setCurrentComponent(<PendingGameContainer />); break;
    }
  }
  return (
    <>
      {currentComponent}
      <Button onDoubleClick={onNewGameClick} style={{backgroundColor: 'purple', marginTop: '100px'}}>ÚJ JÁTÉK KEZDÉSE</Button>
    </>
  );
}

export default MainComponent;