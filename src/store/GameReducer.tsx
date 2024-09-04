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
    default: return prevState;
  }
}