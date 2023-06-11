import { Grid } from '@material-ui/core';
import React from 'react'
import { EVIL_CARDS, NEUTRAL_CARDS, VILLAGER_CARDS } from '../utils/DataCollections';
import { Faction, CardData } from '../utils/Types';
import PlayerCard from './PlayerCard';

interface PlayerCardHolderProps {
  faction: Faction;
}

const PlayerCardHolder: React.FC<PlayerCardHolderProps> = (props) => {
  const [cards, setCards] = React.useState<CardData[]>([]);
  const { faction } = props;

  React.useEffect(() => {
    switch(faction) {
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
  }, [faction]);

  /*return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
      <label style={{float: 'left', marginBottom: '20px', marginRight: '1em' }}>{props.faction}</label>
      <Grid style={{ maxWidth: '90%' }} container direction='row' xl spacing={8}>
      {cards.map((card) => {
        return (
        <Grid item xl justifyContent='space-between'>
          <PlayerCard imageLocation={card.imageLocation}/>
        </Grid>
        );
      })}
      </Grid>
    </div>
  )*/
  return <div></div>
}

export default PlayerCardHolder;