import { Button } from '@material-ui/core';
import React from 'react';
import { GameContext } from '../../store/GameContext';
import { Alert } from '@mui/material';
import { changeGameStep } from '../../store/GameActions';
import { GameStep } from '../../utils/Types';


const PlayerSelectorStartButton: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;
  const [hasError, setHasError] = React.useState<boolean>(false);
  const [missingCharacters, setMissingCharacters] = React.useState<string[]>([]);
  
  const startGame = () => {
    let cardsWithoutPlayers = selectedCards.filter(card => !card.playerName);
    if (cardsWithoutPlayers.length > 0) {
        setMissingCharacters(cardsWithoutPlayers.map(card => card.character) as string[]);
        setHasError(true);
    } else dispatch(changeGameStep(GameStep.DAY_ZERO));
  }

  return (
    <>
      <Button variant='contained' onClick={startGame}>START</Button>
      {hasError && <Alert severity='error'>
          Játékosok hiányoznak ezekhez a karakterekhez: {missingCharacters.join(', ')}
      </Alert>}
    </>
  );
}

export default PlayerSelectorStartButton;