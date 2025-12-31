import { CardData, AbilityType, Character, Faction } from './Types';
import { GameStateType } from '../store/GameContext';

export type NightOverrides = {
  extraKills?: Character[]
}

export type NightResolutionResult = {
  updatedSelectedCards: CardData[];
  kills: Character[];
  notes?: string[];
}

const killAbilities = new Set<AbilityType>([
  AbilityType.DONFATER_KILL,
  AbilityType.DEMOGORGON_KILL,
  AbilityType.BOSSZUALLO_KILL,
  AbilityType.FANATIKUS_KILL,
  AbilityType.ALKIMISTA_BOMBA,
  AbilityType.DINOIDOMAR_KILL
]);

const healAbilities = new Set<AbilityType>([
  AbilityType.ALKIMISTA_GYOGYITAL,
  AbilityType.ALKIMISTA_SZIKLABOR,
  AbilityType.DOKTOR_GYOGYITAS,
  AbilityType.TESTOR_VEDES,
  AbilityType.TEKNOS_CIGI
]);

export function resolveNight(gameState: GameStateType, overrides?: NightOverrides): NightResolutionResult {
  const selectedCards = gameState.selectedCards;
  // initial marked for death: has a kill ability and not healed/protected
  let marked = selectedCards.filter(card => {
    const hasKill = card.effects.some(e => killAbilities.has(e));
    const hasHeal = card.effects.some(e => healAbilities.has(e));
    return hasKill && !hasHeal;
  });

  // incorporate overrides (e.g. dino chosen targets)
  if (overrides?.extraKills?.length) {
    overrides.extraKills.forEach(ch => {
      const card = selectedCards.find(c => c.character === ch);
      if (card && !marked.find(m => m.character === ch)) marked.push(card);
    });
  }

  // if any welded character is marked, include other welded partners
  const anyWeldedMarked = marked.some(c => c.isWelded);
  if (anyWeldedMarked) {
    const weldedPartners = selectedCards.filter(c => c.isWelded && !marked.find(m => m.character === c.character));
    if (weldedPartners.length) {
      marked = [...marked, ...weldedPartners];
    }
  }

  // handle Bosszúálló: if a VILLAGER used bosszuallo kill, disable bosszuallo kill
  let updated = selectedCards.map(c => ({ ...c } as CardData));
  const bosszualloUsedForVillager = marked.find(card => card.effects.includes(AbilityType.BOSSZUALLO_KILL) && card.faction === Faction.VILLAGER);
  if (bosszualloUsedForVillager) {
    console.log('Disabling Bosszúálló kill ability as it was used by a Villager');
    updated = updated.map(card => card.character === Character.BOSSZUALLO ? { ...card, isBosszualloKillEnabled: false } : card);
  }

  // handle Demon Doszpod: survive once
  const demon = marked.find(card => card.character === Character.DEMONDOSZPOD);
  if (demon && !demon.hasDemonDoszpodAlreadyDiedOnce) {
    // Demon survives this time, mark its flag
    updated = updated.map(card => card.character === Character.DEMONDOSZPOD ? { ...card, hasDemonDoszpodAlreadyDiedOnce: true } : card);
    // remove demon from marked deaths
    marked = marked.filter(card => card.character !== Character.DEMONDOSZPOD);
  }

  // final kills list
  const kills = marked.map(c => c.character);

  // apply isAlive=false for killed characters
  updated = updated.map(card => kills.includes(card.character) ? { ...card, isAlive: false } : card);
  console.log(updated);
  return {
    updatedSelectedCards: updated,
    kills,
    notes: []
  };
}

export default resolveNight;
