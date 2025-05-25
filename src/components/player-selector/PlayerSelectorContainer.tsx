import React from 'react';
import { GameContext } from '../../store/GameContext';
import { Box, Button, Input, List, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { CardData, Character, Faction } from '../../utils/Types';
import { assignPlayerToCharacter } from '../../store/GameActions';
import PlayerSelectorStartButton from './PlayerSelectorStartButton';

const PlayerSelectorContainer: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;
  const [hasWelder, setHasWelder] = React.useState<boolean>(false);
  const [weldedPlayers, setWeldedPlayers] = React.useState<Character[]>([]);

  const getBackgroundColor = (faction: Faction): string => {
    switch (faction) {
      case Faction.EVIL: {
        return "red";
      }
      case Faction.VILLAGER: {
        return "blue";
      }
      default: return "gray";
    }
  }

  const getBackgroundColorForWeldButton = (character: Character): string => {
    if (weldedPlayers.find((player => player === character))) {
      return "orange";
    }
    else return "black";
  }

  const weldPlayer = (character: Character) => {
    if (weldedPlayers.find(player => character === player)) {
      return;
    }
    if (weldedPlayers.length >= 2) {
      setWeldedPlayers([weldedPlayers[1], character])
    } else {
      setWeldedPlayers([...weldedPlayers, character])
    }
  }

  const onNameInputChange = (e: any, card: CardData) => {
    dispatch(assignPlayerToCharacter([card.character, e.target.value]));
  }

  React.useEffect(() => {
    let welder = selectedCards.find(card => card.character === Character.HEGESZTO1 || card.character === Character.HEGESZTO2);
    if (welder) {
      setHasWelder(true);
    }
  }, [])

  return (
    <Box sx={{ width: { xs: '100%', sm: '90%', md: '80%' }, mx: 'auto', mt: 3 }}>
      <Typography variant="h6" component="label" sx={{ mb: 2, display: 'block' }}>
        Rendelj játékost a karakterekhez
      </Typography>

      <List>
        {selectedCards.map((card) => (
          <ListItem
            key={card.character}
            sx={{
              backgroundColor: getBackgroundColor(card.faction),
              mb: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: 1,
            }}
          >
            <ListItemText primary={card.character} sx={{ flex: '1 1 auto' }} />

            <Input
              onBlur={(e) => onNameInputChange(e, card)}
              placeholder="Játékos neve"
              sx={{
                backgroundColor: 'white',
                px: 1,
                py: 0.5,
                borderRadius: 1,
                width: { xs: '100%', sm: '200px' },
                mr: { sm: hasWelder ? 1 : 0 },
              }}
              inputProps={{ 'aria-label': 'Játékos neve' }}
            />

            {hasWelder && (
              <Button
                variant="contained"
                onClick={() => weldPlayer(card.character)}
                sx={{
                  bgcolor: getBackgroundColorForWeldButton(card.character),
                  whiteSpace: 'nowrap',
                  mt: { xs: 1, sm: 0 },
                }}
              >
                HEGESZTÉS
              </Button>
            )}
          </ListItem>
        ))}
      </List>
      <PlayerSelectorStartButton hasWelder={hasWelder} weldedPlayers={weldedPlayers}/>
    </Box>
  );
}

export default PlayerSelectorContainer;