import React from 'react';
import { GameContext } from "../store/GameContext";
import { GameStep } from '../utils/Types';
import CharacterSelectorContainer from './character-selector/CharacterSelectorContainer';
import PlayerSelector from './player-selector/PlayerSelector';
import PendingGameContainer from './pending-game/PendingGameContainer';
import { EVERY_CARD } from '../utils/DataCollections';
import { addCharacter } from '../store/GameActions';

const MainComponent: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { gameStep } = state;
  const [currentComponent, setCurrentComponent] = React.useState<React.ReactElement>();
  console.log(EVERY_CARD)

 /* React.useEffect(() => {
    if (state.selectedCards.length <= 0) {
      EVERY_CARD.forEach((card) => dispatch(addCharacter(card)))
    }
  }, [])*/

  React.useEffect(() => {
    setComponentByGameStep(gameStep);
  }, [gameStep])

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
    </>
  );
}

export default MainComponent;