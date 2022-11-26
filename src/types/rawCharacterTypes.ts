import { CharacterProficiency } from './completeCharacterTypes'

export interface RawSpeciesType {
  name: string,
  abilityScoreImprovementSelectedOption: number,
  abilityScoreImprovement: {
    [abilityScore: string]: number
  },
  language?: string
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
  forcePowers?: string[],
  techPowers?: string[],
  maneuvers?: string[]
}

export interface RawASIType {
  type: string,
  abilitiesIncreased: {
    name: string,
    value: number
  }[]
}

export interface RawClassType {
  name: string,
  levels: number,
  hitPoints: number[],
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
  abilityScoreImprovements: (RawFeatType | RawASIType)[]
}

export interface RawBackgroundType {
  name: string,
  skills?: string[],
  languages?: string[],
  feature?: string, // Only used for custom background
  feat: RawFeatType
}

export interface RawCharacteristicsType {
  alignment: string,
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

export interface FeatureConfigType {
  localId: string
  configType: string,
  featureRowKey: string,
  data: any
}

export interface EquipmentTweakType {
  toHit?: TweakType,
  damageDice?: TweakType,
  damage?: TweakType
}

export interface TweakPathType {
  name: string,
  path: string,
  type?: 'dice' | 'proficiency'
}

export interface RawEquipmentType {
  name: string,
  category: 'Equipment' | 'EnhancedItem',
  quantity: number,
  equipped?: boolean,
  tweaks?: EquipmentTweakType,
  attuned?: boolean
}

export interface TweakType {
  override?: number,
  bonus?: number,
  dieSize?: number,
  proficiency?: 'Proficient' | 'Expertise' | null
}

export interface TweaksType {
  abilityScores?: {
    [ability: string]: {
      score?: TweakType,
      savingThrowModifier?: TweakType,
      skills?: {
        [name: string]: TweakType
      }
    }
  },
  initiative?: TweakType,
  proficiencyBonus?: TweakType,
  armorClass?: TweakType,
  weapon?: {
    toHit?: TweakType,
    damage?: TweakType
  }
  unarmed?: EquipmentTweakType
  hitPoints?: {
    maximum?: TweakType,
    hitDice?: {
      [size: string]: TweakType
    }
  },
  passivePerception?: TweakType,
  vision?: TweakType,
  speed?: {
    base?: TweakType
  },
  techCasting?: {
    maxPoints?: TweakType,
    attackModifier?: TweakType,
    saveDC?: TweakType,
    maxPowerLevel?: TweakType
  },
  forceCasting?: {
    maxPoints?: TweakType,
    lightAttackModifier?: TweakType,
    lightSaveDC?: TweakType,
    darkAttackModifier?: TweakType,
    darkSaveDC?: TweakType,
    universalAttackModifier?: TweakType,
    universalSaveDC?: TweakType,
    maxPowerLevel?: TweakType
  }
  superiority?: {
    maxDice?: TweakType,
    physicalModifier?: TweakType,
    physicalSaveDC?: TweakType
    mentalModifier?: TweakType,
    mentalSaveDC?: TweakType
    generalModifier?: TweakType,
    generalSaveDC?: TweakType
  }
}

export type ProficiencyType = 'armor' | 'weapon' | 'tool' | 'other'

export interface CustomProficiencyType {
  name: string,
  type?: ProficiencyType
  proficiencyLevel: 'proficiency' | 'expertise'
}

export type AbilityScoreMethodType = 'Standard Array' | 'Point Buy' | 'Manual'

export interface HighLevelCastingType {
  level6: boolean,
  level7: boolean,
  level8: boolean,
  level9: boolean
}

export interface SettingsType {
  isEnforcingForcePrerequisites: boolean,
  isFixedHitPoints: boolean,
  abilityScoreMethod: AbilityScoreMethodType | string // Added | string to avoid error when importing JSON
}

export type CustomEquipmentCategoryType = 'Weapon' | 'Armor' | 'Gear'

export interface CustomEquipmentType extends RawEquipmentType {
  equipmentCategory: CustomEquipmentCategoryType,
  cost: number,
  description: string,
  weight: number,
  damageType?: string,
  damageNumberOfDice?: number
}

export interface CharacterResult {
  id: string,
  userId: string,
  jsonData: string
}

export interface RawCharacterType {
  name: string,
  id: string,
  localId?: string,
  userId: string,
  builderVersion: string,
  image: string,
  experiencePoints: number,
  species: RawSpeciesType,
  classes: RawClassType[],
  baseAbilityScores: {
    [ability: string]: number
  },
  background: RawBackgroundType,
  characteristics: RawCharacteristicsType,
  credits: number,
  equipment: RawEquipmentType[],
  currentStats: {
    hitPointsLost: number,
    temporaryHitPoints: number,
    techPointsUsed: number,
    forcePointsUsed: number,
    superiorityDiceUsed: number,
    hitDiceUsed: {
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
    },
    conditions: string[],
    exhaustion: number,
    highLevelCasting: HighLevelCastingType
  },
  featureConfigs: FeatureConfigType[],
  tweaks: TweaksType,
  customLanguages: string[],
  customProficiencies: CustomProficiencyType[],
  customFeats: string[],
  customFeatures: {
    name: string,
    content: string
  }[],
  customTechPowers: string[],
  customForcePowers: string[],
  settings: SettingsType,
  customEquipment: CustomEquipmentType[],
  notes: string,
  createdAt: number,
  changedAt: number
}

export function isCustomProficiency (proficiency: CustomProficiencyType | CharacterProficiency): proficiency is CustomProficiencyType {
  return ['proficiency', 'expertise'].includes((proficiency as CustomProficiencyType).proficiencyLevel)
}
