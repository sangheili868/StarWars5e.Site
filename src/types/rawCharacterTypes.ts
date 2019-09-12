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

export interface RawClassType {
  isStartingClass: true,
  class: string,
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
    silverTongue: {
      language: string,
      intSkillBonus: string
    },
    forcePowers?: string[]
  },
  abilityScoreImprovements: ({
    type: string,
    name: string
  } | {
    type: string,
    abilitiesIncreased: {
      name: string,
      value: number
    }[]
  })[]
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
  }
}
