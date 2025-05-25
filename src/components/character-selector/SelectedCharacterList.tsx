import { Box, List, ListItem, ListItemText } from '@mui/material';
import React from 'react'
import { GameContext } from '../../store/GameContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { removeCharacter } from '../../store/GameActions';
import { Faction } from '../../utils/Types';

const SelectedCharacterList: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;

  const onDeleteClick = (character: string): void => {
    dispatch(removeCharacter(character));
  }

  const getBackgroundColor = (faction: Faction): string => {
    switch(faction) {
      case Faction.EVIL: {
        return "red";
      }
      case Faction.VILLAGER: {
        return "blue";
      }
      default: return "gray";
    }
  }

  return (
    <Box>
      <label>Választott karakterek</label>
      <List>
        {selectedCards.map((card) => (
          <ListItem
            key={card.character}
            sx={{ backgroundColor: getBackgroundColor(card.faction) }}
          >
            <ListItemText primary={card.character} />
            <ListItemSecondaryAction>
              <DeleteIcon onClick={() => onDeleteClick(card.character || '')} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default SelectedCharacterList;