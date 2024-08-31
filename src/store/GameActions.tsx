import { CardData, Character, GameStep } from "../utils/Types";
import { GameReducerActionType } from "./GameContext";

export enum GameAction {
  ADD_CHARACTER = 'ADD_CHARACTER',
  REMOVE_CHARACTER = 'REMOVE_CHARACTER',
  CHANGE_GAME_STEP = 'CHANGE_GAME_STEP',
  ASSIGN_PLAYER_TO_CHARACTER = 'ASSIGN_PLAYER_TO_CHARACTER',
  FINALISE_WELDING = 'FINALISE_WELDING'
}

export const addCharacter = (payload: CardData): GameReducerActionType => ({
  type: GameAction.ADD_CHARACTER,
  payload
})

export const removeCharacter = (payload: string): GameReducerActionType => ({
  type: GameAction.REMOVE_CHARACTER,
  payload
})

export const changeGameStep = (payload: GameStep): GameReducerActionType => ({
  type: GameAction.CHANGE_GAME_STEP,
  payload
})

//payload: [character, playerName]
export const assignPlayerToCharacter = (payload: [Character, string]): GameReducerActionType => ({
  type: GameAction.ASSIGN_PLAYER_TO_CHARACTER,
  payload
})

export const finaliseWelding = (payload: Character[]): GameReducerActionType => ({
  type: GameAction.FINALISE_WELDING,
  payload
})