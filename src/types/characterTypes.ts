/*
  PowerType
  SpeciesType
    AbilitiesIncreasedType
  FeatType
*/

export interface ArchetypeType {
  className: string,
  contentType: string,
  leveledTable: {
    [key: string]: {
      [key: string]: string
    }
  },
  leveledTableHeaders: string[]
  name: string,
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
  hitPointsAtHigherLevels: string
  levelChangeHeadersJson: string
  levelChanges: any
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
  contentType: string,
  description: string,
  duration: string,
  forceAlignment: string,
  level: number,
  powerType: string,
  range: string,
  prerequisite: string
}

export interface ManeuverType {
  name: string,
  classes: string[],
  description: string
}

export interface AbilitiesIncreasedType {
  abilities: string[],
  amount: number
}

export interface SpeciesType {
  abilitiesIncreased: AbilitiesIncreasedType[][]
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
  contentType: string,
  name: string,
  prerequisites: string,
  attributesIncreased: string[]
}
