import React from "react";
import { GameContext } from "../store/GameContext";
import { AbilityType, CardData, Character } from "../utils/Types";
import { hitAbility, killCharacter } from "../store/GameActions";

export default function useCharacterAction() {
    const { dispatch } = React.useContext(GameContext);
    const hitAction = (initiator: CardData, action: AbilityType, target: Character) => {
        switch(action) {
            case AbilityType.DONFATER_KILL: donfaterKill(initiator, target); break;
            case AbilityType.BOSSZUALLO_KILL: avengerKill(initiator, target); break;
            case AbilityType.DOKTOR_GYOGYITAS: doctorHeal(initiator, target); break;
            case AbilityType.DINOIDOMAR_KILL: dinoidomarKill(target); break;
            case AbilityType.DEMOGORGON_KILL: demogorgonKill(initiator, target); break;
            case AbilityType.ALKIMISTA_BOMBA: alchemistBomb(initiator, target); break;
            case AbilityType.ALKIMISTA_GYOGYITAL: alchemistHeal(initiator, target); break;
            case AbilityType.ALKIMISTA_SZIKLABOR: alchemistShield(initiator, target); break;
            case AbilityType.TESTOR_VEDES: bodyguardProtect(initiator, target); break;
            case AbilityType.TOLVAJ_LOPAS: thiefSteal(initiator, target); break;
            case AbilityType.FANATIKUS_KILL: fanaticKill(initiator, target); break;
        }
    }

    const donfaterKill = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.DONFATER_KILL, target]));
        }
    }

    const avengerKill = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.BOSSZUALLO_KILL, target]));
        }
    }

    const doctorHeal = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.DOKTOR_GYOGYITAS, target]));
        }
    }

    const dinoidomarKill = (target: Character) => {
        dispatch(killCharacter(target));
    }

    const demogorgonKill = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.DEMOGORGON_KILL, target]));
        }
    }

    const alchemistBomb = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.ALKIMISTA_BOMBA, target]));
        }
    }

    const alchemistHeal = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.ALKIMISTA_GYOGYITAL, target]));
        }
    }

    const alchemistShield = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.ALKIMISTA_SZIKLABOR, target]));
        }
    }

    const bodyguardProtect = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.TESTOR_VEDES, target]));
        }
    }

    const thiefSteal = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            dispatch(hitAbility([initiator.character, AbilityType.TOLVAJ_LOPAS, target]));
        }
    }

    const fanaticKill = (initiator: CardData, target: Character) => {
        if (!initiator.effects.includes(AbilityType.TOLVAJ_LOPAS)) {
            console.log("kill")
            dispatch(hitAbility([initiator.character, AbilityType.FANATIKUS_KILL, target]));
        }
    }

    return { hitAction }
}
