import React from 'react'
import Card from '@material-ui/core/Card';
import { CardData } from '../../utils/Types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface CharacterSelectorProps {
  cardData: CardData;
  onPreviousClick(): void;
  onNextClick(): void;
}

const CharacterSelector: React.FC<CharacterSelectorProps> = (props) => {
  const { cardData, onPreviousClick, onNextClick } = props;
  return (
    <div style={{  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center' }}>
      <ArrowBackIcon fontSize='large' onClick={onPreviousClick}/>
      <Card >
        <img style={{maxHeight: '80%', maxWidth: '80%'}} src={cardData.imageLocation} alt={cardData.imageLocation}/>
      </Card>
      <ArrowForwardIcon fontSize='large' onClick={onNextClick}/>
    </div>
  )
}

export default CharacterSelector;