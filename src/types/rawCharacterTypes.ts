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

export interface RawClassType {
  isStartingClass: boolean,
  name: string,
  levels: number,
  hitPoints: number[],
  toolProficiency?: string,
  skills: string[],
  fightingStyle?: string,
  techPowers?: string[],
  maneuvers?: string[],
  discoveries?: {
    name: string
  }[],
  expertise?: string[],
  archetype: {
    name: string,
    silverTongue?: {
      language: string,
      intSkillBonus: string
    },
    forcePowers?: string[]
  },
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
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
  },
  background: RawBackgroundType,
  characteristics: RawCharacteristicsType,
  equipment: RawEquipmentType[]
}
