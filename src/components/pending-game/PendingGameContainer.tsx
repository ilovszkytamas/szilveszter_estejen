import { Button, List, ListItem, ListItemText } from '@mui/material';
import React from 'react'
import { CardData, Character, Faction, TimeOfDay } from '../../utils/Types';
import { GameContext } from '../../store/GameContext';
import { StepModal } from './StepModal';
import { killCharacter, resetEffects, setDayCount, setTimeOfDay } from '../../store/GameActions';

const PendingGameContainer: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards, dayCount, timeOfDay } = state;
  const [currentHung, setCurrentHung] = React.useState<CardData>();
  
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
    dispatch(setTimeOfDay(TimeOfDay.DAY));
  }

  const onSleep = () => {
    if (currentHung) {
      dispatch(killCharacter(currentHung.character))
      if (currentHung.isWelded) {
        const weldedOtherPair = selectedCards.find(card => card.isWelded && card.character !== currentHung.character)!;
        dispatch(killCharacter(weldedOtherPair.character));
      }
    }
    setCurrentHung(undefined);
    dispatch(setDayCount(dayCount + 1));
    dispatch(setTimeOfDay(TimeOfDay.NIGHT));
  }

  const onHangClick = (card: CardData) => {
    if (currentHung?.character === card.character) {
      setCurrentHung(undefined);
    } else {
      setCurrentHung(card);
    }
  }

  const getBackgroundColorForHangButton = (character: Character): string => {
    if (character === currentHung?.character) {
      return "orange";
    }
    else return "black";
  }

  return (
    <>
      <div style={{ width: '80%', marginLeft: '10%' }}>
        <label>{dayCount}.{timeOfDay.toString()}</label>
        {timeOfDay === TimeOfDay.NIGHT && <StepModal onWakeUp={onWakeUp}/>}
        {timeOfDay === TimeOfDay.DAY && <Button onClick={onSleep} style={{backgroundColor: 'red'}}>LEFEKVÉS, KEZDŐDIK AZ ÉJSZAKA</Button>}
        <List>
          {selectedCards.map((card) => {
            return (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', minWidth: '30%' }}>
                  {card.effects.map(effect => {
                    return (
                      <ListItem style={{ marginLeft: '-50px', marginRight: '20px' }}
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
                    <ListItemText primary={`${card.character} ${card.isWelded ? "(hegesztett)" : ""}`} />
                    <ListItemText primary={card.playerName} />
                  </ListItem>
                </div>
                {card.isAlive && timeOfDay === TimeOfDay.DAY && <Button onClick={() => onHangClick(card)} style={{backgroundColor: getBackgroundColorForHangButton(card.character), color: 'white'}}>FELAKASZTÁS</Button>}
              </div>
            );
          })}
        </List>
      </div>
    </>
  )
}

export default PendingGameContainer;