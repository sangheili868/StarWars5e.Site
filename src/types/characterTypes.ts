/*
  PowerType
  SpeciesType
    AbilitiesIncreasedType
  FeatType
*/

import { FeatureConfigType } from "./rawCharacterTypes"

export interface ArchetypeType {
  className: string,
  contentSource: string,
  contentType: string,
  leveledTable: {
    [level: string]: {
      key: string,
      value: string
    }[]
  },
  leveledTableHeaders: string[]
  name: string,
  casterType: string, // None, Force, Tech
  classCasterType: string,
  casterRatio: number, // 0, 0.33333333
  text: string,
  text2: string,
}

export interface BackgroundTableRowType {
  name: string,
  roll: number,
  description: string
}

export interface BackgroundType {
  bondOptions: BackgroundTableRowType[],
  contentSource: string,
  contentType: string,
  equipment: string,
  featOptions: BackgroundTableRowType[],
  featureName: string,
  featureText: string,
  flavorDescription: string,
  flavorName: string,
  flavorOptions: BackgroundTableRowType[],
  flavorText: string,
  flawOptions: BackgroundTableRowType[],
  idealOptions: BackgroundTableRowType[],
  languages: string,
  name: string,
  personalityTraitOptions: BackgroundTableRowType[],
  skillProficiencies: string,
  suggestedCharacteristics: string,
  toolProficiencies: string
}

export interface ClassType {
  contentSource: string,
  contentType: string,
  archetypeFlavorName: string
  archetypeFlavorText: string
  archetypes: any[]
  armorProficiencies: string[]
  classFeatureText: string
  classFeatureText2?: string
  creatingText: string
  equipmentLines: string[]
  flavorText: string
  hitDiceDieType: number
  hitPointsAtFirstLevel: string
  hitPointsAtFirstLevelNumber: number,
  hitPointsAtHigherLevels: string
  hitPointsAtHigherLevelsNumber: number,
  levelChangeHeadersJson: string
  levelChanges: any,
  multiClassProficiencies: string[]
  casterType: string, // None, Force, Tech
  casterRatio: number, // 0, 0.33333333, 0.5, 0.6666666667, 1
  name: string
  primaryAbility: string
  quickBuildText: string
  rowKey: string
  savingThrows: string[]
  skillChoices: string
  startingWealthVariant: string
  summary: string
  toolProficiencies: string[]
  weaponProficiencies: string[]
}

export interface PowerType {
  name: string,
  castingPeriod: string,
  castingPeriodText: string,
  concentration: boolean,
  contentSource: string,
  contentType: string,
  description: string,
  duration: string,
  forceAlignment: string,
  level: number,
  powerType: string,
  range: string,
  prerequisite: string,
  config: any
}

export interface ManeuverType {
  name: string,
  type: string,
  contentSource: string,
  contentType: string,
  prerequisite: string,
  description: string
}

export interface AbilitiesIncreasedType {
  abilities: string[],
  amount: number
}

export interface SpeciesType {
  abilitiesIncreased: AbilitiesIncreasedType[][],
  contentSource: string,
  contentType: string,
  colorScheme: string,
  distinctions: string,
  eyeColorOptions: string,
  flavorText: string,
  hairColorOptions: string,
  halfHumanTableEntries: { [species: string]: string },
  heightAverage: string,
  heightRollMod: string,
  homeworld: string,
  language: string,
  manufacturer: string,
  name: string,
  skinColorOptions: string,
  traits: {
    description: string,
    name: string
  }[],
  weightAverage: string,
  weightRollMod: string,
  size: string
}

export interface FeatType {
  text: string,
  contentSource: string,
  contentType: string,
  name: string,
  rowKey: string,
  prerequisite: string,
  attributesIncreased: string[]
}

export interface FightingMasteryType {
  text: string,
  name: string,
  contentSource: string,
  contentType: string
}

export interface FightingStyleType {
  name: string,
  description: string,
  contentSource: string,
  contentType: string
}

export interface LightsaberFormType {
  name: string,
  description: string,
  contentSource: string,
  contentType: string
}

export interface FeatureType {
  name: string,
  level: number,
  text: string,
  source: string,
  sourceName: string,
  metadata: string,
  config?: FeatureConfigType
}

export interface ClassImprovementType {
  name: string,
  description: string,
  contentSource: string,
  contentType: string,
  prerequisite: string
}

export interface SplashclassImprovementType {
  name: string,
  description: string,
  contentSource: string,
  contentType: string,
  prerequisite: string
}

export interface MulticlassImprovementType {
  name: string,
  description: string,
  contentSource: string,
  contentType: string,
  prerequisite: string
}

export interface WeaponFocusType {
  name: string,
  description: string,
  contentSource: string,
  contentType: string
}
export interface WeaponSupremacyType {
  name: string,
  description: string,
  contentSource: string,
  contentType: string
}
