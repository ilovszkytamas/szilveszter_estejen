import { Button } from '@material-ui/core';
import React from 'react';
import { GameContext } from '../../store/GameContext';
import { Alert } from '@mui/material';
import { changeGameStep, finaliseWelding, finaliseOrder } from '../../store/GameActions';
import { INITIAL_ORDER } from '../../utils/DataCollections';
import { Character, GameStep } from '../../utils/Types';

interface PlayerSelectorStartButtonProps {
  hasWelder: boolean
  weldedPlayers?: Character[]
}

enum PlayerSelectorStartButtonErrorType {
  MISSING_PLAYERS,
  WELDING_ERROR
}

interface PlayerSelectorStartButtonErrorData {
  hasError: boolean,
  errorType?: PlayerSelectorStartButtonErrorType
}

const PlayerSelectorStartButton: React.FC<PlayerSelectorStartButtonProps> = (props) => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;
  const [error, setError] = React.useState<PlayerSelectorStartButtonErrorData>({hasError: false});
  const [missingCharacters, setMissingCharacters] = React.useState<string[]>([]);

  const finaliseOrderBeforeStart = () => {
    let finalisedOrder = INITIAL_ORDER.filter(card => {
      return selectedCards.find((selected => selected.character === card.character));
    })
    dispatch(finaliseOrder(finalisedOrder));
  }
  
  const startGame = () => {
    let cardsWithoutPlayers = selectedCards.filter(card => !card.playerName);
    if (cardsWithoutPlayers.length > 0) {
        setMissingCharacters(cardsWithoutPlayers.map(card => card.character) as string[]);
        setError({hasError: true, errorType: PlayerSelectorStartButtonErrorType.MISSING_PLAYERS});
    } else if (props.hasWelder && props.weldedPlayers?.length !== 2) {
      setError({hasError: true, errorType: PlayerSelectorStartButtonErrorType.WELDING_ERROR});
    } else {
      setError({hasError: false});
      if (props.hasWelder) {
        dispatch(finaliseWelding(props.weldedPlayers as Character[]));
      }
      finaliseOrderBeforeStart();
      dispatch(changeGameStep(GameStep.PENDING_GAME));
    }
  }

  console.log(state);
  
  return (
    <>
      <Button variant='contained' onClick={startGame}>START</Button>
      {error.hasError && error.errorType === PlayerSelectorStartButtonErrorType.MISSING_PLAYERS && <Alert severity='error'>
          Játékosok hiányoznak ezekhez a karakterekhez: {missingCharacters.join(', ')}
      </Alert>}
      {error.hasError && error.errorType === PlayerSelectorStartButtonErrorType.WELDING_ERROR && <Alert severity='error'>
          Hegesztés hiba, jelenleg összehegesztett játékosok: {props?.weldedPlayers?.join(', ')}
      </Alert>}
    </>
  );
}

export default PlayerSelectorStartButton;