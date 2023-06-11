import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import { GameContext } from '../store/GameContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { removeCharacter } from '../store/GameActions';
import { Faction } from '../utils/Types';

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
    <>
      <label>Választott karakterek</label>
      <List>
        {selectedCards.map((card) => {
          return (
          <ListItem
            key={card.character}
            style={{ backgroundColor: getBackgroundColor(card.faction)}}
          >
            <ListItemText primary={card.character} />
            <ListItemSecondaryAction>
              <DeleteIcon onClick={() => onDeleteClick(card.character || '')}/>
            </ListItemSecondaryAction>
          </ListItem>
          );
        })}
      </List>
    </>
  )
}

export default SelectedCharacterList;