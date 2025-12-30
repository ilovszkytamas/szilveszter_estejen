import { Button, List, ListItem, ListItemText, Checkbox, TextField } from '@mui/material'
import React from "react";
import { GameContext } from "../../store/GameContext";
import { AbilityType, Character, GameMasterActionType, GameStep, LocalCharacterChangeData } from "../../utils/Types";
import { changeGameStep, assignPlayerToCharacter, finaliseWelding, setAliveStatus, setAbilityUsage, setBosszaualloKillEnabledStatus, setDemonDoszpodAlreadyDiedStatus } from "../../store/GameActions";
import NewGameModal from './NewGameModal'
import WeldChangeModal from './WeldChangeModal'
import AbilityUsageModal from './AbilityUsageModal'
import ReviewChangesModal from './ReviewChangesModal'

const GameMasterContainer: React.FC = () => {
  const { state, dispatch } = React.useContext(GameContext);
  const { selectedCards } = state;
  const [localCharacterChanges, setLocalCharacterChanges] = React.useState<LocalCharacterChangeData[]>([]);
  const [weldModalOpen, setWeldModalOpen] = React.useState<boolean>(false);
  const [abilityModalOpen, setAbilityModalOpen] = React.useState<boolean>(false);
  const [reviewModalOpen, setReviewModalOpen] = React.useState<boolean>(false);

  const onNewGameClick = () => {
    localStorage.removeItem('gameState');
    window.location.reload();
  }

  const onBackClick = () => {
    dispatch(changeGameStep(GameStep.PENDING_GAME));
  }

  const onSaveClick = () => {
    setReviewModalOpen(true);
  }

  const pendingAliveByCharacter = React.useMemo(() => {
    const map = new Map<Character, boolean>();
    for (const c of localCharacterChanges) {
      if (c.gameMasterActionType === GameMasterActionType.TOGGLE_ALIVE_STATUS && c.character) {
        map.set(c.character, Boolean(c.newValue));
      }
    }
    return map;
  }, [localCharacterChanges]);

  // pending rename overrides so the UI shows edited names immediately
  const pendingNameByCharacter = React.useMemo(() => {
    const map = new Map<Character, string>();
    for (const c of localCharacterChanges) {
      if (c.gameMasterActionType === GameMasterActionType.RENAME_PLAYER && c.character && typeof c.newValue === 'string') {
        map.set(c.character, c.newValue);
      }
    }
    return map;
  }, [localCharacterChanges]);

  const onNameChange = (character: Character, newName: string) => {
    const characterChangeData: LocalCharacterChangeData = {
      gameMasterActionType: GameMasterActionType.RENAME_PLAYER,
      character,
      newValue: newName
    };
    setLocalCharacterChanges(prev => {
      const filtered = prev.filter(p => !(p.gameMasterActionType === GameMasterActionType.RENAME_PLAYER && p.character === character));
      return [...filtered, characterChangeData];
    });
    console.log('Rename queued', character, newName);
  };

  const onAliveCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, targetCharacter: Character) => {
    const newAlive = event.target.checked;
    const characterChangeData: LocalCharacterChangeData = {
      gameMasterActionType: GameMasterActionType.TOGGLE_ALIVE_STATUS,
      character: targetCharacter,
      newValue: newAlive
    };
    
    setLocalCharacterChanges(prev => {
      const filtered = prev.filter(p => !(p.gameMasterActionType === GameMasterActionType.TOGGLE_ALIVE_STATUS && p.character === targetCharacter));
      return [...filtered, characterChangeData];
    });
    console.log('Alive status change queued', targetCharacter, newAlive);
  }

  const onWeldChangeClick = () => setWeldModalOpen(true);

  const onAbilityUsageChangeClick = () => setAbilityModalOpen(true);

  const handleWeldConfirm = (pair: { first: Character; second: Character }) => {
    const characterChangeData: LocalCharacterChangeData = {
      gameMasterActionType: GameMasterActionType.CHANGE_WELD_STATUS,
      newValue: [pair.first, pair.second]
    };
    setLocalCharacterChanges([...localCharacterChanges, characterChangeData]);
    console.log('Weld change confirmed', pair);
  };

  const handleAbilityConfirm = (payload: { character: Character; abilityKey: AbilityType; newValue: number | boolean }) => {
    const characterChangeData: LocalCharacterChangeData = {
      character: payload.character,
      abilityType: payload.abilityKey,
      gameMasterActionType: GameMasterActionType.TOGGLE_ABILITY_USED,
      newValue: payload.newValue
    };
    setLocalCharacterChanges([...localCharacterChanges, characterChangeData]);
    console.log('Ability change confirmed', payload);
  };

  const handleReviewConfirm = (changes: LocalCharacterChangeData[]) => {
    console.log('Applying changes:', changes);
    for (const c of changes) {
      switch (c.gameMasterActionType) {
        case GameMasterActionType.RENAME_PLAYER:
          if (c.character && typeof c.newValue === 'string') {
            dispatch(assignPlayerToCharacter([c.character, c.newValue]));
          }
          break;
        case GameMasterActionType.TOGGLE_ALIVE_STATUS:
          if (c.character && typeof c.newValue === 'boolean') {
            dispatch(setAliveStatus({ character: c.character, isAlive: c.newValue }));
          }
          break;
        case GameMasterActionType.CHANGE_WELD_STATUS:
          if (Array.isArray(c.newValue)) {
            dispatch(finaliseWelding(c.newValue as Character[]));
          }
          break;
        case GameMasterActionType.TOGGLE_ABILITY_USED:
          if (c.character && c.abilityType && typeof c.newValue === 'number') {
            dispatch(setAbilityUsage({ character: c.character, abilityType: c.abilityType, newValue: c.newValue }));
          } else if (c.character && c.abilityType && typeof c.newValue === 'boolean') {
            if (c.abilityType === AbilityType.BOSSZUALLO_KILL) {
              dispatch(setBosszaualloKillEnabledStatus(c.newValue));
            }
            else if (c.abilityType === AbilityType.DEMONDOSZPOD_TULELES) {
              dispatch(setDemonDoszpodAlreadyDiedStatus(c.newValue));
            }
          }
          break;
        default:
          console.warn('Unhandled game master change:', c);
      }
    }
    setLocalCharacterChanges([]);
    setReviewModalOpen(false);
  };

  return (
    <>
      <div>
        <List>
          <ListItem key={'titles'} style={{ display: 'flex', alignItems: 'center', color: 'black' }}>
            <ListItemText primary={'Karakter'} style={{ flex: 3 }} />
            <ListItemText primary={'Játékos'} style={{ flex: 2 }} />
            <div style={{ flex: 1, textAlign: 'center', fontWeight: 600 }}>Él-e</div>
          </ListItem>

          {selectedCards.map((card) => {
            return (
              <ListItem
                key={card.character}
                style={{ display: 'flex', alignItems: 'center', color: 'black' }}
              >
                <ListItemText primary={`${card.character} ${card.isWelded ? "(hegesztett)" : ""}`} style={{ flex: 3 }} />
                <div style={{ flex: 2 }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    value={pendingNameByCharacter.has(card.character) ? pendingNameByCharacter.get(card.character)! : (card.playerName ?? '')}
                    onChange={(e) => onNameChange(card.character, e.target.value)}
                  />
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <Checkbox
                    onChange={(e) => onAliveCheckboxChange(e, card.character)}
                    checked={pendingAliveByCharacter.has(card.character) ? pendingAliveByCharacter.get(card.character)! : !!card.isAlive}
                  />
                </div>
              </ListItem>
            )
          })}
        </List>
      </div>
      <Button onClick={onWeldChangeClick} disabled={!selectedCards.find(card => card.character === Character.HEGESZTO1 || card.character === Character.HEGESZTO2)} style={{backgroundColor: 'purple', marginTop: '100px', marginRight: '50px'}}>HEGESZTÉS MEGVÁLTOZATÁSA</Button>
      <Button onClick={onAbilityUsageChangeClick} style={{backgroundColor: 'purple', marginTop: '100px', marginRight: '50px'}}>ABILITY HASZNÁLAT VÁLTOZTATÁS</Button>
      <Button onClick={onBackClick} style={{backgroundColor: 'purple', marginTop: '100px', marginRight: '50px'}}>VISSZA A JÁTÉKBA</Button>
      <Button onClick={onSaveClick} style={{backgroundColor: 'purple', marginTop: '100px'}}>MENTÉS</Button>
      <br />
      <NewGameModal
        buttonStyle={{ backgroundColor: 'purple', marginTop: '100px' }}
        onConfirm={onNewGameClick}
      />

      <WeldChangeModal
        open={weldModalOpen}
        selectedCards={selectedCards}
        onClose={() => setWeldModalOpen(false)}
        onConfirm={handleWeldConfirm}
      />

      <AbilityUsageModal
        open={abilityModalOpen}
        selectedCards={selectedCards}
        onClose={() => setAbilityModalOpen(false)}
        onConfirm={handleAbilityConfirm}
      />

      <ReviewChangesModal
        open={reviewModalOpen}
        changes={localCharacterChanges}
        selectedCards={selectedCards}
        onClose={() => setReviewModalOpen(false)}
        onConfirm={handleReviewConfirm}
      />
    </>
  )
}

export default GameMasterContainer;