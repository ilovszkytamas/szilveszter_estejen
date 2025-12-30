import { AbilityType, CardData, Character, GameStep, TimeOfDay } from "../utils/Types";
import { GameReducerActionType, GameStateType } from "./GameContext";
import type { NightResolutionResult } from '../utils/nightResolution';

export enum GameAction {
  ADD_CHARACTER = 'ADD_CHARACTER',
  REMOVE_CHARACTER = 'REMOVE_CHARACTER',
  CHANGE_GAME_STEP = 'CHANGE_GAME_STEP',
  ASSIGN_PLAYER_TO_CHARACTER = 'ASSIGN_PLAYER_TO_CHARACTER',
  FINALISE_WELDING = 'FINALISE_WELDING',
  FINALISE_ORDER = 'FINALISE_ORDER',
  HIT_ABILITY = 'HIT_ABILITY',
  RESET_EFFECTS = 'RESET_EFFECTS',
  KILL_CHARACTER = 'KILL_CHARACTER',
  LOAD_GAME_STATE_FROM_LOCAL_STORAGE = 'LOAD_GAME_STATE_FROM_LOCAL_STORAGE',
  SET_DAY_COUNT = 'SET_DAY_COUNT',
  SET_TIME_OF_DAY = 'SET_TIME_OF_DAY',
  SET_DEMON_DOSZPOD_ALREADY_DIED_ONCE_STATUS = 'SET_DEMON_DOSZPOD_ALREADY_DIED_ONCE_STATUS',
  SET_BOSSZUALLO_KILL_ENABLED_STATUS = 'SET_BOSSZUALLO_KILL_ENABLED_STATUS'
  ,NIGHT_RESOLVED = 'NIGHT_RESOLVED'
  ,SET_ALIVE_STATUS = 'SET_ALIVE_STATUS'
  ,SET_ABILITY_USAGE = 'SET_ABILITY_USAGE'
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

export const finaliseOrder = (payload: CardData[]): GameReducerActionType => ({
  type: GameAction.FINALISE_ORDER,
  payload
})

//payload: [initiator, effect, target]
export const hitAbility = (payload: [Character, AbilityType, Character]): GameReducerActionType => ({
  type: GameAction.HIT_ABILITY,
  payload
})

export const resetEffects = (): GameReducerActionType => ({
  type: GameAction.RESET_EFFECTS,
})

export const killCharacter = (payload: Character): GameReducerActionType => ({
  type: GameAction.KILL_CHARACTER,
  payload
})

export const loadGameStateFromLocalStorage = (payload: GameStateType): GameReducerActionType => ({
  type: GameAction.LOAD_GAME_STATE_FROM_LOCAL_STORAGE,
  payload
})

export const setDayCount = (payload: number): GameReducerActionType => ({
  type: GameAction.SET_DAY_COUNT,
  payload
})

export const setTimeOfDay = (payload: TimeOfDay): GameReducerActionType => ({
  type: GameAction.SET_TIME_OF_DAY,
  payload
})

export const setDemonDoszpodAlreadyDiedStatus = (payload: boolean): GameReducerActionType => ({
  type: GameAction.SET_DEMON_DOSZPOD_ALREADY_DIED_ONCE_STATUS,
  payload
})

export const setBosszaualloKillEnabledStatus = (payload: boolean): GameReducerActionType => ({
  type: GameAction.SET_BOSSZUALLO_KILL_ENABLED_STATUS,
  payload
})

export const finalizeNight = (payload: NightResolutionResult): GameReducerActionType => ({
  type: GameAction.NIGHT_RESOLVED,
  payload
})

export const setAliveStatus = (payload: { character: Character; isAlive: boolean }): GameReducerActionType => ({
  type: GameAction.SET_ALIVE_STATUS,
  payload
})

export const setAbilityUsage = (payload: { character: Character; abilityType: AbilityType; newValue: number }): GameReducerActionType => ({
  type: GameAction.SET_ABILITY_USAGE,
  payload
})