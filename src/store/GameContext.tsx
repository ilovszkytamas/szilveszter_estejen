import * as React from 'react';
import { CardData, GameStep } from '../utils/Types';
import { gameReducer } from './GameReducer';

export type GameReducerActionType = {
  type: string;
  payload: any;
}

export type GameStateType = {
  selectedCards: CardData[];
  gameStep: GameStep,
  finalisedOrder: CardData[]
}

export const initialState: GameStateType = {
  selectedCards: [],
  gameStep: GameStep.CHARACTER_SELECTION,
  finalisedOrder: []
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