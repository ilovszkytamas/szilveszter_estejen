import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import { CardData, Faction } from '../../utils/Types';
import { GameContext } from '../../store/GameContext';
import { StepModal } from './StepModal';

const PendingGameContainer: React.FC = () => {
  const { state } = React.useContext(GameContext);
  const { selectedCards } = state;

  const getBackgroundColor = (card: CardData): string => {
    if (!card.isAlive) {
      return "black";
    }

    switch (card.faction) {
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
      <div style={{ width: '80%', marginLeft: '10%' }}>
        <label>DAY 1</label>
        <StepModal />
        <List>
          {selectedCards.map((card) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', minWidth: '30%' }}>
                  {card.effects.map(effect => {
                    return (
                      <ListItem style={{ marginLeft: '20px', marginRight: '20px', width: '20%' }}
                        key={card.character}
                      >
                        <ListItemText primary={effect} />
                      </ListItem>
                    )
                  })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '50%' }}>
                  <ListItem
                    key={card.character}
                    style={{ backgroundColor: getBackgroundColor(card), color: 'white' }}
                  >
                    <ListItemText primary={card.character} />
                    <ListItemText primary={card.playerName} />
                  </ListItem>
                </div>
              </div>
            );
          })}
        </List>
      </div>
    </>
  )
}

export default PendingGameContainer;