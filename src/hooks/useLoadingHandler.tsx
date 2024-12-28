import React from "react";
import { GameContext } from "../store/GameContext";
import { loadGameStateFromLocalStorage } from "../store/GameActions";

export default function useLoadingHandler() {
  const { state, dispatch } = React.useContext(GameContext);

  React.useEffect(() => {
    if (localStorage.getItem('gameState')) {
      dispatch(loadGameStateFromLocalStorage(JSON.parse(localStorage.getItem('gameState') as string)))
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(state));
  }, [state]);
}
