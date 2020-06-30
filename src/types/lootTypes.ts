export interface WeaponPropertyType {
  content: string,
  contentType: string,
  name: string
}

export interface ArmorPropertyType {
  content: string,
  contentType: string,
  name: string
}

export interface EquipmentType {
  ac: number | string | null,
  armorClassification: string,
  contentSource: string,
  contentType: string,
  cost: number,
  description: string | null,
  equipmentCategory: string,
  name: string,
  stealthDisadvantage: boolean,
  strengthRequirement: string | null,
  weight: string,
  properties: string[] | null,
  propertiesMap: { [property: string]: string },
  damageDieModifier: number,
  damageDieType: number,
  damageNumberOfDice: number,
  damageType: string,
  modes: EquipmentType[],
  weaponClassification: string,
  equipped?: boolean,
  quantity: number,
  index: number,
  attackBonus?: number,
  damageBonus?: number
}

export interface EnhancedItemType {
  contentSource: string,
  contentType: string,
  name: string,
  type: string,
  rarityOptions: string[],
  searchableRarity: string,
  requiresAttunement: boolean,
  valueOptions: string[],
  valueText: string,
  text: string,
  subtype: string,
  prerequisite: string
}
