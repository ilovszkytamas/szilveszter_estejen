export enum Faction {
  EVIL = "Csalárd Csanád",
  NEUTRAL = "Sejtelmes sikkasztó",
  VILLAGER = "Falusi ficsúr"
}

export enum Character {
  DONFATER1 = 'DONFATER1',
  DONFATER2 = 'DONFATER2',
  BOKDOSO1 = 'BOKDOSO1',
  BOKDOSO2 = 'BOKDOSO2',
  BOKDOSO3 = 'BOKDOSO3',
  SZIMATOLO1 = 'SZIMATOLO1',
  SZIMATOLO2 = 'SZIMATOLO2', 
  TOLVAJ1 = 'TOLVAJ1',
  TOLVAJ2 = 'TOLVAJ2',
  TOLVAJ3 = 'TOLVAJ3',
  BOLOND = 'BOLOND',
  FANATIKUS = 'FANATIKUS',
  KOTYVASZTÓ1 = 'KOTYVASZTÓ1',
  KOTYVASZTÓ2 = 'KOTYVASZTÓ2',
  DEMOGORGON1 = 'DEMOGORGON1',
  DEMOGORGON2 = 'DEMOGORGON2',
  BOSSZUALLO = 'BOSSZUALLO',
  DOKTOR1 = 'DOKTOR1',
  DOKTOR2 = 'DOKTOR2',
  DINOIDOMAR = 'DINOIDOMAR',
  DETEKTIV1 = 'DETEKTIV1',
  DETEKTIV2 = 'DETEKTIV2',
  HEGESZTO1 = 'HEGESZTO1',
  HEGESZTO2 = 'HEGESZTO2',
  PARASZT1 = 'PARASZT1',
  PARASZT2 = 'PARASZT2',
  SOFOR = 'SOFOR',
  TEKNOS = 'TEKNOS',
  TESTOR1 = 'TESTOR1',
  TESTOR2 = 'TESTOR2'
}

export enum GameStep {
  CHARACTER_SELECTION = 'CHARACTER_SELECTION',
  PLAYER_SELECTION = 'PLAYER_SELECTION',
  PENDING_GAME = 'PENDING_GAME'
}

export type CardData = {
  faction: Faction,
  character: Character,
  playerName?: string,
  isAlive?: boolean,
  imageLocation: string,
  isWelded?: boolean
}