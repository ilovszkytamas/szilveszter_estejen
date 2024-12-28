import * as React from 'react';
import { CardData, GameStep, TimeOfDay } from '../utils/Types';
import { gameReducer } from './GameReducer';
import { INITIAL_ORDER } from '../utils/DataCollections';

export type GameReducerActionType = {
  type: string;
  payload?: any;
}

export type GameStateType = {
  selectedCards: CardData[];
  gameStep: GameStep,
  finalisedOrder: CardData[],
  dayCount: number,
  timeOfDay: TimeOfDay
}

export const initialState: GameStateType = {
  selectedCards: [],
  gameStep: GameStep.CHARACTER_SELECTION,
  finalisedOrder: INITIAL_ORDER,
  dayCount: 1,
  timeOfDay: TimeOfDay.NIGHT
}

export type GameContextType = {
  state: GameStateType;
  dispatch: React.Dispatch<GameReducerActionType>;
}

export type GameReducerType = {
  (state: GameStateType, action: GameReducerActionType): GameStateType;
}

export const GameContext = React.createContext<GameContextType>({ state: initialState } as GameContextType)

export const GameContextProvider: React.FC = (props) => {
  const { children } = props;

  const [ state, dispatch ] = React.useReducer(gameReducer, initialState);

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}