import React from 'react'
import Card from '@material-ui/core/Card';
import { CardData } from '../utils/Types';

const PlayerCard: React.FC<CardData> = (cardData) => {
  return (
    <div style={{ width: '150%', height: '150%' }}>
      <Card >
        <img style={{maxHeight: '100%', maxWidth: '100%', marginLeft: '20px'}} src={cardData.imageLocation} alt={cardData.imageLocation}/>
      </Card>
    </div>
  )
}

export default PlayerCard;