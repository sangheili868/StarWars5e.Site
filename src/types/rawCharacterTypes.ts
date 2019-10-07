export interface RawSpeciesType {
  name: string,
  abilityScoreImprovement: {
    [abilityScore: string]: number
  },
  toolProficiency: string,
  skillProficiency: string,
  weaponProficiency: string,
  language: string
}

export interface RawFeatType {
  type: string,
  name: string,
  abilityScoreImprovements?: {
    [ability: string]: number
  }
}

export interface RawArchetypeType {
  name: string,
  silverTongue?: {
    language: string,
    intSkillBonus: string
  },
  forcePowers?: string[],
  techPowers?: string[],
  maneuvers?: string[]
}

export interface RawClassType {
  isStartingClass: boolean,
  name: string,
  levels: number,
  hitPoints: number[],
  toolProficiency?: string,
  skills: string[],
  fightingStyle?: string,
  techPowers?: string[],
  forcePowers?: string[],
  maneuvers?: string[],
  discoveries?: {
    name: string
  }[],
  expertise?: string[],
  archetype?: RawArchetypeType,
  abilityScoreImprovements?: (RawFeatType | {
    type: string,
    abilitiesIncreased: {
      name: string,
      value: number
    }[]
  })[]
}

export interface RawBackgroundType {
  name: string,
  skills: string[],
  toolProficiencies?: string[],
  languages?: string[],
  feat: RawFeatType
}

export interface RawCharacteristicsType {
  placeOfBirth: string,
  alignment: string,
  personalityTraits: string,
  ideal: string,
  bond: string,
  flaw: string,
  age: string,
  gender: string,
  height: string,
  weight: string,
  hair: string,
  eyes: string,
  skin: string,
  appearance: string,
  backstory: string
}

export interface RawEquipmentType {
  name: string,
  quantity: number,
  equipped?: boolean
}

export interface RawCharacterType {
  name: string,
  image: string,
  experiencePoints: number,
  species: RawSpeciesType,
  classes: RawClassType[],
  baseAbilityScores: {
    [ability: string]: number
  },
  background: RawBackgroundType,
  characteristics: RawCharacteristicsType,
  equipment: RawEquipmentType[],
  currentStats: {
    hitPoints: number,
    temporaryHitPoints: number,
    techPoints: number,
    forcePoints: number,
    superiorityDice: number,
    hitDice: {
      d6?: number,
      d8?: number,
      d10?: number,
      d12?: number
    },
    deathSaves: {
      successes: number,
      failures: number
    },
    hasInspiration: boolean,
    featuresTimesUsed: {
      [feature: string]: number
    }
  }
}
