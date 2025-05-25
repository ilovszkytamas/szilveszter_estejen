import { Box, Button } from '@mui/material';
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

  React.useEffect(() => {
    setError({ hasError: false });
  }, [props?.weldedPlayers])

  return (
    <Box sx={{ mt: 3, width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Button
        variant="contained"
        onClick={startGame}
        fullWidth
        sx={{ mb: 2 }}
      >
        START
      </Button>

      {error.hasError && error.errorType === PlayerSelectorStartButtonErrorType.MISSING_PLAYERS && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Játékosok hiányoznak ezekhez a karakterekhez: {missingCharacters.join(', ')}
        </Alert>
      )}

      {error.hasError && error.errorType === PlayerSelectorStartButtonErrorType.WELDING_ERROR && (
        <Alert severity="error">
          Hegesztés hiba, jelenleg összehegesztett játékosok: {props?.weldedPlayers?.join(', ')}
        </Alert>
      )}
    </Box>
  );
  
}

export default PlayerSelectorStartButton;