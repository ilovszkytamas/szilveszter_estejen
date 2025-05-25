import React from 'react';
import { Card, Box, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { CardData } from '../../utils/Types';

interface CharacterSelectorProps {
  cardData: CardData;
  onPreviousClick(): void;
  onNextClick(): void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = (props) => {
  const { cardData, onPreviousClick, onNextClick } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 2,
        width: '100%',
        p: 2,
      }}
    >
      <IconButton onClick={onPreviousClick} size="large">
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>

      <Card
        sx={{
          width: 'clamp(250px, 60vw, 500px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}
      >
        <img
          src={cardData.imageLocation}
          alt={cardData.imageLocation}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </Card>

      <IconButton onClick={onNextClick} size="large">
        <ArrowForwardIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default CharacterSelector;
