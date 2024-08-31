import React from 'react';
import { GameContext } from '../../store/GameContext';
import { Button, Input, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { CardData, Character, Faction } from '../../utils/Types';
import { assignPlayerToCharacter } from '../../store/GameActions';
import PlayerSelectorStartButton from './PlayerSelectorStartButton';

const PlayerSelector: React.FC = () => {
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
    else return "white";
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
    <div style={{ width: '80%', marginLeft: '10%' }}>
      <label>Rendelj játékost a karakterekhez</label>
      <List>
        {selectedCards.map((card) => {
          return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                <ListItem
                  key={card.character}
                  style={{ backgroundColor: getBackgroundColor(card.faction) }}
                >
                  <ListItemText primary={card.character} />
                  <ListItemSecondaryAction>
                    <Input style={{ backgroundColor: 'white' }} onBlur={(e) => onNameInputChange(e, card)} />
                  </ListItemSecondaryAction>
                </ListItem>
              </div>
              {hasWelder
                && <Button onClick={() => weldPlayer(card.character)} style={{ backgroundColor: getBackgroundColorForWeldButton(card.character) }}>HEGESZTÉS</Button>}
            </div>
          );
        })}
      </List>
      <PlayerSelectorStartButton hasWelder={hasWelder} weldedPlayers={weldedPlayers}/>
    </div>
  );
}

export default PlayerSelector;