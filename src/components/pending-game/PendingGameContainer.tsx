import { Button, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react'
import { CardData, Faction } from '../../utils/Types';
import { GameContext } from '../../store/GameContext';
import { StepModal } from './StepModal';
import { resetEffects } from '../../store/GameActions';

enum Time {
  DAY='NAPPAL',
  NIGHT='EJSZAKA'
}

const PendingGameContainer: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;
  const [dayCount, setDayCount] = React.useState<number>(1);
  const [time, setTime] = React.useState<Time>(Time.NIGHT);

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

  const onWakeUp = () => {
    dispatch(resetEffects());
    setTime(Time.DAY);
  }

  const onSleep = () => {
    setDayCount(dayCount + 1);
    setTime(Time.NIGHT);
  }

  return (
    <>
      <div style={{ width: '80%', marginLeft: '10%' }}>
        <label>{dayCount}.{time.toString()}</label>
        {time === Time.NIGHT && <StepModal onWakeUp={onWakeUp}/>}
        {time === Time.DAY && <Button onClick={onSleep} style={{backgroundColor: 'red'}}>LEFEKVÉS, KEZDŐDIK AZ ÉJSZAKA</Button>}
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
                {card.isAlive && time === Time.DAY && <Button style={{backgroundColor: 'black', color: 'white'}}>FELAKASZTÁS</Button>}
              </div>
            );
          })}
        </List>
      </div>
    </>
  )
}

export default PendingGameContainer;