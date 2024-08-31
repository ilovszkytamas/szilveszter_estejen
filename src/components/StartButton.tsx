import { Button } from '@material-ui/core';
import React from 'react';
import { GameContext } from '../store/GameContext';
import { changeGameStep } from '../store/GameActions';
import { Faction, GameStep } from '../utils/Types';
import { Alert } from '@mui/material';

interface StartData {
  startable: boolean;
  requirementsByFaction?: [number, number, number]
}

const StartButton: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const [ startData, setStartData] = React.useState<StartData>({ startable: false, requirementsByFaction: [2, 2, 6] });
  const { selectedCards } = state;

  const getFactionCount = (faction: Faction): number => {
    return selectedCards.filter(card => card.faction === faction).length;
  }

  const isGameStartable = (): boolean => {
    switch(selectedCards.length) {
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: {
        setStartData({ startable: false, requirementsByFaction: [2, 2, 6] })
        return false;
      }
      case 10: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 2 && getFactionCount(Faction.NEUTRAL) === 2 && getFactionCount(Faction.VILLAGER) === 6;
        setStartData({ startable: startable, requirementsByFaction: [2, 2, 6] })
        return startable;
      }
      case 11: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 2 && getFactionCount(Faction.NEUTRAL) === 2 && getFactionCount(Faction.VILLAGER) === 7;
        setStartData({ startable: startable, requirementsByFaction: [2, 2, 7] })
        return startable;
      }
      case 12: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 2 && getFactionCount(Faction.VILLAGER) === 7;
        setStartData({ startable: startable, requirementsByFaction: [3, 2, 7] })
        return startable;
      }
      case 13: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 2 && getFactionCount(Faction.VILLAGER) === 8;
        setStartData({ startable: startable, requirementsByFaction: [3, 3, 8] })
        return startable;
      }
      case 14: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 8;
        setStartData({ startable: startable, requirementsByFaction: [3, 3, 8] })
        return startable;
      }
      case 15: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 9;
        setStartData({ startable: startable, requirementsByFaction: [3, 3, 9] })
        return startable;
      }
      case 16: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 4 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 9;
        setStartData({ startable: startable, requirementsByFaction: [4, 3, 9] })
        return startable;
      }
      case 17: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 3 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 10;
        setStartData({ startable: startable, requirementsByFaction: [3, 3, 10] })
        return startable;
      }
      case 18: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 4 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 11;
        setStartData({ startable: startable, requirementsByFaction: [4, 3, 11] })
        return startable;
      }
      case 19: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 5 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 11;
        setStartData({ startable: startable, requirementsByFaction: [5, 3, 11] })
        return startable;
      }
      case 20: {
        let startable: boolean = getFactionCount(Faction.EVIL) === 5 && getFactionCount(Faction.NEUTRAL) === 3 && getFactionCount(Faction.VILLAGER) === 12;
        setStartData({ startable: startable, requirementsByFaction: [5, 3, 12] })
        return startable;
      }
      default: {
        setStartData({ startable: false, requirementsByFaction: [5, 3, 12] })
        return false;
      };
    }
  }

  React.useEffect(() => {
    isGameStartable()
  }, [selectedCards])

  const startGame = (): void => {
    //if (startData.startable) {
      dispatch(changeGameStep(GameStep.PLAYER_SELECTION))
    //}
  }

  const getGameStartStatusText = (): string => {
    if (selectedCards.length < 10) {
      return "Túl kevés játékos";
    }
    if (selectedCards.length > 20) {
      return "Túl sok játékos(WTF?)";
    }
    if (!startData.startable) {
      return `Nem megfelelő számú játékos, ${startData.requirementsByFaction![0]} gonosz, ${startData.requirementsByFaction![1]} semleges, ${startData.requirementsByFaction![2]} paraszt kell`;
    }
    if (startData.startable) {
      return "Megfelelő számú és arányú játékos";
    }

    return "";
  }

  return (
    <>
      <Button variant='contained' onClick={startGame}>START</Button>
      <Alert severity={startData.startable ? 'success' : 'error'}>
         {getGameStartStatusText()}
      </Alert>
    </>
  );
}

export default StartButton;