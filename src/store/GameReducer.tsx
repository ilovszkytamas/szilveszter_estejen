import { AbilityType, CardData, Character } from "../utils/Types";
import { GameAction } from "./GameActions";
import { GameReducerType } from "./GameContext";

export const gameReducer: GameReducerType = (prevState, action) => {
  switch(action.type) {
    case GameAction.ADD_CHARACTER: {
      //TODO: remove later
      action.payload.playerName = "lófaszjóska"
      return {
        ...prevState,
        selectedCards: [...prevState.selectedCards, action.payload]
      }
    }
    case GameAction.REMOVE_CHARACTER: {
      return {
        ...prevState,
        selectedCards: prevState.selectedCards.filter(item => item.character !== action.payload)
      }
    }
    case GameAction.CHANGE_GAME_STEP: {
      return {
        ...prevState,
        gameStep: action.payload
      }
    }
    case GameAction.ASSIGN_PLAYER_TO_CHARACTER: {
      return {
        ...prevState,
        selectedCards: prevState.selectedCards.map((card) => card.character === action.payload[0] ? {...card, playerName: action.payload[1]} : card)
      }
    }
    case GameAction.FINALISE_WELDING: {
      return {
        ...prevState,
        selectedCards: prevState.selectedCards.map((card) => card.character === action.payload[0] || card.character === action.payload[1] ? {...card, isWelded: true} : card)
      }
    }
    case GameAction.FINALISE_ORDER: {
      return {
        ...prevState,
        finalisedOrder: action.payload
      }
    }
    case GameAction.HIT_ABILITY: {
      return {
        ...prevState,
        selectedCards: handleAbility(action.payload[0], action.payload[1], action.payload[2], prevState.selectedCards)
      }
    }
    case GameAction.RESET_EFFECTS: {
      return {
        ...prevState,
        selectedCards: prevState.selectedCards.map((card) => {
          return {
            ...card,
            effects: card.character === Character.DEMONDOSZPOD && !card.hasDemonDoszpodAlreadyDiedOnce ? [AbilityType.DEMONDOSZPOD_TULELES] : []
          }
        })
      }
    }
    case GameAction.KILL_CHARACTER: {
      return {
        ...prevState,
        selectedCards: prevState.selectedCards.map((card) => card.character === action.payload ? {...card, isAlive: false} : card)
      }
    }
    case GameAction.SET_DAY_COUNT: {
      return {
        ...prevState,
        dayCount: action.payload
      }
    }
    case GameAction.SET_TIME_OF_DAY: {
      return {
        ...prevState,
        timeOfDay: action.payload
      }
    }
    case GameAction.SET_DEMON_DOSZPOD_ALREADY_DIED_ONCE_STATUS: {
      return {
        ...prevState,
        selectedCards: prevState.selectedCards.map((card) => card.character === Character.DEMONDOSZPOD ? {...card, hasDemonDoszpodAlreadyDiedOnce: action.payload} : card)
      }
    }
    case GameAction.SET_BOSSZUALLO_KILL_ENABLED_STATUS: {
      return {
        ...prevState,
        selectedCards: prevState.selectedCards.map((card) => card.character === Character.BOSSZUALLO ? {...card, isBosszualloKillEnabled: action.payload} : card)
      }
    }
    case GameAction.LOAD_GAME_STATE_FROM_LOCAL_STORAGE: return action.payload
    default: return prevState;
  }
}

const handleAbility = (initiator: Character, ability: AbilityType, target: Character, selectedCards: CardData[]) => {
  let tempCards = selectedCards.map((card) => card.character === target ? {...card, effects: [...card.effects, ability]} : card);
  let usedAbility = selectedCards.find(cards => cards.character === initiator)?.abilities?.find(currentAbility => currentAbility.abilityType === ability);
  usedAbility!.usageCountTotal = usedAbility!.usageCountTotal + 1;
  
  return tempCards;
}