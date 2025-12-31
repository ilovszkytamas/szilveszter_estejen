import React from 'react';
import { GameContext } from "../store/GameContext";
import { GameStep } from '../utils/Types';
import CharacterSelectorContainer from './character-selector/CharacterSelectorContainer';
import PendingGameContainer from './pending-game/PendingGameContainer';
import useLoadingHandler from '../hooks/useLoadingHandler';
import { Button } from '@mui/material';
import PlayerSelectorContainer from './player-selector/PlayerSelectorContainer';
import GameMasterContainer from './game-master/GameMasterContainer';
import { changeGameStep } from '../store/GameActions';

const MainComponent: React.FC = () => {
  useLoadingHandler();
  const { state, dispatch } = React.useContext(GameContext);
  const { gameStep } = state;
  const [currentComponent, setCurrentComponent] = React.useState<React.ReactElement>();

  const setComponentByGameStep = (gameStep: GameStep): void => {
    switch (gameStep) {
      case GameStep.CHARACTER_SELECTION: setCurrentComponent(<CharacterSelectorContainer />); break;
      case GameStep.PLAYER_SELECTION: setCurrentComponent(<PlayerSelectorContainer />); break;
      case GameStep.PENDING_GAME: setCurrentComponent(<PendingGameContainer />); break;
      case GameStep.GAME_MASTER: setCurrentComponent(<GameMasterContainer />); break;
    }
  }

  React.useEffect(() => {
    setComponentByGameStep(gameStep);
  }, [gameStep]);

  const onGameMasterClick = () => {
    dispatch(changeGameStep(GameStep.GAME_MASTER));
  }

  return (
    <>
      {currentComponent}
      {gameStep === GameStep.PENDING_GAME && <Button onClick={onGameMasterClick} style={{backgroundColor: 'purple', marginTop: '100px', color: 'white'}}>JÁTÉKMESTER MÓD</Button>}
    </>
  );
}

export default MainComponent;