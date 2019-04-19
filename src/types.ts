export interface ClassType {
  contentType: string,
  archetypeFlavorName: String
  archetypeFlavorText: String
  archetypes: any[]
  armorProficiencies: String[]
  classFeatureText: String
  classFeatureText2?: String
  creatingText: String
  equipmentLines: String[]
  flavorText: String
  hitDiceDieType: Number
  hitPointsAtFirstLevel: String
  hitPointsAtHigherLevels: String
  levelChangeHeadersJson: String
  levelChanges: any
  name: String
  primaryAbility: String
  quickBuildText: String
  rowKey: String
  savingThrows: String[]
  skillChoices: String
  startingWealthVariant: String
  summary: String
  toolProficiencies: String[]
  weaponProficiencies: String[]
}

export interface SpeciesType {
  contentType: string,
  colorScheme: String,
  distinctions: String,
  eyeColorOptions: String,
  flavorText: String,
  hairColorOptions: String,
  heightAverage: String,
  heightRollMod: String,
  homeworld: String,
  language: String,
  manufacturer: String,
  name: String,
  skinColorOptions: String,
  traits: {
    description: String,
    name: String
  }[],
  weightAverage: String,
  weightRollMod: String
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
