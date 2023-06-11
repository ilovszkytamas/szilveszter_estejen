import { GameAction } from "./GameActions";
import { GameReducerType } from "./GameContext";

export const gameReducer: GameReducerType = (prevState, action) => {
  switch(action.type) {
    case GameAction.ADD_CHARACTER: {
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
    default: return prevState;
  }
}