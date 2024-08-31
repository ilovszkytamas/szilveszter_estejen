import React from 'react';
import { GameContext } from '../../store/GameContext';
import { Input, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { CardData, Faction } from '../../utils/Types';
import { assignPlayerToCharacter } from '../../store/GameActions';
import PlayerSelectorStartButton from './PlayerSelectorStartButton';

const PlayerSelector: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;

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

  const onNameInputChange = (e: any, card: CardData) => {
    dispatch(assignPlayerToCharacter([card.character as string, e.target.value]));
  }

  return (
    <div style={{width: '80%', marginLeft: '10%'}}>
      <label>Rendelj játékost a karakterekhez</label>
      <List>
        {selectedCards.map((card) => {
          return (
            <ListItem
              key={card.character}
              style={{ backgroundColor: getBackgroundColor(card.faction) }}
            >
              <ListItemText primary={card.character} />
              <ListItemSecondaryAction>
                <Input onBlur={(e) => onNameInputChange(e, card)}/>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
      <PlayerSelectorStartButton />
    </div>
  );
}

export default PlayerSelector;