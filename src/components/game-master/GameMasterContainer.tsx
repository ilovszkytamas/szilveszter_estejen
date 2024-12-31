import { Button, List, ListItem, ListItemText } from "@material-ui/core"
import React from "react";
import { GameContext } from "../../store/GameContext";
import { Checkbox } from "@mui/material";
import { Character, GameStep } from "../../utils/Types";
import { changeGameStep } from "../../store/GameActions";
import { SetWithContentEquality } from "../../utils/SetWithContentEquality";

interface LocalCharacterData {
  character: Character,
  isAlive: boolean
}

const GameMasterContainer: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { gameStep } = state;
  const { selectedCards } = state;
  const [characterChanges, setCharacterChanges] = React.useState<SetWithContentEquality<LocalCharacterData>>(new SetWithContentEquality<LocalCharacterData>(localCharacterData => localCharacterData.character));

  React.useEffect(() => {
    setCharacterChanges(new SetWithContentEquality<LocalCharacterData>(localCharacterData => localCharacterData.character));
  }, [gameStep]);

  const onNewGameClick = () => {
    localStorage.removeItem('gameState');
    window.location.reload();
  }

  const onBackClick = () => {
    dispatch(changeGameStep(GameStep.PENDING_GAME));
  }

  const onSaveClick = () => {
    
  }

  const onCheckboxChange = (event: React.ChangeEvent, targetCharacter: Character) => {
    
  }

  return (
    <>
      <div>
        <List>
          <div>
            <ListItem
              key={'titles'}
              style={{ color: 'black' }}
            >
              <ListItemText primary={'Karakter'} />
              <ListItemText primary={'Játékos'} />
              <ListItemText primary={'Él-e'} />
            </ListItem>
          </div>
          {selectedCards.map((card) => {
            return (
              <div style={{ maxWidth: '75%' }}>
                <ListItem
                  key={card.character}
                  style={{ color: 'black' }}
                >
                  <ListItemText primary={`${card.character} ${card.isWelded ? "(hegesztett)" : ""}`} />
                  <ListItemText primary={card.playerName} />
                  <Checkbox onChange={(e) => onCheckboxChange(e, card.character)} defaultChecked = {card.isAlive}/>
                </ListItem>
              </div>
            )
          })}
        </List>
      </div>
      <Button onClick={onBackClick} style={{backgroundColor: 'purple', marginTop: '100px', marginRight: '50px'}}>VISSZA A JÁTÉKBA</Button>
      <Button onClick={onSaveClick} style={{backgroundColor: 'purple', marginTop: '100px'}}>MENTÉS</Button>
      <br></br>
      <Button onDoubleClick={onNewGameClick} style={{backgroundColor: 'purple', marginTop: '100px'}}>ÚJ JÁTÉK KEZDÉSE</Button>
    </>
  )
}

export default GameMasterContainer;