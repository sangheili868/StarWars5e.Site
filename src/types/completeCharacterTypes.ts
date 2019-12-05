import { PowerType } from '@/types/characterTypes'
import { EquipmentType } from '@/types/lootTypes'
import { TweaksType } from './rawCharacterTypes'
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
  resting: {
    hitDieBonus: number,
    numHitDiceUsed: number,
    hitDiceRestored: {
      size: string,
      numRestored: number
    }[],
    maxForcePoints: number,
    maxTechPoints: number,
    maxSuperiorityDice: number,
    shortRestFeatures: string[],
    longRestFeatures: string[]
  }
}

export interface CastingType {
  currentPoints: number,
  maxPoints: number,
  attackModifier: number,
  saveDC: number,
  maxPowerLevel: number,
  powersKnown: PowerType[]
}

export interface CharacteristicsType {
  placeOfBirth: string,
  age: string,
  gender: string,
  height: string,
  weight: string,
  hair: string,
  eyes: string,
  skin: string,
  appearance: string,
  personalityTraits: string,
  ideal: string,
  bond: string,
  flaw: string
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
  user: string,
  currentLevel: number,
  classes: {
    name: string,
    levels: number,
    archetype: string
  }[],
  alignment: string,
  species: string,
  background: string,
  experiencePoints: {
    previousLevel: number,
    current: number,
    nextLevel: number
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
  languages: string[],
  characteristics: CharacteristicsType,
  backstory: string,
  items: EquipmentType[],
  credits: number,
  carryingCapacity: {
    encumbered: number,
    heavilyEncumbered: number,
    maxCapacity: number,
    pushDragLift: number
  },
  superiority: SuperiorityType,
  techCasting: CastingType,
  forceCasting: CastingType,
  combatFeatures: CompletedFeatureType[],
  nonCombatFeatures: CompletedFeatureType[],
  tweaks: TweaksType,
  customProficiencies: string[],
  customFeatures: {
    name: string,
    content: string
  }[]
}
