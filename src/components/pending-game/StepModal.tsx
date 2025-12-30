import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material';
import React from 'react';
import { GameContext } from '../../store/GameContext';
import { AbilityType, CardData, Character, CharacterAbility, Faction } from '../../utils/Types';
import useCharacterAction from '../../hooks/useCharacterAction';
import { finalizeNight } from '../../store/GameActions';
import resolveNight from '../../utils/nightResolution';
import { DINOIDOMAR } from '../../utils/DataCollections';

enum ModalState {
  PENDING_NIGHT = 'PENDING_NIGHT',
  CONCLUDE_NIGHT = 'CONCLUDE_NIGHT',
  DINOIDOMAR_DEAD = 'DINOIDOMAR_DEAD'
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
  const [currentKilledCharacters, setCurrentKilledCharacters] = React.useState<Character[]>([]);
  const [pendingResolution, setPendingResolution] = React.useState<any | null>(null);
  const [isNightConcluded, setNightConcluded] = React.useState<boolean>(false);

  const handleOpen = () => {
    setModalOpen(true);
  }
  console.log(state)
  const handleClose = () => {
    setModalOpen(false);
  }

  const handleNext = () => {
    if (currentTarget && currentAbility) {
      const initiator = selectedCards.find(card => card.character === finalisedOrder[currentIndex].character);
      hitAction(initiator!, currentAbility, currentTarget)
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
    // Use centralized resolver to compute the authoritative night resolution
    const provisional = resolveNight(state);
    // If Dínóidomár is among the kills, pause to let the Dínóidomár choose its victim
    if (provisional.kills.includes(Character.DINOIDOMAR)) {
      // show killed characters excluding Dínóidomár until the player picks a target
      setCurrentKilledCharacters(provisional.kills.filter(kill => kill !== Character.DINOIDOMAR));
      setPendingResolution(provisional);
      setCurrentModalState(ModalState.DINOIDOMAR_DEAD);
      setNightConcluded(true);
      return;
    }

    // no Dínóidomár special-case: apply result immediately
    dispatch(finalizeNight(provisional));
    setCurrentKilledCharacters(provisional.kills);
    setNightConcluded(true);
  }

  const handleCharacterAction = (abilityType: AbilityType) => {
    setTargetSelectorOpen(true);
    setCurrentAbility(abilityType);
    if (abilityType === AbilityType.ALKIMISTA_SZIKLABOR) {
      setAvailableTargets([selectedCards.find(card => card.character === Character.KOTYVASZTÓ1 || card.character === Character.KOTYVASZTÓ2)!])
    } else {
      setAvailableTargets(selectedCards.filter(card => card.isAlive));
    }
  }

  const handleTargetChange = (event: any) => {
    setCurrentTarget(event.target.value);
  }

  const handleWakeUp = () => {
    setModalOpen(false);
    setCurrentKilledCharacters([]);
    setNightConcluded(false);
    props.onWakeUp();
  }

  const isAbilityButtonDisabled = (characterAbility: CharacterAbility, card: CardData): boolean => {
    console.log(card);
    if (characterAbility.abilityType === AbilityType.ALKIMISTA_BOMBA && characterAbility.usageCountTotal >= 1) {
      return true;
    }
    else if (characterAbility.abilityType === AbilityType.ALKIMISTA_GYOGYITAL && characterAbility.usageCountTotal >= 2) {
      return true;
    }
    else if (characterAbility.abilityType === AbilityType.ALKIMISTA_SZIKLABOR && characterAbility.usageCountTotal >= 1) {
      return true;
    }
    else if (card.character === Character.BOSSZUALLO && !card.isBosszualloKillEnabled) {
      return true;
    } else {
      return false;
    }
  }

  const getCurrentCharacter = (): CardData => {
    return selectedCards.find(card => card.character === finalisedOrder[currentIndex].character)!;
  }

  const dinoidomarSelect = () => {
    if (!currentTarget) return;
    // If we have a pending provisional resolution, apply the Dínóidomár choice to it
    if (pendingResolution) {
      const chosen = currentTarget as Character;
      // start from provisional updatedSelectedCards
      let finalUpdated = pendingResolution.updatedSelectedCards.map((c: CardData) => ({ ...c }));
      const toKill = new Set<Character>();
      toKill.add(Character.DINOIDOMAR);
      toKill.add(chosen);
      // include welded partner if applicable
      const chosenCard = finalUpdated.find((c: CardData) => c.character === chosen);
      if (chosenCard?.isWelded) {
        const weldedOther = finalUpdated.find((c: CardData) => c.isWelded && c.character !== chosen);
        if (weldedOther) toKill.add(weldedOther.character);
      }

      finalUpdated = finalUpdated.map((c: CardData) => toKill.has(c.character) ? { ...c, isAlive: false } : c);
      const killsArray = Array.from(toKill);
      const finalResult = { updatedSelectedCards: finalUpdated, kills: killsArray };
      dispatch(finalizeNight(finalResult));
      setCurrentKilledCharacters(killsArray);
      setPendingResolution(null);
      setCurrentModalState(ModalState.CONCLUDE_NIGHT);
      setNightConcluded(true);
      return;
    }
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

  if (!getCurrentCharacter()) {
    return <></>;
  }

  return (
    <>
      <Button onClick={handleOpen} style={{backgroundColor: 'orange', marginLeft: '15px'}}>KARAKTER DÖNTÉSEK</Button>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {currentModalState === ModalState.CONCLUDE_NIGHT && <>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }}>
            Véget ért az éjszaka, nézzük meg kik haltak meg
            </Typography>
            <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }}>
              {!isNightConcluded && <Button type={'submit'} onClick={handleConcludeNight} style={{ backgroundColor: 'red', color: 'white', marginTop: '30px' }}>ÉJSZAKA LEZÁRÁSA</Button>}
            </Typography>
            {isNightConcluded && currentKilledCharacters && <>Megölt karakterek: {currentKilledCharacters.join(", ")}</>}
            {isNightConcluded && !pendingResolution && <Button onClick={handleWakeUp} style={{ backgroundColor: 'red', color: 'white', marginTop: '30px' }}>REGGEL MEGKEZDÉSE, TIME TO HANG SOMEONE</Button>}
          </>}
          {
            currentModalState === ModalState.PENDING_NIGHT && <>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }}>
                {getCurrentCharacter().isAlive ? "[ÉLŐ]" : "[DEAD]"} {getCurrentCharacter().actionDescription}
              </Typography>
              <Typography id="modal-modal-description" style={{ display: 'flex' }}>
                {getCurrentCharacter().abilities?.map((ability) => {
                  return (<Button disabled={!getCurrentCharacter().isAlive || isAbilityButtonDisabled(ability, getCurrentCharacter())} onClick={() => handleCharacterAction(ability.abilityType)} style={{ backgroundColor: 'black', color: 'white', marginRight: '10px', textDecorationLine: !getCurrentCharacter().isAlive || isAbilityButtonDisabled(ability, getCurrentCharacter()) ? 'line-through' : 'none' }}>{ability.abilityType}</Button>)
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
          {
            currentModalState === ModalState.DINOIDOMAR_DEAD && <>
              <Typography id="modal-modal-title" variant="h6" component="h2" style={{ textAlign: 'center', marginBottom: '30px' }}>
                {DINOIDOMAR.actionDescription}
              </Typography>
              <Typography id="modal-modal-description" style={{ display: 'flex' }}>
                {DINOIDOMAR.abilities?.map((ability) => {
                  return (<Button disabled={!currentTarget} onClick={dinoidomarSelect} style={{ backgroundColor: 'black', color: 'white', marginRight: '10px', textDecorationLine: !getCurrentCharacter().isAlive || isAbilityButtonDisabled(ability, finalisedOrder[currentIndex]) ? 'line-through' : 'none' }}>{ability.abilityType}</Button>)
                })}
              </Typography>
              {<div>
                <FormControl style={{ width: '300px', marginBottom: '10px', marginTop: '10px' }}>
                  <InputLabel>Válassz célpontot az actionhöz</InputLabel>
                  <Select
                    id="demo-simple-select"
                    label="Targets"
                    value={currentTarget}
                    onChange={handleTargetChange}
                  >
                    {selectedCards.map(target => {
                      if (target.isAlive && target.character !== getCurrentCharacter().character) {
                        return (<MenuItem value={target.character}>{target.character + '-' + target.playerName}</MenuItem>)
                      }
                    })}
                  </Select>
                </FormControl>
              </div>}
              {/* Confirm button for Dínóidomár so user doesn't get stuck after selecting a target */}
              {pendingResolution && currentTarget && <Button onClick={dinoidomarSelect} style={{ backgroundColor: 'orange', color: 'black', marginTop: '10px' }}>DÍNÓIDOMÁR DÖNTÉS VÉGLEGESÍTÉS</Button>}
              {isNightConcluded && !pendingResolution && <Button onClick={handleWakeUp} style={{ backgroundColor: 'red', color: 'white', marginTop: '30px' }}>REGGEL MEGKEZDÉSE, TIME TO HANG SOMEONE</Button>}
            </>
          }
        </Box>
      </Modal>
    </>
  )
}