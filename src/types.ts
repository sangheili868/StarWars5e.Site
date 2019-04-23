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

interface backgroundTableRow {
  name: string,
  roll: number,
  description: string
}

export interface BackgroundType {
  bondOptions: backgroundTableRow[],
  contentType: string,
  equipment: string,
  featOptions: backgroundTableRow[],
  featureName: string,
  featureText: string,
  flavorDescription: string,
  flavorName: string,
  flavorOptions: backgroundTableRow[],
  flavorText: string,
  flawOptions: backgroundTableRow[],
  idealOptions: backgroundTableRow[],
  languages: string,
  name: string,
  personalityTraitOptions: backgroundTableRow[],
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
  hitDiceDieType: Number
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

export interface EquipmentType {

}

export interface MonsterType {
  alignment: string,
  armorClass: number,
  armorType: string,
  behaviors: {
    name: string,
    monsterBehaviorType: string,
    description: string,
    attackType: string,
    restrictions: string,
    attackBonus: number,
    range: string,
    numberOfTargets: string,
    damage: string,
    damageType: string
  }[],
  challengeRating: number,
  charisma: number,
  charismaModifier: number,
  conditionsImmunitiesOther: string[],
  conditionsImmunitiesParsed: number[],
  constitution: number,
  constitutionModifier: number,
  contentType: string,
  damageImmunitiesOther: string[],
  damageImmunitiesParsed: number[],
  damageResistancesOther: string[],
  damageResistancesParsed: number[],
  damageVulnerabilitiesOther: string[],
  damageVulnerabilitiesParsed: number[],
  dexterity: number,
  dexterityModifier: number,
  experiencePoints: number,
  hitPointRoll: string,
  hitPoints: number,
  intelligence: number,
  intelligenceModifier: number,
  languages: string[],
  name: string,
  savingThrows: string[],
  senses: string[],
  size: string,
  skills: string[],
  speed: number,
  strength: number,
  strengthModifier: number,
  types: string[],
  wisdom: number,
  wisdomModifier: number
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

export interface SpeciesType {
  contentType: string,
  colorScheme: string,
  distinctions: string,
  eyeColorOptions: string,
  flavorText: string,
  hairColorOptions: string,
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
  weightRollMod: string
}

export interface DeploymentType {
  name: string,
  contentType: string,
  flavorText: string,
  description: string,
  featureText: string
}

export interface starshipSizeType {
  additionalHitDiceText: string,
  constitution: number,
  constitutionModifier: number,
  contentType: string,
  dexterity: number,
  dexterityModifier: number,
  features: {
    name: string,
    content: string,
    tier: number
  }[],
  hitDiceType: number,
  hitDiceNumberOfDice: number,
  maxSuiteSystems: number,
  modSlotsAtTier0: number,
  modSlotsPerLevel: number,
  name: string,
  savingThrowOptions: string[],
  startingEquipmentArmorChoice: string[],
  startingEquipmentNonSheild: string[],
  stockEquipmentNames: string[],
  stockModificationSuiteChoices: string[],
  strength: number,
  strengthModifier: number
}
