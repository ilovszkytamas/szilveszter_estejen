import { Button, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react'
import { addCharacter } from '../store/GameActions';
import { GameContext } from '../store/GameContext';
import { EVIL_CARDS, NEUTRAL_CARDS, VILLAGER_CARDS } from '../utils/DataCollections';
import { CardData, Faction } from '../utils/Types';
import CharacterSelector from './CharacterSelector';
import SelectedCharacterList from './SelectedCharacterList';
import StartButton from './StartButton';

const CharacterSelectorContainer: React.FC = () => {
  const [cards, setCards] = React.useState<CardData[]>([]);
  const [index, setIndex] = React.useState<number>(0);

  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;

  React.useEffect(() => {
    setCards(EVIL_CARDS);
  }, []);

  const handleChange = (event: any): void => {
    setIndex(0);
    switch(event?.target?.value) {
      case Faction.EVIL: {
        setCards(EVIL_CARDS);
        break;
      }
      case Faction.NEUTRAL: {
        setCards(NEUTRAL_CARDS);
        break;
      }
      default: setCards(VILLAGER_CARDS);
    }
  };

  const onPreviousClick = (): void => {
    if (index > 0) {
      setIndex(index - 1);
      return;
    }
    setIndex(cards.length - 1);
  };

  const onNextClick = (): void => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      return;
    }
    setIndex(0);
  };

  const onCharacterSelection = (): void => {
    dispatch(addCharacter(cards[index]));
  };

  const isCharacterAlreadySelected = (): boolean => {
    return !!selectedCards.find((character) => character === cards[index]);
  }

  React.useEffect(() => {
    console.log(state);
  }, [state])

  return (
  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyItems:'space-between'}}> 
    <FormControl >
      <InputLabel>Válassz factiont</InputLabel>
      <Select
        defaultValue={Faction.EVIL}
        onChange={handleChange}
      >
        <MenuItem value={Faction.EVIL}>{Faction.EVIL}</MenuItem>
        <MenuItem value={Faction.NEUTRAL}>{Faction.NEUTRAL}</MenuItem>
        <MenuItem value={Faction.VILLAGER}>{Faction.VILLAGER}</MenuItem>
      </Select>
    </FormControl>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch'}}>
      <div>
        <CharacterSelector cardData={cards[index] || ''} onPreviousClick={onPreviousClick} onNextClick={onNextClick} />
        <Button variant='contained' onClick={onCharacterSelection} disabled={isCharacterAlreadySelected()}>Választás</Button>
      </div>
      <div>
        <SelectedCharacterList />
        <StartButton />
      </div>
    </div>
  </div>
  )
}

export default CharacterSelectorContainer;