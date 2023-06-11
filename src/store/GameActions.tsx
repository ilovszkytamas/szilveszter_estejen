import { CardData } from "../utils/Types";
import { GameReducerActionType } from "./GameContext";

export enum GameAction {
  ADD_CHARACTER = 'ADD_CHARACTER',
  REMOVE_CHARACTER = 'REMOVE_CHARACTER'
}

export const addCharacter = (payload: CardData): GameReducerActionType => ({
  type: GameAction.ADD_CHARACTER,
  payload
})

export const removeCharacter = (payload: string): GameReducerActionType => ({
  type: GameAction.REMOVE_CHARACTER,
  payload
})