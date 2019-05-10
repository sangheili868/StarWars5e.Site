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

export interface RollTableRowType {
  name: string,
  roll: number,
  description: string
}

export interface BackgroundType {
  bondOptions: RollTableRowType[],
  contentType: string,
  equipment: string,
  featOptions: RollTableRowType[],
  featureName: string,
  featureText: string,
  flavorDescription: string,
  flavorName: string,
  flavorOptions: RollTableRowType[],
  flavorText: string,
  flawOptions: RollTableRowType[],
  idealOptions: RollTableRowType[],
  languages: string,
  name: string,
  personalityTraitOptions: RollTableRowType[],
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

export interface WeaponType {
  contentType: string,
  cost: number,
  damageDieModifier: number,
  damageDieType: number,
  damageNumberOfDice: number,
  damageType: string,
  description: string
  equipmentCategory: string,
  modes: WeaponType[],
  name: string,
  properties: string[],
  weaponClassification: string,
  weight: number
}

export interface ArmorType {
  ac: number,
  armorClassification: string,
  contentType: string,
  cost: number,
  description: string,
  equipmentCategory: string,
  name: string,
  stealthDisadvantage: boolean,
  strengthRequirement: string,
  weight: number
}

export interface GearType {
  contentType: string,
  cost: number,
  description: string,
  equipmentCategory: string,
  name: string,
  weight: number
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

export interface DeploymentType {
  name: string,
  contentType: string,
  flavorText: string,
  description: string,
  featureText: string
}

export interface StarshipSizeType {
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
  flavorText: string,
  fullText: string,
  hitDiceDieType: number,
  hitDiceNumberOfDice: number,
  maxSuiteSystems: number,
  modSlotsAtTier0: number,
  modSlotsPerLevel: number,
  name: string,
  savingThrowOptions: string[],
  startingEquipmentArmorChoice: string[],
  startingEquipmentNonShield: string[],
  stockEquipmentNames: string[],
  stockModificationSuiteChoices: string[],
  strength: number,
  strengthModifier: number
}

export interface StarshipWeaponType {
  attackBonus: number,
  attacksPerRound: number,
  contentType: string,
  cost: number,
  damageDieModifier: number,
  damageDieType: number,
  damageNumberOfDice: number,
  damageType: string,
  longRange: number,
  name: string,
  properties: string,
  reload: number,
  shortRange: number,
  type: string,
  weaponCategory: string,
  weaponSize: string
}

export interface StarshipEquipmentType {
  armorClassBonus?: number, // armor
  bonus?: number, // navcomputer
  contentType: string,
  cost: number,
  hitPointsPerHitDie?: number, // armor
  name: string,
  starshipWeaponCategory?: string, // ammunition
  type: string
}

export interface StarshipModificationType {
  content: string,
  contentType: string,
  name: string,
  prerequisites: string[],
  type: string
}

export interface VentureType {
  content: string,
  contentType: string,
  name: string,
  prerequisites: string[]
}

export interface FeatType {
  text: string,
  contentType: string,
  name: string,
  prerequisites: string,
  attributesIncreased: string[]
}

export interface VariantRuleBlobType {
  chapterName: string,
  contentMarkdown: string
}
