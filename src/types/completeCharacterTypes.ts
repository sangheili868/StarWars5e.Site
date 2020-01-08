import { PowerType } from '@/types/characterTypes'
import { EquipmentType } from '@/types/lootTypes'
import { TweaksType, CustomProficiencyType, HighLevelCastingType } from './rawCharacterTypes'
import { ConditionType } from './lookupTypes'

export interface AbilityScoreType {
  value: number,
  modifier: number,
  savingThrow: {
    modifier: number,
    proficiency: string
  },
  skills: {
    name: string,
    modifier: number,
    proficiency: string
  }[]
}

export interface HitPointsType {
  maximum: number,
  current: number,
  temporary: number,
  hitDice: {
    size: string,
    current: number,
    maximum: number
  }[],
  deathSaves: {
    successes: number,
    failures: number
  },
  resting: {
    hitDieBonus: number,
    numHitDiceUsed: number,
    hitDiceRestored: {
      size: string,
      numRestored: number
    }[],
    shortRestFeatures: string[],
    longRestFeatures: string[],
    highLevelCasting: HighLevelCastingType,
    techPointsUsed: number,
    forcePointsUsed: number
  }
}

export interface CastingType {
  pointsUsed: number,
  maxPoints: number,
  maxPowerLevel: number,
  powersKnown: PowerType[]
}

export interface TechCastingType extends CastingType {
  attackModifier: number,
  saveDC: number
}

export interface ForceCastingType extends CastingType {
  lightAttackModifier: number,
  lightSaveDC: number,
  darkAttackModifier: number,
  darkSaveDC: number,
  universalAttackModifier: number,
  universalSaveDC: number
}

export interface CharacteristicsType {
  'Personality Traits': string,
  Ideal: string,
  Bond: string,
  Flaw: string,
  Gender: string,
  'Place of Birth': string,
  Age: string,
  Height: string,
  Weight: string,
  Hair: string,
  Eyes: string,
  Skin: string,
  Appearance: string,
  Backstory: string
}

export interface SuperiorityType {
  currentDice: number,
  maxDice: number,
  diceSize: string,
  maneuverSaveDC: number,
  maneuvers: {
    name: string,
    description: string
  }[]
}

export interface CompletedFeatureType {
  name: string,
  description: string,
  combat: boolean,
  customIndex?: number,
  usage?: {
    recharge: string,
    used: number,
    maximum: number
  }
}

export interface AbilityScoresType {
  [ability: string]: AbilityScoreType
}

export interface CompleteCharacterType {
  name: string,
  image: string | null,
  currentLevel: number,
  classes: {
    name: string,
    levels: number,
    archetype?: string
  }[],
  alignment: string,
  species: string,
  background: string,
  experiencePoints: {
    previousLevel: number,
    current: number,
    nextLevel: number,
    isCorrect: boolean,
    errorMessage: string
  },
  abilityScores: AbilityScoresType,
  proficiencyBonus: number,
  initiative: number,
  armorClass: number,
  hitPoints: HitPointsType,
  conditions: ConditionType[],
  exhaustion: number,
  passivePerception: number,
  inspiration: boolean,
  vision: string,
  speed: {
    base: string,
    hour: string,
    day: string,
    special: string
  },
  proficiencies: string[],
  skillAndSaveProficiencies: string[],
  languages: string[],
  characteristics: CharacteristicsType,
  equipment: EquipmentType[],
  weapons: EquipmentType[],
  credits: number,
  carryingCapacity: {
    encumbered: number,
    heavilyEncumbered: number,
    maxCapacity: number,
    pushDragLift: number
  },
  superiority: false | SuperiorityType,
  techCasting: false | TechCastingType,
  highLevelCasting: HighLevelCastingType,
  forceCasting: false | ForceCastingType,
  combatFeatures: CompletedFeatureType[],
  nonCombatFeatures: CompletedFeatureType[],
  tweaks: TweaksType,
  customLanguages: string[],
  customProficiencies: CustomProficiencyType[],
  customFeatures: {
    name: string,
    content: string
  }[],
  customTechPowers: string[],
  customForcePowers: string[],
  numCustomFeats: number
}
