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

export interface GearType {
  name: string,
  description: string | null,
  cost: number,
  weight: string,
  equipmentCategory: string,
  contentSource: 'WH' | 'PHB' | 'EC',
  contentType: 'Core' | 'ExpandedContent',
}

export interface ArmorType extends GearType {
  equipmentCategory: 'Armor'
  armorClassification: 'Heavy' | 'Medium' | 'Shield' | 'Light',
  properties: string[]
  propertiesMap: { [property: string]: string },
  ac: string,
  stealthDisadvantage: boolean,
}

export type damageNumberOfDice = 0 | 1 | 2 | 3
export type damageDieTypes = 0 | 4 | 6 | 8 | 10 | 12

export interface WeaponType extends GearType {
  equipmentCategory: 'Weapon',
  damageNumberOfDice: damageNumberOfDice,
  damageType: string,
  weaponClassification: 'MartialBlaster' | 'SimpleBlaster' |
    'MartialVibroweapon' | 'SimpleVibroweapon' |
    'MartialLightweapon' | 'SimpleLightweapon' |
    'Unarmed',
  damageDieType: damageDieTypes,
  properties: string[],
  propertiesMap: { [property: string]: string },
  modes: {
    name: string,
    damageDieType: damageDieTypes,
    damageNumberOfDice: damageNumberOfDice,
    damageType: string,
    properties: string[],
    propertiesMap: { [property: string]: string },
  }[]
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
  prerequisite: string,
}

export type EquipmentType = GearType | ArmorType | WeaponType
export type LootType = EquipmentType | EnhancedItemType

// Typeguards

export function isEnhancedItem (loot: LootType): loot is EnhancedItemType {
  return !((loot as EquipmentType).equipmentCategory)
}

export function isWeaponType (loot: LootType): loot is WeaponType {
  return !isEnhancedItem(loot) && loot.equipmentCategory === 'Weapon'
}

export function isArmorType (loot: LootType): loot is ArmorType {
  return !isEnhancedItem(loot) && loot.equipmentCategory === 'Armor'
}

export function isGearType (loot: LootType): loot is GearType {
  return !isEnhancedItem(loot) && !['Weapon', 'Armor'].includes(loot.equipmentCategory)
}
