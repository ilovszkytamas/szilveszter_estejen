import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@material-ui/core';
import React from 'react';
import { GameContext } from '../../store/GameContext';
import { AbilityType, CardData, Character, CharacterAbility } from '../../utils/Types';
import useCharacterAction from '../../hooks/useCharacterAction';
import { killCharacter } from '../../store/GameActions';

enum ModalState {
  PENDING_NIGHT = 'PENDING_NIGHT',
  CONCLUDE_NIGHT = 'CONCLUDE_NIGHT'
}

interface StepModalProps {
  onWakeUp(): void
}

//TODO: this whole shit gotta go
export const StepModal: React.FC<StepModalProps> = (props) => {
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const { state, dispatch } = React.useContext(GameContext);
  const { finalisedOrder, selectedCards } = state;
  const { hitAction } = useCharacterAction()
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [currentModalState, setCurrentModalState] = React.useState<ModalState>(ModalState.PENDING_NIGHT);
  const [isTargetSelectorOpen, setTargetSelectorOpen] = React.useState<boolean>(false);
  const [availableTargets, setAvailableTargets] = React.useState<CardData[]>([]);
  const [currentTarget, setCurrentTarget] = React.useState<Character>();
  const [currentAbility, setCurrentAbility] = React.useState<AbilityType>();
  const [currentKilledCharacters, setCurrentKilledCharacters] = React.useState<CardData[]>();

  const handleOpen = () => {
    setModalOpen(true);
  }
  
  const handleClose = () => {
    setModalOpen(false);
  }
  console.log(finalisedOrder[currentIndex])
  const handleNext = () => {
    if (currentTarget && currentAbility) {
      hitAction(finalisedOrder[currentIndex].character, currentAbility, currentTarget)
    }
    if (currentIndex !== finalisedOrder.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === finalisedOrder.length - 1) {
      setCurrentModalState(ModalState.CONCLUDE_NIGHT);
    }
    setCurrentTarget(undefined);
    setCurrentAbility(undefined);
    setTargetSelectorOpen(false);
  }

  const handleConcludeNight = () => {
    let killedCharacters = selectedCards.filter(
      card => card.effects.find(
        effect => {
          return effect === AbilityType.DONFATER_KILL
            || effect === AbilityType.DEMOGORGON_KILL
            || effect === AbilityType.BOSSZUALLO_KILL
            || effect === AbilityType.FANATIKUS_KILL
            || effect === AbilityType.ALKIMISTA_BOMBA
        }
      ) && !card.effects.find(
        effect => {
          return effect === AbilityType.ALKIMISTA_GYOGYITAL
            || effect === AbilityType.ALKIMISTA_SZIKLABOR
            || effect === AbilityType.DOKTOR_GYOGYITAS
            || effect === AbilityType.TESTOR_VEDES
        }
      )
    )

    const weldedCharacter = killedCharacters.find(character => character.isWelded);

    if (weldedCharacter) {
      const weldedOtherPair = selectedCards.find(card => card.isWelded && card.character !== weldedCharacter.character)!;
      killedCharacters = [...killedCharacters, weldedOtherPair];
    }

    const demonDoszpod = killedCharacters.find(character => Character.DEMONDOSZPOD === character.character);
    if (demonDoszpod && demonDoszpod?.demonDoszpodDeathCount === 0) {
      demonDoszpod.demonDoszpodDeathCount = 1;
      // TODO: fix naming here
      setCurrentKilledCharacters(killedCharacters.filter(character => character.character !== Character.DEMONDOSZPOD));
    } else {
      setCurrentKilledCharacters(killedCharacters);
    }

    killedCharacters.forEach(character => dispatch(killCharacter(character.character)));
  }

  const handleCharacterAction = (abilityType: AbilityType) => {
    setTargetSelectorOpen(true);
    setCurrentAbility(abilityType);
    if (abilityType === AbilityType.ALKIMISTA_SZIKLABOR) {
      setAvailableTargets([selectedCards.find(card => card.character === Character.KOTYVASZTÓ1 || card.character === Character.KOTYVASZTÓ2)!])
    } else {
      setAvailableTargets(selectedCards);
    }
  }

  const handleTargetChange = (event: any) => {
    setCurrentTarget(event.target.value);
  }

  const handleWakeUp = () => {
    setModalOpen(false);
    setCurrentKilledCharacters(undefined);
    props.onWakeUp();
  }

  const isAbilityButtonDisabled = (characterAbility: CharacterAbility): boolean => {
    if (characterAbility.abilityType === AbilityType.ALKIMISTA_BOMBA && characterAbility.usageCountTotal >= 1) {
      return true;
    }
    else if (characterAbility.abilityType === AbilityType.ALKIMISTA_GYOGYITAL && characterAbility.usageCountTotal >= 2) {
      return true;
    }
    else if (characterAbility.abilityType === AbilityType.ALKIMISTA_SZIKLABOR && characterAbility.usageCountTotal >= 1) {
      return true;
    } else {
      return false;
    }
  }

  const getCurrentCharacter = (): CardData => {
    return selectedCards.find(card => card.character === finalisedOrder[currentIndex].character)!;
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Button onClick={handleOpen}>KARAKTER_DÖNTÉSEK</Button>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {currentModalState === ModalState.CONCLUDE_NIGHT && <>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }}>
              Véget ért az éjszaka, nézzük meg kik haltak meg(geci idétlen implementáció, nyomj rá a lezárásra, és csak utána indíts új napot pls)
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }}>
              <Button onClick={handleConcludeNight} style={{ backgroundColor: 'red', color: 'white', marginTop: '30px' }}>ÉJSZAKA LEZÁRÁSA</Button>
            </Typography>
            {currentKilledCharacters && <>Megölt karakterek: {currentKilledCharacters.map(card => (card.character)).join(", ")}</>}
            <Button onClick={handleWakeUp} style={{ backgroundColor: 'red', color: 'white', marginTop: '30px' }}>REGGEL MEGKEZDÉSE, TIME TO HANG SOMEONE</Button>
          </>}
          {
            currentModalState === ModalState.PENDING_NIGHT && <>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }}>
                {getCurrentCharacter().isAlive ? "[ÉLŐ]" : "[DEAD]"} {getCurrentCharacter().actionDescription}
              </Typography>
              <Typography id="modal-modal-description" style={{ display: 'flex' }}>
                {finalisedOrder[currentIndex].abilities?.map((ability) => {
                  return (<Button disabled={!getCurrentCharacter().isAlive || isAbilityButtonDisabled(ability)} onClick={() => handleCharacterAction(ability.abilityType)} style={{ backgroundColor: 'black', color: 'white', marginRight: '10px', textDecorationLine: !getCurrentCharacter().isAlive || isAbilityButtonDisabled(ability) ? 'line-through' : 'none' }}>{ability.abilityType}</Button>)
                })}
              </Typography>
              {isTargetSelectorOpen && <div>
                <FormControl style={{ width: '300px', marginBottom: '10px', marginTop: '10px' }}>
                  <InputLabel>Válassz célpontot az actionhöz</InputLabel>
                  <Select
                    id="demo-simple-select"
                    label="Targets"
                    value={currentTarget}
                    onChange={handleTargetChange}
                  >
                    {availableTargets.map(target => {
                      return (<MenuItem value={target.character}>{target.character + '-' + target.playerName}</MenuItem>)
                    })}
                  </Select>
                </FormControl>
              </div>}
              <Button onClick={handleNext} style={{ backgroundColor: 'red', color: 'white', marginTop: '30px' }}>KÖVETKEZŐ DÖNTÉS</Button>
            </>
          }
        </Box>
      </Modal>
    </>
  )
}