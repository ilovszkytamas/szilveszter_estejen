import { AbilityType, CardData, Character, Faction } from "./Types";

const DONFATER_ACTION = "Donfater választhat kit öl meg";
const TOLVAJ_ACTION = "Tolvaj választhat egy szereplőt akinek meggátolja a cselekvését";
const SOFOR_ACTION = "Sofőr választhat két szereplőt akiket megcserélne";
const TESTOR_ACTION = "Testőr választhat kit véd meg";
const DETEKTIV_ACTION = "Detektív megvizsgálhat valakit";
const SZIMATOLO_ACTION = "Szimatoló megvizsgálhat valakit";
const DEMOGORGON_ACTION = "Demogorgon/Démon Doszpod választhat kit öl meg";
const BOSSZUALLO_ACTION = "Bosszúálló választhat kit öl meg";
const FANATIKUS_ACTION = "Fanatikus megvizsgálhat egy szereplőt, valamint meg is ölheti ha szeretné";
const DOKTOR_ACTION = "Doktor választhat valakit akit meggyógyít";
const ALKIMISTA_ACTION = "Alkimista dönthet, megszeretne-e gyógyítani egy szereplőt vagy használni a méreg bombáját vagy használni a sziklabőr italát";
const DINOIDOMAR_ACTION = "Dínóidomár választhat valakit akit magával visz a halálba";
const TEKNOS_ACTION = 'TEKNOS_ACTION';

// evil
export const DONFATER1: CardData = {imageLocation: "/images/Csalárd Csanádok/Bódikám-Don fater/Búdikám_Donfater.png", faction: Faction.EVIL, character: Character.DONFATER1, abilities: [{ abilityType: AbilityType.DONFATER_KILL, usageCountTotal: 0 }], actionDescription: DONFATER_ACTION};
export const DONFATER2: CardData = {imageLocation: "/images/Csalárd Csanádok/Bódikám-Don fater/Szabikám_Donfater.png", faction: Faction.EVIL, character: Character.DONFATER2, abilities: [{ abilityType: AbilityType.DONFATER_KILL, usageCountTotal: 0 }], actionDescription: DONFATER_ACTION};
export const BOKDOSO1: CardData = {imageLocation: "/images/Csalárd Csanádok/Bökdöső-Gyilkos/Bökdöső_Gyilkos1.png", faction: Faction.EVIL, character: Character.BOKDOSO1, abilities: [{ abilityType: AbilityType.DONFATER_KILL, usageCountTotal: 0 }], actionDescription: DONFATER_ACTION};
export const BOKDOSO2: CardData = {imageLocation: "/images/Csalárd Csanádok/Bökdöső-Gyilkos/Bökdöső_Gyilkos2.png", faction: Faction.EVIL, character: Character.BOKDOSO2, abilities: [{ abilityType: AbilityType.DONFATER_KILL, usageCountTotal: 0 }], actionDescription: DONFATER_ACTION};
export const BOKDOSO3: CardData = {imageLocation: "/images/Csalárd Csanádok/Bökdöső-Gyilkos/Bökdöső_Gyilkos3.png", faction: Faction.EVIL, character: Character.BOKDOSO3, abilities: [{ abilityType: AbilityType.DONFATER_KILL, usageCountTotal: 0 }], actionDescription: DONFATER_ACTION};
export const SZIMATOLO1: CardData = {imageLocation: "/images/Csalárd Csanádok/Szimatoló-Kém/Szimatoló_kém1.png", faction: Faction.EVIL, character: Character.SZIMATOLO1, actionDescription: SZIMATOLO_ACTION};
export const SZIMATOLO2: CardData = {imageLocation: "/images/Csalárd Csanádok/Szimatoló-Kém/Szimatoló_kém2.png", faction: Faction.EVIL, character: Character.SZIMATOLO2, actionDescription: SZIMATOLO_ACTION};
export const TOLVAJ1: CardData = {imageLocation: "/images/Csalárd Csanádok/Zsebmetsző-Tolvaj 1/Zsebmetsző_Tolvaj1.png", faction: Faction.EVIL, character: Character.TOLVAJ1, abilities: [{ abilityType: AbilityType.TOLVAJ_LOPAS, usageCountTotal: 0 }], actionDescription: TOLVAJ_ACTION};
export const TOLVAJ2: CardData = {imageLocation: "/images/Csalárd Csanádok/Zsivány-Tolvaj 2/Zsivány1_Tolvaj2.png", faction: Faction.EVIL, character: Character.TOLVAJ2, abilities: [{ abilityType: AbilityType.TOLVAJ_LOPAS, usageCountTotal: 0 }], actionDescription: TOLVAJ_ACTION};
export const TOLVAJ3: CardData = {imageLocation: "/images/Csalárd Csanádok/Zsivány-Tolvaj 2/Zsivány2_Tolvaj2.png", faction: Faction.EVIL, character: Character.TOLVAJ3, abilities: [{ abilityType: AbilityType.TOLVAJ_LOPAS, usageCountTotal: 0 }], actionDescription: TOLVAJ_ACTION};

// neutral
export const BOLOND: CardData = {imageLocation: "/images/Sejtelmes Sikkasztók/Agyalágyult-Bolond/Agyalágyult_Bolond.png", faction: Faction.NEUTRAL, character: Character.BOLOND};
export const FANATIKUS: CardData = {imageLocation: "/images/Sejtelmes Sikkasztók/Fanatikus/Fanatikus.png", faction: Faction.NEUTRAL, character: Character.FANATIKUS, abilities: [{ abilityType: AbilityType.FANATIKUS_KILL, usageCountTotal: 0 }], actionDescription: FANATIKUS_ACTION};
export const KOTYVASZTÓ1: CardData = {imageLocation: "/images/Sejtelmes Sikkasztók/Kotyvasztó-Alkimista/Kotyvasztó_Alkimista.png", faction: Faction.NEUTRAL, character: Character.KOTYVASZTÓ1, abilities: [{ abilityType: AbilityType.ALKIMISTA_BOMBA, usageCountTotal: 0 }, { abilityType: AbilityType.ALKIMISTA_GYOGYITAL, usageCountTotal: 0 }, { abilityType: AbilityType.ALKIMISTA_SZIKLABOR, usageCountTotal: 0 }], actionDescription: ALKIMISTA_ACTION};
export const KOTYVASZTÓ2: CardData = {imageLocation: "/images/Sejtelmes Sikkasztók/Kotyvasztó-Alkimista/Kotyvasztó_Alkimista2.png", faction: Faction.NEUTRAL, character: Character.KOTYVASZTÓ2, abilities: [{ abilityType: AbilityType.ALKIMISTA_BOMBA, usageCountTotal: 0 }, { abilityType: AbilityType.ALKIMISTA_GYOGYITAL, usageCountTotal: 0 }, { abilityType: AbilityType.ALKIMISTA_SZIKLABOR, usageCountTotal: 0 }], actionDescription: ALKIMISTA_ACTION};
export const DEMOGORGON1: CardData = {imageLocation: "/images/Sejtelmes Sikkasztók/Semleges Gyilkos/Demogorgon_semleges_Gyilkos.png", faction: Faction.NEUTRAL, character: Character.DEMOGORGON1, abilities: [{ abilityType: AbilityType.DEMOGORGON_KILL, usageCountTotal: 0 }], actionDescription: DEMOGORGON_ACTION};
export const DEMOGORGON2: CardData = {imageLocation: "/images/Sejtelmes Sikkasztók/Semleges Gyilkos/DemonikusDoszpod.png", faction: Faction.NEUTRAL, character: Character.DEMOGORGON2, abilities: [{ abilityType: AbilityType.DEMOGORGON_KILL, usageCountTotal: 0 }], actionDescription: DEMOGORGON_ACTION};

// villager
export const BOSSZUALLO: CardData = {imageLocation: "/images/Falusi Ficsúrok/Bosszúálló/Bosszúálló.png", faction: Faction.VILLAGER, character: Character.BOSSZUALLO, abilities: [{ abilityType: AbilityType.BOSSZUALLO_KILL, usageCountTotal: 0 }], actionDescription: BOSSZUALLO_ACTION};
export const DOKTOR1: CardData = {imageLocation: "/images/Falusi Ficsúrok/Ceci Néni-Doktor 1/Ceci_néni_Doktor1.png", faction: Faction.VILLAGER, character: Character.DOKTOR1, abilities: [{ abilityType: AbilityType.DOKTOR_GYOGYITAS, usageCountTotal: 0 }], actionDescription: DOKTOR_ACTION};
export const DOKTOR2: CardData = {imageLocation: "/images/Falusi Ficsúrok/Dr. Bubó-Doktor 2/Dr_Bubó_Doktor2.png", faction: Faction.VILLAGER, character: Character.DOKTOR2, abilities: [{ abilityType: AbilityType.DOKTOR_GYOGYITAS, usageCountTotal: 0 }], actionDescription: DOKTOR_ACTION};
export const DINOIDOMAR: CardData = {imageLocation: "/images/Falusi Ficsúrok/Dinóidomár-vadász/Dínóidomár_Vadász.png", faction: Faction.VILLAGER, character: Character.DINOIDOMAR, abilities: [{ abilityType: AbilityType.DINOIDOMAR_KILL, usageCountTotal: 0 }], actionDescription: DINOIDOMAR_ACTION};
export const DETEKTIV1: CardData = {imageLocation: "/images/Falusi Ficsúrok/Flúgos Monk-Detektív 1/Flugós_Monk_Detektív1.png", faction: Faction.VILLAGER, character: Character.DETEKTIV1, actionDescription: DETEKTIV_ACTION};
export const DETEKTIV2: CardData = {imageLocation: "/images/Falusi Ficsúrok/Sherlock-Detektív 2/Sherlock_Detektív2.png", faction: Faction.VILLAGER, character: Character.DETEKTIV2, actionDescription: DETEKTIV_ACTION};
export const HEGESZTO1: CardData = {imageLocation: "/images/Falusi Ficsúrok/Hegesztő/Hegesztő.png", faction: Faction.VILLAGER, character: Character.HEGESZTO1};
export const HEGESZTO2: CardData = {imageLocation: "/images/Falusi Ficsúrok/Hegesztő/kovácsmester.png", faction: Faction.VILLAGER, character: Character.HEGESZTO2};
export const PARASZT1: CardData = {imageLocation: "/images/Falusi Ficsúrok/Paraszt/Paraszt.png", faction: Faction.VILLAGER, character: Character.PARASZT1};
export const PARASZT2: CardData = {imageLocation: "/images/Falusi Ficsúrok/Paraszt/Paraszt1.png", faction: Faction.VILLAGER, character: Character.PARASZT2};
export const SOFOR: CardData = {imageLocation: "/images/Falusi Ficsúrok/Sofőr/Sofőr.png", faction: Faction.VILLAGER, character: Character.SOFOR, abilities: [{ abilityType: AbilityType.SOFOR_CSERE, usageCountTotal: 0 }], actionDescription: SOFOR_ACTION};
export const TEKNOS: CardData = {imageLocation: "/images/Falusi Ficsúrok/Teknős/Teknős.png", faction: Faction.VILLAGER, character: Character.TEKNOS, abilities: [{ abilityType: AbilityType.TEKNOS_CIGI, usageCountTotal: 0 }], actionDescription: TEKNOS_ACTION};
export const TESTOR1: CardData = {imageLocation: "/images/Falusi Ficsúrok/Testőr/Testőr1.png", faction: Faction.VILLAGER, character: Character.TESTOR1, abilities: [{ abilityType: AbilityType.TESTOR_VEDES, usageCountTotal: 0 }], actionDescription: TESTOR_ACTION};
export const TESTOR2: CardData = {imageLocation: "/images/Falusi Ficsúrok/Testőr/Testőr2.png", faction: Faction.VILLAGER, character: Character.TESTOR2, abilities: [{ abilityType: AbilityType.TESTOR_VEDES, usageCountTotal: 0 }], actionDescription: TESTOR_ACTION};

export const EVIL_CARDS: CardData[] = [DONFATER1, DONFATER2, BOKDOSO1, BOKDOSO2, BOKDOSO3, SZIMATOLO1, SZIMATOLO2, TOLVAJ1, TOLVAJ2, TOLVAJ3];
export const NEUTRAL_CARDS: CardData[] = [BOLOND, FANATIKUS, KOTYVASZTÓ1, KOTYVASZTÓ2, DEMOGORGON1, DEMOGORGON2];
export const VILLAGER_CARDS: CardData[] = [BOSSZUALLO, DOKTOR1, DOKTOR2, DINOIDOMAR, DETEKTIV1, DETEKTIV2, HEGESZTO1, HEGESZTO2, PARASZT1, PARASZT2, SOFOR, TEKNOS, TESTOR1, TESTOR2];

export const EVERY_CARD: CardData[] = [...EVIL_CARDS, ...NEUTRAL_CARDS, ...VILLAGER_CARDS];

export const INITIAL_ORDER: CardData[] = [
    SOFOR,
    TOLVAJ1,
    TOLVAJ2,
    TOLVAJ3,
    TESTOR1,
    TESTOR2,
    DETEKTIV1,
    DETEKTIV2,
    SZIMATOLO1,
    SZIMATOLO2,
    DEMOGORGON1,
    DONFATER1,
    DONFATER2,
    BOKDOSO1,
    BOKDOSO2,
    BOKDOSO3,
    BOSSZUALLO,
    FANATIKUS,
    DOKTOR1,
    DOKTOR2,
    KOTYVASZTÓ1,
    KOTYVASZTÓ2,
    DEMOGORGON2,
]