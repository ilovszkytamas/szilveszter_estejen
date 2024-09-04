import { List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import { Faction } from '../../utils/Types';
import { GameContext } from '../../store/GameContext';

const PendingGameContainer: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;

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

  return (
    <>
      <div style={{ width: '80%', marginLeft: '10%' }}>
        <label>Pending Game</label>
        <List>
          {selectedCards.map((card) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', minWidth: '30%' }}>
                  <ListItem style={{ marginLeft: '20px', marginRight: '20px', width: '10%' }}
                    key={card.character}
                  >
                    <ListItemText primary={"buff1"} />
                  </ListItem>
                  <ListItem style={{ marginLeft: '20px', marginRight: '20px', width: '10%' }}
                    key={card.character}
                  >
                    <ListItemText primary={"debuf1"} />
                  </ListItem>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', minWidth: '50%' }}>
                  <ListItem
                    key={card.character}
                    style={{ backgroundColor: getBackgroundColor(card.faction) }}
                  >
                    <ListItemText primary={card.character} />
                    <ListItemText primary={card.playerName} />
                  </ListItem>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', minWidth: '30%' }}>
                  <ListItem style={{ marginLeft: '20px', marginRight: '20px', width: '10%' }}
                    key={card.character}
                  >
                    <ListItemText primary={"action1"} />
                  </ListItem>
                  <ListItem style={{ marginLeft: '20px', marginRight: '20px', width: '10%' }}
                    key={card.character}
                  >
                    <ListItemText primary={"action2"} />
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