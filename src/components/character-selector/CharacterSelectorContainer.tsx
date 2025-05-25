import { Button, FormControl, InputLabel, MenuItem, Select, Box, Stack } from '@mui/material';
import React from 'react';
import { addCharacter } from '../../store/GameActions';
import { GameContext } from '../../store/GameContext';
import { EVIL_CARDS, NEUTRAL_CARDS, VILLAGER_CARDS } from '../../utils/DataCollections';
import { CardData, Faction } from '../../utils/Types';
import CharacterSelector from './CharacterSelector';
import SelectedCharacterList from './SelectedCharacterList';
import CharacterSelectorStartButton from './CharacterSelectorStartButton';

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
    switch (event?.target?.value) {
      case Faction.EVIL:
        setCards(EVIL_CARDS);
        break;
      case Faction.NEUTRAL:
        setCards(NEUTRAL_CARDS);
        break;
      default:
        setCards(VILLAGER_CARDS);
    }
  };

  const onPreviousClick = (): void => {
    setIndex((prev) => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const onNextClick = (): void => {
    setIndex((prev) => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  const onCharacterSelection = (): void => {
    dispatch(addCharacter(cards[index]));
  };

  const isCharacterAlreadySelected = (): boolean => {
    return !!selectedCards.find((character) => character === cards[index]);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        width: '100%',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Válassz factiont</InputLabel>
        <Select defaultValue={Faction.EVIL} onChange={handleChange}>
          <MenuItem value={Faction.EVIL}>{Faction.EVIL}</MenuItem>
          <MenuItem value={Faction.NEUTRAL}>{Faction.NEUTRAL}</MenuItem>
          <MenuItem value={Faction.VILLAGER}>{Faction.VILLAGER}</MenuItem>
        </Select>
      </FormControl>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ width: '100%', maxWidth: '1200px' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CharacterSelector
            cardData={cards[index] || ''}
            onPreviousClick={onPreviousClick}
            onNextClick={onNextClick}
          />
          <Button
            variant="contained"
            onClick={onCharacterSelection}
            disabled={isCharacterAlreadySelected()}
          >
            Választás
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
            maxWidth: { xs: '100%', md: '400px' },
          }}
        >
          <SelectedCharacterList />
          <CharacterSelectorStartButton />
        </Box>
      </Stack>
    </Box>
  );
};

export default CharacterSelectorContainer;
