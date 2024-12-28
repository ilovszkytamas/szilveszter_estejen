import React from "react";
import { GameContext } from "../store/GameContext";
import { AbilityType, Character } from "../utils/Types";
import { hitAbility, killCharacter } from "../store/GameActions";

export default function useCharacterAction() {
    const { dispatch } = React.useContext(GameContext);
    const hitAction = (initiator: Character, action: AbilityType, target: Character) => {
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
        }
    }

    const donfaterKill = (initiator: Character, target: Character) => {
        dispatch(hitAbility([initiator, AbilityType.DONFATER_KILL, target]))
    }

    const avengerKill = (initiator: Character, target: Character) => {
        dispatch(hitAbility([initiator, AbilityType.BOSSZUALLO_KILL, target]))
    }

    const doctorHeal = (initiator: Character, target: Character) => {
        dispatch(hitAbility([initiator, AbilityType.DOKTOR_GYOGYITAS, target]))
    }

    const dinoidomarKill = (target: Character) => {
        dispatch(killCharacter(target));
    }

    const demogorgonKill = (initiator: Character, target: Character) => {
        dispatch(hitAbility([initiator, AbilityType.DEMOGORGON_KILL, target]))
    }

    const alchemistBomb = (initiator: Character, target: Character) => {
        dispatch(hitAbility([initiator, AbilityType.ALKIMISTA_BOMBA, target]))
    }

    const alchemistHeal = (initiator: Character, target: Character) => {
        dispatch(hitAbility([initiator, AbilityType.ALKIMISTA_GYOGYITAL, target]))
    }

    const alchemistShield = (initiator: Character, target: Character) => {
        dispatch(hitAbility([initiator, AbilityType.ALKIMISTA_SZIKLABOR, target]))
    }

    const bodyguardProtect = (initiator: Character, target: Character) => {
        dispatch(hitAbility([initiator, AbilityType.TESTOR_VEDES, target]))
    }

    return { hitAction }
}
