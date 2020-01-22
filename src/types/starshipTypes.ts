export interface DeploymentType {
  name: string,
  contentType: string,
  contentSource: string,
  flavorText: string,
  description: string,
  featureText: string
}

export interface StarshipSizeType {
  additionalHitDiceText: string,
  constitution: number,
  constitutionModifier: number,
  contentSource: string,
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
  contentSource: string,
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
  contentSource: string,
  contentType: string,
  cost: number,
  hitPointsPerHitDie?: number, // armor
  name: string,
  starshipWeaponCategory?: string, // ammunition
  type: string,
  description?: string
}

export interface StarshipModificationType {
  content: string,
  contentSource: string,
  contentType: string,
  name: string,
  prerequisites: string[],
  type: string
}

export interface VentureType {
  content: string,
  contentSource: string,
  contentType: string,
  name: string,
  prerequisites: string[]
}
