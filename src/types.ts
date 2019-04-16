
export interface CharacterClass {  archetypeFlavorName: String
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

export interface RootState {
  classes: CharacterClass[],
  credits: String[]
}
