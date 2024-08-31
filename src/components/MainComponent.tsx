import React from 'react';
import { GameContext } from "../store/GameContext";
import { GameStep } from '../utils/Types';
import CharacterSelectorContainer from './CharacterSelectorContainer';

const MainComponent: React.FC = () =>  {
    const { state } = React.useContext(GameContext);
    const { gameStep } = state;
    const [ currentComponent, setCurrentComponent] = React.useState<React.ReactElement>();
  
    React.useEffect(() => {
      setComponentByGameStep(gameStep)
    }, [gameStep])
  
    const setComponentByGameStep = (gameStep: GameStep): void => {
      console.log("SWITCHSTART", gameStep)
      switch (gameStep) {
        case GameStep.CHARACTER_SELECTION: setCurrentComponent(<CharacterSelectorContainer />); break;
        case GameStep.PLAYER_SELECTION: setCurrentComponent(<div>PLAYER_SELECTION</div>); console.log("selected"); break;
        case GameStep.DAY_ZERO: setCurrentComponent(<div>DAYZERO</div>); break;
        case GameStep.PENDING_GAME: setCurrentComponent(<div>PENDING_GAME</div>); break;
      }
    }
    return (
      <>
        {currentComponent}
      </>
    );
  }
  
  export default MainComponent;