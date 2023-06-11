import { Button } from '@material-ui/core';
import React from 'react';
import { GameContext } from '../store/GameContext';
import { Faction } from '../utils/Types';

const StartButton: React.FC = () => {
  const { state } = React.useContext(GameContext);
  const getFactionCount = (faction: Faction): number => {
    return state.selectedCards.filter(card => card.faction === faction).length;
  }

  const isGameStartable = (): boolean => {
    switch(state.selectedCards.length) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: {
        return false;
      }
      case 10: {
        return getFactionCount(Faction.EVIL) === 2 && getFactionCount(Faction.NEUTRAL) === 2 && getFactionCount(Faction.VILLAGER) === 6;
      }
      case 11: {
        return getFactionCount(Faction.EVIL) === 2 && getFactionCount(Faction.NEUTRAL) === 2 && getFactionCount(Faction.VILLAGER) === 7;
      }
      case 12: {
        return getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 2 && getFactionCount(Faction.VILLAGER) === 7;
      }
      case 13: {
        return getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 8;
      }
      case 14: {
        return getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 8;
      }
      case 15: {
        return getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 9;
      }
      case 16: {
        return getFactionCount(Faction.EVIL) === 4 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 9;
      }
      case 17: {
        return getFactionCount(Faction.EVIL) === 4 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 10;
      }
      case 18: {
        return getFactionCount(Faction.EVIL) === 4 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 11;
      }
      case 19: {
        return getFactionCount(Faction.EVIL) === 5 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 11;
      }
      case 20: {
        return getFactionCount(Faction.EVIL) === 4 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 12;
      }
      default: return false;
    }
  }

  const startGame = (): void => {
    const startable: boolean = isGameStartable();
  }

  return (
    <Button variant='contained' onClick={startGame}>START</Button>
  );
}

export default StartButton;