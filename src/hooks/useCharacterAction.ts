import React from "react";
import { GameContext } from "../store/GameContext";
import { AbilityType, CardData, CharacterAbility, GameStep } from "../utils/Types";
import { removeCharacter } from "../store/GameActions";

export default function useCharacterAction() {
    const { state, dispatch } = React.useContext(GameContext);
    const hitAction = (action: CharacterAbility, target: CardData) => {
        switch(action.abilityType) {
            case AbilityType.DONFATER_KILL: donfaterKill(target); break;
        }
    }

    const donfaterKill = (target: CardData) => {
        console.log("donfaterKill");
        dispatch(removeCharacter("TEKNOS"));
    }

    return { hitAction }
}

/*export const donfaterKill = (target: CardData) => {
    console.log("donfaterKill");
    dispatch(changeGameStep(GameStep.CHARACTER_SELECTION));
}

export const thief = (target: CardData) => {
    console.log("thief");
}*/